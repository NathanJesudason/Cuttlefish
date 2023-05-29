/*
* Component Folder: task-overview
* Component Name: TaskOverviewComponent
* Description:
*     The task-overview is used in the sprint dropdown on the project page.
*   It displays the task name and number, as well as the description and labels.
*   The overview serves to provide all the appropriate information of a given task
*   in a compact and easy to read format.
*/

import {
  CdkDragMove,
  CdkDragRelease,
  CdkDragStart
} from '@angular/cdk/drag-drop';
import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { MessageService } from 'primeng/api';

import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { LabelData } from 'src/types/label';

import { TaskData } from 'src/types/task';

@Component({
  selector: 'task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css'],
  providers: [MessageService],
})
export class TaskOverviewComponent implements OnInit {
  @Input() taskData!: TaskData;

  /**
   * Whether or not the task is draggable.
   * @default true
   */
  @Input() dragDropEnabled: boolean = true;

  trimmedDescription!: string;
  trimmedLabels: LabelData[] = [];

  scrollFrameNumber: number = 0;

  constructor(
    private taskService: TaskApi,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getLabels();
    this.getTrimmedDescription();
  }

  getTrimmedDescription() {
    if (!this.taskData.description) {
      this.trimmedDescription = 'No description';
      return;
    }

    const descriptionWithoutTags = this.taskData.description.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
    if (descriptionWithoutTags.length === 0) {
      this.trimmedDescription = 'No description';
      return;
    }

    const maxDescriptionCharacters = 80;
    if (descriptionWithoutTags.length <= maxDescriptionCharacters) {
      this.trimmedDescription = descriptionWithoutTags;
      return;
    }

    this.trimmedDescription = `${descriptionWithoutTags.slice(0, maxDescriptionCharacters)}...`;
  }

  getLabels() {
    if (!this.taskData.labels || this.taskData.labels.length === 0) {
      this.taskService.getTaskDataWithLabels(this.taskData.id).subscribe({
        next: (taskData) => {
          this.taskData = taskData;
          this.getTrimmedLabels();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: err.message})
        }
      });
    }
  }

  getTrimmedLabels() {
    if (!this.taskData.labels || this.taskData.labels.length === 0) {
      this.trimmedLabels = [];
    } else {
      this.trimmedLabels = this.taskData.labels.slice(0, 2);
    }
  }

  onDragMoved(event: CdkDragMove<TaskData>) {
    this.scrollFrameNumber++;
    if (this.scrollFrameNumber <= 30) {
      return;
    }

    const scrollSpeed = 400;
    const distanceFromScreenEdge = 250;

    if (event.pointerPosition.y < distanceFromScreenEdge) {
      const scrollFactor = (distanceFromScreenEdge - event.pointerPosition.y) / distanceFromScreenEdge;
      const scrollDistance = -scrollSpeed * scrollFactor;
      window.scrollBy({
        top: scrollDistance,
        left: 0,
        behavior: 'smooth',
      });
    } else if (event.pointerPosition.y > window.innerHeight - distanceFromScreenEdge) {
      const scrollFactor = (distanceFromScreenEdge - (window.innerHeight - event.pointerPosition.y)) / distanceFromScreenEdge;
      const scrollDistance = scrollSpeed * scrollFactor;
      window.scrollBy({
        top: scrollDistance,
        left: 0,
        behavior: 'smooth',
      });
    }
    this.scrollFrameNumber = 0;
  }

  onDragStarted(_event: CdkDragStart<TaskData>) {
    document.body.classList.add('inherit-cursors');
    document.body.style.cursor = 'grabbing';
  }

  onDragReleased(_event: CdkDragRelease<TaskData>) {
    document.body.classList.remove('inherit-cursors');
    document.body.style.cursor = 'auto';
  }
}
