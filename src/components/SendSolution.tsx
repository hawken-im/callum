import React,{useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import store from 'store2';
import { TrxApi } from '../apis';
import { ISolution, TrxStorage } from '../apis/types';

function SendSolution(props:{projectID:string,clientNewSolution: (solution: ISolution) => void}){
    const [content, setContent] = useState('');
    const submitSolution = async (content: string) => {
      const id = uuidv4();
      const trx_id = await TrxApi.createObject({
          type: "Note",
          id,
          content,
          inreplyto:{
            trxid:props.projectID,
          } 
      });
      const newSolution = {
        to:props.projectID,
        content,
        userAddress: store('address'),
        trxId: trx_id.trx_id,
        id,
        storage: TrxStorage.cache,
      };
      console.log(`submit solution returned: ${newSolution.trxId}`);
      props.clientNewSolution(newSolution);
      setContent('');
    }
    return(//TODO:set hotkey command+enter or ctrl+enter :https://www.npmjs.com/package/hotkeys-js
      <div className='relative'>
        {false && <div className='absolute inset-0 bg-sky-500 z-50'></div>}
        <textarea
            className="textarea textarea-primary w-full"
            placeholder="S:"
            onChange={(e)=>{
                setContent(e.target.value)
                }}>
        </textarea>
  
        <button
            className="btn btn-primary"
            onClick={()=>{
                submitSolution(content.trim());
                }}>
            Submit
        </button>
      </div>
    );
  }
  

export default SendSolution