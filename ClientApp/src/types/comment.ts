export type CommentData = {
  id: number;
  commenterId: number;
  taskId: number;
  lastModified: Date;
  content: string;
};

export type BackendCommentData = {
  id: number;
  teamMemberID: number;
  taskID: number;
  date: string;
  content: string;
};

export function backendCommentToCommentData(backendComment: BackendCommentData): CommentData {
  return {
    id: backendComment.id,
    commenterId: backendComment.teamMemberID,
    taskId: backendComment.taskID,
    lastModified: new Date(backendComment.date),
    content: backendComment.content,
  };
}

export function commentDataToBackendComment(comment: CommentData): BackendCommentData {
  return {
    id: comment.id,
    teamMemberID: comment.commenterId,
    taskID: comment.taskId,
    date: comment.lastModified.toISOString(),
    content: comment.content,
  };
}
