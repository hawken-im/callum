import React, { useEffect, useState } from 'react';
import { socketIo } from '../utils/socket';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'

// interface Props{
//   key:string;
//   project: IProject;
// }

// function ListItem(props: Props) {
//   return <div>{props.project.content}</div>;
// }

function ProjectList() {
  const [ids, setIds] = useState([] as string[]);
  const [projectMap, setProjectMap] = useState({} as Record<string,IProject>)
  useEffect(() => {
    const onNewPost = (project: IProject) => {
      console.log(`Got a project: ${JSON.stringify(project)}`);
      setIds((ids:string[])=> {ids.unshift(project.id);return ids});
      setProjectMap(()=> {projectMap[ids[0]]=project;return projectMap})
      console.log(`project map: ${JSON.stringify(projectMap)}, keys: ${Object.keys(projectMap)}`)
    }
    socketIo().on('project', onNewPost);
  }, [ids,projectMap]);

  return (
    <>
    <div>Come on</div>
    <div>
      {Object.keys(projectMap).length === 0 ? `empty! ${Object.keys(projectMap)}` :
        ids.map((id) => 
        <div>
           {projectMap[id].content}
        </div>
      )}
    </div>
    </>
  );
}



export default ProjectList