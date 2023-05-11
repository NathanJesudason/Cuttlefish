import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';

import { CommentInplaceComponent } from './comment-inplace.component';
import { CommentData } from 'src/types/comment';

describe('CommentInplaceComponent', () => {

  beforeEach(async () => MockBuilder(CommentInplaceComponent, [ButtonModule, AvatarModule, EditorModule]));

  it('should create', () => {
    const mockComment: CommentData = {
      id: 1,
      content: 'Comment 1',
      lastModified: new Date(),
      taskId: 1,
      commenterId: 1,
    };

    MockRender(CommentInplaceComponent, { comment: mockComment });
    expect(ngMocks.findAll(CommentInplaceComponent)[0]).toBeTruthy();
  });
});
