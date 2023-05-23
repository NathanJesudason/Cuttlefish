/*
* Component Folder: dependency-dropdown
* Component Name: DependencyDropdownComponent
* Description:
*     This component, used on the task page, populates a dropdown with
*   the dependencies of the task. It also allows the user to navigate
*   to the task page of the selected dependency. It uses the TaskApi
*   service to get the task data of the dependencies.
*/

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
  @Input() dependencies!: number[];
  
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

  redirectToTask(taskId: number): void {
    if (this.selectedDependency !== taskId) {
      this.selectedDependency = taskId;
      return;
    }

    const taskUrl = `/task/${taskId}`;

    this.confirmationService.confirm({
      message: `Are you sure you want to navigate to task ${taskId}?`,
      accept: () => {
        this.router.navigateByUrl(taskUrl).then(() => this.selectedDependency = null);
      },
      reject: () => {
        this.selectedDependency = null;
      }
    });
  }
}
