import React, { useEffect, useState } from 'react';
import { socketIo } from '../utils/socket';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'
import SendPost from './SendPost';

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