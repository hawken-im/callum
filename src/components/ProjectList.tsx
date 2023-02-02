import React, { useEffect, useState } from 'react';
import { socketIo } from '../utils/socket';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'

function ProjectList() {

  const [projectMap, setProjectMap] = useState([] as IProject[])
  useEffect(() => {
    const onNewPost = (project: IProject) => {
      console.log(`Got a project: ${JSON.stringify(project)}`);
      setProjectMap([project, ...projectMap]);
    }
    socketIo().on('project', onNewPost);
    return ()=> {
      socketIo().off('project');
    }
  }, [projectMap]);

  return (
    <div>
      {projectMap.length === 0 ? `empty!` :
        projectMap.map((item) => 
        <div key={item.id}>
           {item.content}
        </div>
      )}
    </div>
  );
}

export default ProjectList