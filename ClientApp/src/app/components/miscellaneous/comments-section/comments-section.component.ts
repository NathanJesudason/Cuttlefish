import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';

import { CommentData } from 'src/types/comment';
import { TeamMember } from 'src/types/team-member.model';

@Component({
  selector: 'comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
  providers: [MessageService],
})
export class CommentsSectionComponent implements OnInit {
  @Input() taskId!: number;

  @Input() comments: CommentData[] = [];
  @Output() commentsChange = new EventEmitter<CommentData[]>();

  newCommentText: string = '';
  showNewCommentInput: boolean = false;

  loggedInUsername!: string;
  loggedInUserId!: number;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private authService: AuthService,
    private teamMemberService: TeamMemberService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getUsernameAndId();
  }

  getUsernameAndId() {
    this.userService.getUserName().subscribe({
      next: (username: string) => {
        this.loggedInUsername = username || this.authService.getUsernameFromToken();
        this.teamMemberService.getTeamMemberByUsername(this.loggedInUsername).subscribe({
          next: (teamMember: TeamMember) => {
            this.loggedInUserId = teamMember.id;
          },
        });
      },
    });
  }

  createComment(): void {
    this.commentService.createComment({
      id: 0,
      content: this.newCommentText,
      commenterId: this.loggedInUserId,
      taskId: this.taskId,
      lastModified: new Date(),
    }).subscribe({
      next: (comment) => {
        this.showNewCommentInput = false;
        this.newCommentText = '';
        this.comments.unshift(comment);
        this.commentsChange.emit(this.comments);
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: `Error creating comment: ${err}`});
        this.showNewCommentInput = false;
        this.newCommentText = '';
      },
    });
  }

  deleteComment(id: number): void {
    this.comments = this.comments.filter((comment) => comment.id !== id);
    this.commentsChange.emit(this.comments);
  }

  cancelNewComment() {
    this.showNewCommentInput = false;
    this.newCommentText = '';
  }
}
