import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { of } from 'rxjs';

import { CommentInplaceComponent } from 'src/app/components/inplaces/comment-inplace/comment-inplace.component';
import { CommentsSectionComponent } from './comments-section.component';

import { CommentData } from 'src/types/comment';

import { CommentService } from 'src/app/services/comment/comment.service';
import { UserService } from 'src/app/services/user/user.service';
import { TeamMember } from 'src/types/team-member.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';

describe('CommentsSectionComponent', () => {
  const mockComment: CommentData = {
    id: 1,
    content: '<p>Comment 1</p>',
    commenterId: 1,
    taskId: 5,
    lastModified: new Date(),
  };

  const mockTeamMember: TeamMember = {
    id: 1,
    username: 'test',
    password: 'test',
    email: '',
    roles: 'user',
  };
  
  beforeEach(async () => MockBuilder(CommentsSectionComponent, [ButtonModule, DividerModule])
    .mock(CommentInplaceComponent, { export: true })
    .mock(CommentService, {
      createComment: () => of(mockComment),
    } as Partial<CommentService>)
    .mock(UserService, {
      getUserName: () => of(mockTeamMember.username),
    } as Partial<UserService>)
    .mock(AuthService, {
      getUsernameFromToken: () => mockTeamMember.username,
    } as Partial<AuthService>)
    .mock(TeamMemberService, {
      getTeamMemberById: (id: number) => of(mockTeamMember),
    } as Partial<TeamMemberService>)
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
