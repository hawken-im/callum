import React, { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ISolution, TrxStorage } from '../apis/types'


interface props{
    solution: ISolution,
    // onPostEdit: (content: string) => void,
    // onPostChanged: (post: IPost) => void,
    // onDeletePost: () => void
}

const SolutionListItem = (props:props)=>{
    return (
        <div>
            <div className="divider">{props.solution.storage}</div>
            <div className="mb-4">s:{props.solution.content}</div>
            <button className="btn btn-sm btn-secondary mb-8">Vote</button>
        </div>
    );
}

export default SolutionListItem


