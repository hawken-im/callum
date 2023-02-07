import React from 'react';
import SolutionList from './SolutionList';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IProject, TrxStorage } from '../apis/types'


interface props{
    project: IProject,
    // onPostEdit: (content: string) => void,
    // onPostChanged: (post: IPost) => void,
    // onDeletePost: () => void
}

const ProjectListItem = (props:props)=>{//TODO: ProjectPage , details of a single project
    return (
        <div className='mt-12'>
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100"> 
                <input type="checkbox" className="peer" /> 
                <div className="collapse-title text-xl peer-checked:text-xl">
                    <div className="mb-4">Q:{props.project.content}</div>
                </div>
                <div>{props.project.storage}</div>
                <div className="collapse-content"> 
                    <SolutionList project={props.project}/>
                </div>
            </div>
        </div>
    );
}

export default ProjectListItem



// export default observer((props: IProps) => {
//   const { post } = props;
//   const state = useLocalObservable(() => ({
//     submitting: false,
//     showPostEditorModal: false,
//     showCommentDialog: false
//   }));
//   const profileName = post.extra.profile?.name || '';
//   const isPostOwner = post.userAddress === store('address')

//   const updateCounter = async () => {
//     if (state.submitting) {
//       return;
//     }
//     state.submitting = true;
//     try {
//       await TrxApi.createActivity({
//         type: post.extra.liked ? 'Dislike' : 'Like',
//         object: {
//           type: 'Note',
//           id: post.id,
//         }
//       });
//       props.onPostChanged({
//         ...post,
//         extra: {
//           ...post.extra,
//           likeCount: post.extra.likeCount + (post.extra.liked ? -1 : 1),
//           liked: !post.extra.liked
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//     state.submitting = false;
//   }

//   return (
//     <div className="border border-gray-300 rounded-12 p-5 text-gray-700 flex mb-5 relative">
//       <img src={`https://ui-avatars.com/api/?name=${profileName.slice(-1)}`} alt="avatar" className="w-10 h-10 rounded-full" />
//       <div className="ml-3 mt-1 flex-1">
//         <div className="text-gray-88 font-bold">{profileName}</div>
//         <div className="mt-[6px] text-gray-500">
//           {post.content}
//         </div>
//         <div className="mt-3 opacity-60 text-12 flex items-center">
//           <div className={classNames({
//             'text-sky-500 font-bold': post.extra!.liked
//           }, "mr-8 cursor-pointer")} onClick={() => {
//             updateCounter();
//           }}>
//               赞 {post.extra.likeCount || ''}
//           </div>
//           <div className="mr-8 cursor-pointer" onClick={() => {
//             state.showCommentDialog = true;
//           }}>
//               评论 {post.extra.commentCount || ''}
//           </div>
//           {isPostOwner && post.storage !== TrxStorage.cache && (
//             <div
//               className="mr-8 cursor-pointer"
//               onClick={() => {
//                 state.showPostEditorModal = true;
//               }}
//             >
//               编辑
//             </div>
//           )}
//           {isPostOwner && post.storage !== TrxStorage.cache && (
//             <div
//               className="mr-8 cursor-pointer"
//               onClick={props.onDeletePost}
//             >
//               删除
//             </div>
//           )}
//           <div className="mr-8 flex items-center">
//             {post.storage === TrxStorage.cache ? '同步中' : '已同步'}
//             {post.storage === TrxStorage.cache && (
//               <HiOutlineRefresh className="text-14 animate-spin ml-1" />
//             )}
//           </div>
//         </div>
//       </div>
//       <PostEditorModal
//         open={state.showPostEditorModal}
//         onClose={() => {
//           state.showPostEditorModal = false;
//         }}
//         post={props.post}
//         onPostEdit={props.onPostEdit}
//       />
//       <CommentDialog
//         open={state.showCommentDialog}
//         onClose={() => {
//           state.showCommentDialog = false;
//         }}
//         post={props.post}
//         onPostChanged={props.onPostChanged}
//       />
//     </div>
//   )
// });