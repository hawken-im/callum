import React from 'react'


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
                    }}>
                Post
            </button>
        </div>
    )
}

export default SendPost