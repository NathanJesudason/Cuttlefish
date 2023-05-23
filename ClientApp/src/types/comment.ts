/**
 * All types and functions related to comments
 */


/**
 * The data for a comment
 * @property `id` - The id of the comment
 * @property `commenterId` - The id of the team member who made the comment
 * @property `taskId` - The id of the task the comment is on
 * @property `lastModified` - The date the comment was last modified
 * @property `content` - The content of the comment, a string of HTML
 */
export type CommentData = {
  id: number;
  commenterId: number;
  taskId: number;
  lastModified: Date;
  content: string;
};

/**
 * The data for a comment as it is stored in the backend
 * @property `id` - The id of the comment
 * @property `teamMemberID` - The id of the team member who made the comment
 * @property `taskID` - The id of the task the comment is on
 * @property `date` - The date the comment was last modified, as an ISO string
 * @property `content` - The content of the comment, a string of HTML
 */
export type BackendCommentData = {
  id: number;
  teamMemberID: number;
  taskID: number;
  date: string;
  content: string;
};

/**
 * Helper function to convert a backend comment to a frontend comment
 * @param backendComment the comment as it is stored in the backend
 * @returns `CommentData` - the comment as it is stored in the frontend
 */
export function backendCommentToCommentData(backendComment: BackendCommentData): CommentData {
  return {
    id: backendComment.id,
    commenterId: backendComment.teamMemberID,
    taskId: backendComment.taskID,
    lastModified: new Date(backendComment.date),
    content: backendComment.content,
  };
}

/**
 * Helper function to convert a frontend comment to a backend comment
 * @param comment the comment as it is stored in the frontend
 * @returns `BackendCommentData` - the comment as it is stored in the backend
 */
export function commentDataToBackendComment(comment: CommentData): BackendCommentData {
  return {
    id: comment.id,
    teamMemberID: comment.commenterId,
    taskID: comment.taskId,
    date: comment.lastModified.toISOString(),
    content: comment.content,
  };
}
