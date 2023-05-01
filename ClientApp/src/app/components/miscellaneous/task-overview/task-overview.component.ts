import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { LabelData } from 'src/types/label';

import { TaskData } from 'src/types/task';

@Component({
  selector: 'task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {
  @Input() taskData!: TaskData;

  trimmedDescription!: string;
  trimmedLabels: LabelData[] = [];

  constructor(
    private taskService: TaskApi,
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
    } else {
      this.trimmedDescription = `${descriptionWithoutTags.slice(0, 80)}...`;
    }
  }

  getLabels() {
    if (!this.taskData.labels || this.taskData.labels.length === 0) {
      this.taskService.getTaskDataWithLabels(this.taskData.id).subscribe({
        next: (taskData) => {
          this.taskData = taskData;
          this.getTrimmedLabels();
        },
        error: (error) => {
          console.error(error);
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
}
