import React,{useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import store from 'store2';
import { createActivity } from '../apis';
import { IProject, TrxStorage } from '../apis/types';

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
      setContent('');
    }
    return(//TODO:set hotkey command+enter or ctrl+enter :https://www.npmjs.com/package/hotkeys-js
      <div className='relative'>
        {false && <div className='absolute inset-0 bg-sky-500 z-50'></div>}
        <textarea
            className="textarea textarea-primary w-full"
            placeholder="Q:"
            onChange={(e)=>{
                setContent(e.target.value)
                }}>
        </textarea>
  
        <button
            className="btn btn-primary"
            onClick={()=>{
                submitProject(content.trim());
                }}>
            Submit
        </button>
      </div>
    );
  }
  

export default SendProject