import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentData } from 'src/types/comment';

@Component({
  selector: 'comment-inplace',
  templateUrl: './comment-inplace.component.html',
  styleUrls: ['./comment-inplace.component.scss']
})
export class CommentInplaceComponent implements OnInit {
  @Input() comment!: CommentData;
  @Output() commentChange = new EventEmitter<CommentData>();

  @Output() delete = new EventEmitter<void>();

  selected: boolean = false;
  text!: string;

  formattedDate!: string;

  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.text = this.comment.content;
    this.formattedDate = this.comment.lastModified.toLocaleString();
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
