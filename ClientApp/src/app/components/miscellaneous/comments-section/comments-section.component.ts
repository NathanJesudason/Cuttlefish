import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentData } from 'src/types/comment';

@Component({
  selector: 'comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {
  @Input() taskId!: number;

  @Input() comments: CommentData[] = [];
  @Output() commentsChange = new EventEmitter<CommentData[]>();

  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {}

  createComment(): void {
    this.commentService.createComment({
      id: 0,
      content: '<p>Comment 1</p>',
      commenterId: 1,
      taskId: 5,
      lastModified: new Date(),
    }).subscribe({
      next: (comment) => {
        console.log('comment created', comment);
        this.comments.push(comment);
        this.commentsChange.emit(this.comments);
      },
      error: (err) => {
        console.error('error creating comment', err);
      },
    });
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe({
      next: () => {
        console.log('comment deleted');
        this.comments = this.comments.filter((comment) => comment.id !== id);
        this.commentsChange.emit(this.comments);
      },
      error: (err) => {
        console.error('error deleting comment', err);
      },
    });
  }
}
