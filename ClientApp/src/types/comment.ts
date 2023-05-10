export type CommentData = {
  id: number;
  commenterId: number;
  taskId: number;
  lastModified: Date;
  content: string;
};

export type BackendCommentData = {
  id: number;
  teamMemberId: number;
  taskID: number;
  date: string;
  content: string;
};

export function backendCommentToCommentData(backendComment: BackendCommentData): CommentData {
  return {
    id: backendComment.id,
    commenterId: backendComment.teamMemberId,
    taskId: backendComment.taskID,
    lastModified: new Date(backendComment.date),
    content: backendComment.content,
  };
}

export function commentDataToBackendComment(comment: CommentData): BackendCommentData {
  return {
    id: comment.id,
    teamMemberId: comment.commenterId,
    taskID: comment.taskId,
    date: comment.lastModified.toISOString(),
    content: comment.content,
  };
}
