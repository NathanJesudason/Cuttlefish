import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { of } from 'rxjs';

import { CommentInplaceComponent } from './comment-inplace.component';

import { CommentData } from 'src/types/comment';
import { TeamMember } from 'src/types/team-member.model';

import { CommentService } from 'src/app/services/comment/comment.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastModule } from 'primeng/toast';

describe('CommentInplaceComponent', () => {
  const mockTeamMember: TeamMember = {
    id: 1,
    username: 'test',
    password: 'test',
    email: '',
    roles: 'user',
  };

  beforeEach(async () => MockBuilder(CommentInplaceComponent, [
    ButtonModule,
    AvatarModule,
    EditorModule,
    ConfirmDialogModule,
    ToastModule,
  ])
    .mock(CommentService, {
      deleteComment: () => of(),
    } as Partial<CommentService>)
    .mock(TeamMemberService, {
      getTeamMemberById: (id: number) => of(mockTeamMember),
    } as Partial<TeamMemberService>)
    .mock(UserService, {
      getUserName: () => of(mockTeamMember.username),
    } as Partial<UserService>)
    .mock(AuthService, {
      getUsernameFromToken: () => mockTeamMember.username,
    } as Partial<AuthService>)
  );

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
