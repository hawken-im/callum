import React, { useEffect, useRef, useState } from 'react';
import { newSocket, socketIo } from '../utils/socket';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'
import ProjectListItem from './ProjectListItem';
import SendProject from './SendProject';

function ProjectList() {
  const [projectMap, setProjectMap] = useState([] as IProject[]);
  const mapRef = useRef([] as IProject[]);

  const clientNewProject = (project: IProject)=>{
    setProjectMap(mapRef.current=[project,...mapRef.current]);
  }

  useEffect(() => {//initialization, try to ge 50 recent projects.
    newSocket().on('connected',(msg)=>{console.log(`socket init:${msg}`)});
    if (mapRef.current.length===0){//on component mounted, try to ge 50 recent projects.
      socketIo().emit('getInitProjects',50,(response:[])=>{
        const newProjects:IProject[] =response;
        newProjects.forEach((item)=>{item.storage=TrxStorage.chain});
        setProjectMap(mapRef.current=newProjects);
        console.log(`${projectMap.length} in project map`);
        console.log(`${mapRef.current.length} in map ref`);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {//triggered by server project emit.
    socketIo().on('project', (project: IProject) => {//onNewPost: server got a project, emit it immediately
      console.log(`Got a project: ${JSON.stringify(project.id)}`);
      project.storage=TrxStorage.chain;
      mapRef.current.some((item,index,array)=>{
        if (item.id===project.id){
          array[index]=project;
          setProjectMap([...array]);
          return true;
        }else{
          console.log(`not local cached item`);
          return false;
        }
      })? console.log(`done`)
      : setProjectMap([project,...mapRef.current]);

      console.log(`${projectMap.length} in project map`);
      console.log(`${mapRef.current.length} in map ref `);
    });
    return ()=> {
      socketIo().off('project');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SendProject clientNewProject={clientNewProject} />
      {projectMap.length === 0 ? `empty!` :
        projectMap.map((item) => 
           <ProjectListItem key={item.id} project={item}/>
      )}
    </div>
  );
}

export default ProjectList