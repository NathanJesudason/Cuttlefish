/**
 * Test file for CommentService
 */

import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { CommentService } from './comment.service';
import {
  BackendCommentData,
  backendCommentToCommentData
} from 'src/types/comment';

describe('CommentService', () => {
  let commentService: CommentService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    commentService = new CommentService(httpSpy);
  });

  it('should be created', () => {
    expect(commentService).toBeTruthy();
  });

  it('should get a comment by id', () => {
    const mockComment: BackendCommentData = {
      id: 1,
      content: 'Comment 1',
      teamMemberID: 1,
      taskID: 1,
      date: '2020-01-01',
    };

    httpSpy.get.and.returnValue(of(mockComment));
    commentService.getComment(mockComment.id).subscribe((comment) => {
      expect(comment).toEqual(backendCommentToCommentData(mockComment));
    });
  });
});
