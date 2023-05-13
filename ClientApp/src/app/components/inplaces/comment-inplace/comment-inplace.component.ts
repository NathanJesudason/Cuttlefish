import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';

import { CommentData } from 'src/types/comment';
import { TeamMember } from 'src/types/team-member.model';

@Component({
  selector: 'comment-inplace',
  templateUrl: './comment-inplace.component.html',
  styleUrls: ['./comment-inplace.component.scss'],
  providers: [ConfirmationService],
})
export class CommentInplaceComponent implements OnInit {
  @Input() comment!: CommentData;
  @Output() commentChange = new EventEmitter<CommentData>();

  @Output() delete = new EventEmitter<void>();

  selected: boolean = false;
  text!: string;

  formattedDate!: string;

  commenter!: TeamMember;
  loggedInUsername!: string;

  constructor(
    private commentService: CommentService,
    private teamMemberService: TeamMemberService,
    private userService: UserService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.text = this.comment.content;
    this.formattedDate = this.comment.lastModified.toLocaleString();
    this.getCommenter();
    this.getLoggedInUsername();
  }

  getCommenter() {
    this.teamMemberService.getTeamMemberById(this.comment.commenterId).subscribe({
      next: (teamMember: TeamMember) => {
        this.commenter = teamMember;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getLoggedInUsername() {
    this.userService.getUserName().subscribe({
      next: (username: string) => {
        this.loggedInUsername = username || this.authService.getUsernameFromToken();
      },
    });
  }

  select() {
    this.selected = true;
  }

  unSelect() {
    this.selected = false;
  }

  approveChanges() {
    this.commentService.updateCommentContent(this.comment.id, this.text).subscribe({
      next: () => {
        this.comment.content = this.text;
        this.commentChange.emit(this.comment);
        this.unSelect();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  cancelChanges() {
    this.unSelect();
    this.text = this.comment.content;
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      accept: () => this.deleteComment(),
    });
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment.id).subscribe({
      next: () => {
        this.delete.emit();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
