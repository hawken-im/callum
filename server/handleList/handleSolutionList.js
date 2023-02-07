const db = require('../utils/db');
//const _ = require('lodash');

const LIMIT = 50;

module.exports = async (limit,to) => {
    await db.read();
    if (limit>LIMIT) limit=LIMIT;
    // if (limit>db.data.projects.length) limit=db.data.projects.length;
    // const lastItemIndex=()=>{
    //     if (lastItemID){
    //         return 1 + db.data.projects.findIndex(project => project.id===lastItemID);
    //     }else{
    //         return 0;
    //     }
    // };
    const solutionFiltered = db.data.solutions.filter(item=> item.to === to);
    const solutionList = solutionFiltered.slice(0,limit);
    console.log(`return ${solutionList.length} this: ${JSON.stringify(solutionList)}`);
    return solutionList;
}
