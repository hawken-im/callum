const db = require('../utils/db');
const _ = require('lodash');

const LIMIT = 50;

async function appendExtra(projects, options = {}) {
  await db.read();
  const { profiles, solutions, likes } = db.data;
  return projects.map(project => {
    return {
      ...project,
      extra: {
        liked: options.viewer ? likes.find(like => like.to === project.id)?.value > 0 : false,
        profile: profiles.find(profile => profile.userAddress === project.userAddress) || { name: project.userAddress },
        likeCount: _.sumBy(likes.filter(like => like.to === project.id), like => like.value),
        commentCount: solutions.filter(comment => comment.to === project.id).length
      }
    }
  });
}

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
