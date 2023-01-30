import React from 'react'
//import sendContent from '../utils/sendContent'
import { v4 as uuidv4 } from 'uuid';
//import store from 'store2';
import { createActivity } from '../apis';
//import { TrxStorage } from '../apis/types';

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

function SendPost(){
    const [content, setContent] = React.useState('defaulst state')

    return(
        <div>
            <textarea
                className="textarea textarea-primary"
                placeholder="How are you?"
                onChange={(e)=>{
                    console.log('onChange triggered')
                    setContent(e.target.value)
                    }}>
            </textarea>
            <button
                className="btn btn-primary"
                onClick={()=>{
                    console.log('button clicked')
                    submitProject(content)
                    }}>
                Post
            </button>
        </div>
    )
}

export default SendPost