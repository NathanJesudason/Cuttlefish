import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { CommentsSectionComponent } from './comments-section.component';
import { CommentData } from 'src/types/comment';

describe('CommentsSectionComponent', () => {

  beforeEach(async () => MockBuilder(CommentsSectionComponent));

  it('should create', () => {
    const mockComment: CommentData = {
      id: 1,
      content: '<p>Comment 1</p>',
      commenterId: 1,
      taskId: 5,
      lastModified: new Date(),
    };

    MockRender(CommentsSectionComponent, { taskId: mockComment.taskId, comments: [mockComment] });
    expect(ngMocks.findAll(CommentsSectionComponent)[0]).toBeTruthy();
  });
});
