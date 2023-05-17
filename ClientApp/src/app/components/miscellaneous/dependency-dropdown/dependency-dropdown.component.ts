import { Component, Input } from '@angular/core';
import { from } from 'rxjs';
import { concatMap, toArray, map } from 'rxjs/operators';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'dependency-dropdown',
  templateUrl: './dependency-dropdown.component.html',
  styleUrls: ['./dependency-dropdown.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DependencyDropdownComponent {
  @Input() dependencies!: number[] | null;
  
  taskDataArray: TaskData[] = [];
  selectedDependency: number | null = null;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private taskApi: TaskApi
  ) {}

  loadAndSortDependencies(): void {
    this.taskDataArray = [];
    if (this.dependencies) {
      from(this.dependencies).pipe(
        concatMap((id) => this.taskApi.getTaskData(id)),
        toArray(),
        map((taskDataArray) => taskDataArray.sort((a, b) => a.id - b.id))
      ).subscribe(
        (sortedTaskDataArray: TaskData[]) => {
          this.taskDataArray = sortedTaskDataArray;
        },
        (error: Error) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
        }
      );
    }
  }

  redirectToTask(option: number): void {
    if (this.selectedDependency !== option) {
      this.selectedDependency = option;
      return;
    }

    const taskId = option;
    const taskUrl = `/task/${taskId}`;

    this.confirmationService.confirm({
      message: `Are you sure you want to navigate to task ${taskId}?`,
      accept: () => {
        this.router.navigateByUrl(taskUrl);
      },
      reject: () => {
        this.selectedDependency = null;
      }
    });
  }
}
