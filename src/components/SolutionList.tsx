import React, { useEffect, useRef, useState } from 'react';
import { socketIo } from '../utils/socket';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, ISolution, TrxStorage } from '../apis/types'
import SolutionListItem from './SolutionListItem';
import SendSolution from './SendSolution';

interface props{
    project: IProject,
    // onPostEdit: (content: string) => void,
    // onPostChanged: (post: IPost) => void,
    // onDeletePost: () => void
}

function SolutionList(props:props) {
  const [solutionMap, setSolutionMap] = useState([] as ISolution[]);
  const mapRef = useRef([] as ISolution[]);

  const clientNewSolution = (solution: ISolution)=>{
    setSolutionMap(mapRef.current=[solution,...mapRef.current]);
  }

  useEffect(() => {//initialization, try to ge 50 recent solutions.
    if (mapRef.current.length===0){//on component mounted, try to ge 50 recent solutions.
      console.log('socket emit from frontend!');
      socketIo().emit('getSolutions',50,props.project.id,(response:[])=>{
        const newSolutions:ISolution[] =response;
        newSolutions.forEach((item)=>{item.storage=TrxStorage.chain});
        setSolutionMap(mapRef.current=newSolutions);
        console.log(`${solutionMap.length} in solution map`);
        console.log(`${mapRef.current.length} in map ref ${JSON.stringify(mapRef.current)}`);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {//socket get unique solution event with project id.
    socketIo().on(`solution${props.project.id}`, (solution: ISolution) => {//onNewPost: server got a solution, emit it immediately
      console.log(`Got a solution: ${JSON.stringify(solution)}`);
      solution.storage=TrxStorage.chain;
      mapRef.current.some((item,index,array)=>{
        if (item.id===solution.id){
          console.log(`client solution found ${JSON.stringify(item)}`);
          array[index]=solution;
          setSolutionMap([...array]);
          return true;
        }else{
          console.log(`not local cached item`);
          return false;
        }
      })? console.log(`done`)
      : setSolutionMap([solution,...mapRef.current]);

      console.log(`${solutionMap.length} in solution map`);
      console.log(`${mapRef.current.length} in map ref `);
    });
    return ()=> {
      socketIo().off(`solution${props.project.id}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (//测试完成后将 SendSolution 放进详情页
    <div>
      <SendSolution projectID={props.project.id} clientNewSolution={clientNewSolution} />
      {solutionMap.length === 0 ? `empty!` :
        solutionMap.map((item) => 
           <SolutionListItem key={item.id} solution={item}/>
      )}
    </div>
  );
}

export default SolutionList