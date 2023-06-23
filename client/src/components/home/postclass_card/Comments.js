// import { useEffect, useState } from 'react';
// import CommentDisplay from './CommentDisplay';

// const Comments = ({ post }) => {
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState([]);
//   const [next, setNext] = useState(1);

//   const [replyComments, setReplyComments] = useState([]);

//   useEffect(() => {
//     const newCm = post.comments.filter((cm) => !cm.reply);
//     setComments(newCm);
//     setShowComments(newCm.slice(newCm.length - next));
//   }, [post.comments, next]);

//   useEffect(() => {
//     const newRep = post.comments.filter((cm) => cm.reply);
//     setReplyComments(newRep);
//   }, [post.comments]);

//   return (
//     <div className="comments">
//       {showComments.map((comment, index) => (
//         <CommentDisplay
//           key={index}
//           comment={comment}
//           post={post}
//           replyCm={replyComments.filter((item) => item.reply === comment._id)}
//         />
//       ))}

//       {comments.length - next > 0 ? (
//         <div className="more-comment" onClick={() => setNext(next + 10)}>
//           Xem thêm nhận xét
//         </div>
//       ) : (
//         comments.length > 1 && (
//           <div className="more-comment" onClick={() => setNext(1)}>
//             Ẩn nhận xét
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default Comments;

import React from 'react'

const Comments = () => {
  return (
    <div>Comments</div>
  )
}

export default Comments
