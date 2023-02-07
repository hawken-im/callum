import React, { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'


interface props{
    project: IProject,
}

const ProjectListItem = (props:props)=>{
    return (
        <div>
            {props.project.content}
        </div>
    );
}

export default ProjectListItem