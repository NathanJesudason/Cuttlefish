import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';

import { CommentInplaceComponent } from 'src/app/components/inplaces/comment-inplace/comment-inplace.component';
import { CommentsSectionComponent } from './comments-section.component';
import { CommentData } from 'src/types/comment';

describe('CommentsSectionComponent', () => {
  beforeEach(async () => MockBuilder(CommentsSectionComponent, [ButtonModule])
    .mock(CommentInplaceComponent, { export: true })
  );

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
