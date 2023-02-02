import React, { useEffect, useState } from 'react';
import { socketIo } from '../utils/socket';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'
import SendPost from './SendPost';
import ProjectListItem from './ProjectListItem';

function ProjectList() {

  const [projectMap, setProjectMap] = useState([] as IProject[])
  useEffect(() => {//onNewPost: server got a project, emit it immediately
    const onNewPost = (project: IProject) => {
      console.log(`Got a project: ${JSON.stringify(project)}`);
      setProjectMap([project, ...projectMap]);
    }
    socketIo().on('project', onNewPost);
    return ()=> {
      socketIo().off('project');
    }
  }, [projectMap]);

  useEffect(()=>{//on component mounted, try to ge 50 recent projects.
    if (projectMap.length===0){
      console.log('socket emit from frontend!');
      socketIo().emit('getInitProjects',50,(response:[])=>{
        const newProjects:IProject[] =response;
        setProjectMap([...newProjects]);
        console.log(`${projectMap.length} in project map:${JSON.stringify(projectMap)}`)
      })
    }
  },[projectMap]);

  return (
    <div>
      <SendPost />
      {projectMap.length === 0 ? `empty!` :
        projectMap.map((item) => 
           <ProjectListItem key={item.id} project={item}/>
      )}
    </div>
  );
}

export default ProjectList