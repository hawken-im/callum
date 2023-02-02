const db = require('../utils/db');

const LIMIT = 50;

module.exports = async (limit) => {
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
    const projectList = db.data.projects.slice(0,limit);
    console.log(`return ${projectList.length} this: ${JSON.stringify(projectList)}`);
    return projectList;
}
