import React, { useEffect, useRef, useState } from 'react';
import { newSocket, socketIo } from '../utils/socket';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'
import ProjectListItem from './ProjectListItem';
import { createActivity } from '../apis';
import { v4 as uuidv4 } from 'uuid';

//发一个帖子 - 后端返回trxid - 发布成功，同步中... - 已同步

const submitProject = async (content: string) => {
  const id = uuidv4();
  const trx_id = await createActivity({
    type: 'Create',
    object: {
      type: "Note",
      id,
      content,
    }
  });
  console.log(`submit project returned: ${trx_id}`);

}

function SendProject(){
  const [content, setContent] = useState('')
  return(
      <div>
          <textarea
              className="textarea textarea-primary"
              placeholder="How are you?"
              onChange={(e)=>{
                  setContent(e.target.value)
                  }}>
          </textarea>
          <button
              className="btn btn-primary"
              onClick={()=>{
                  console.log('button clicked');
                  submitProject(content.trim());
                  }}>
              Submit
          </button>
          <div>
            发送成功，同步中...{content}
          </div>
        </div>
  )
}

function ProjectList() {
  const [projectMap, setProjectMap] = useState([] as IProject[]);
  const mapRef = useRef([] as IProject[]);
  useEffect(() => {
    newSocket().on('connected',(msg)=>{console.log(`socket init:${msg}`)});
    if (mapRef.current.length===0){//on component mounted, try to ge 50 recent projects.
      console.log('socket emit from frontend!');
      socketIo().emit('getInitProjects',50,(response:[])=>{
        const newProjects:IProject[] =response;
        setProjectMap(mapRef.current=newProjects);
        console.log(`${projectMap.length} in project map`);
        console.log(`${mapRef.current.length} in map ref`);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {//TODO：在这里判断trxid
    socketIo().on('project', (project: IProject) => {//onNewPost: server got a project, emit it immediately
      console.log(`Got a project: ${JSON.stringify(project)}`);
      setProjectMap(mapRef.current=[project, ...mapRef.current]);
      console.log(`${projectMap.length} in project map`);
      console.log(`${mapRef.current.length} in map ref`);
    });
    return ()=> {
      socketIo().off('project');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SendProject />
      {projectMap.length === 0 ? `${projectMap.length}empty!` :
        projectMap.map((item) => 
           <ProjectListItem key={item.id} project={item}/>
      )}
    </div>
  );
}

export default ProjectList