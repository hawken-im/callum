import React, { useEffect, useRef, useState } from 'react';
import { newSocket, socketIo } from '../utils/socket';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'
import ProjectListItem from './ProjectListItem';
import { createActivity } from '../apis';
import { v4 as uuidv4 } from 'uuid';
import store from 'store2'

//发一个帖子 - 后端返回trxid - 发布成功，同步中... - 已同步
function SendProject(props:{clientNewProject: (project: IProject) => void}){
  const [content, setContent] = useState('');
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
    const newProject = {
      content,
      userAddress: store('address'),
      trxId: trx_id,
      id,
      storage: TrxStorage.cache,
    };
  
    console.log(`submit project returned: ${newProject.trxId}`);
    props.clientNewProject(newProject);
  }
  return(//TODO:set hotkey command+enter or ctrl+enter :https://www.npmjs.com/package/hotkeys-js
    <div className='relative'>
      {false && <div className='absolute inset-0 bg-sky-500 z-50'></div>}
      <textarea
          className="textarea textarea-primary w-full"
          placeholder="How are you?"
          onChange={(e)=>{
              setContent(e.target.value)
              }}>
      </textarea>

      <button
          className="btn btn-primary"
          onClick={()=>{
              submitProject(content.trim());
              }}
              >
          Submit
      </button>
    </div>
  );
}

function ProjectList() {
  const [projectMap, setProjectMap] = useState([] as IProject[]);
  const mapRef = useRef([] as IProject[]);

  const clientNewProject = (project: IProject)=>{
    setProjectMap(mapRef.current=[project,...mapRef.current]);
  }

  useEffect(() => {//initialization, try to ge 50 recent projects.
    newSocket().on('connected',(msg)=>{console.log(`socket init:${msg}`)});
    if (mapRef.current.length===0){//on component mounted, try to ge 50 recent projects.
      console.log('socket emit from frontend!');
      socketIo().emit('getInitProjects',50,(response:[])=>{
        const newProjects:IProject[] =response;
        newProjects.forEach((item)=>{item.storage=TrxStorage.chain});
        setProjectMap(mapRef.current=newProjects);
        console.log(`${projectMap.length} in project map`);
        console.log(`${mapRef.current.length} in map ref ${JSON.stringify(mapRef.current)}`);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {//triggered by server project emit.
    socketIo().on('project', (project: IProject) => {//onNewPost: server got a project, emit it immediately
      console.log(`Got a project: ${JSON.stringify(project)}`);

      mapRef.current.some((item,index,array)=>{
        if (item.id===project.id){
          console.log(`client project found ${JSON.stringify(item)}`);
          item={...project,storage:TrxStorage.chain};
          array[index]=item;
          // item=project;
          // item.storage=TrxStorage.chain;
          setProjectMap([...array]);
          return true;
        }
        console.log(`no cached item found`)
        return false;
      })

      console.log(`${projectMap.length} in project map`);
      console.log(`${mapRef.current.length} in map ref `);
    });
    return ()=> {
      socketIo().off('project');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectMap]);

  return (
    <div>
      <SendProject clientNewProject={clientNewProject} />
      {projectMap.length === 0 ? `${projectMap.length}empty!` :
        projectMap.map((item) => 
           <ProjectListItem key={item.id} project={item}/>
      )}
    </div>
  );
}

export default ProjectList