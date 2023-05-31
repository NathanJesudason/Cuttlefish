/*
* Component Folder: dependency-dropdown
* Component Name: DependencyDropdownComponent
* Description:
*     This component, used on the task page, populates a dropdown with
*   the dependencies of the task. It also allows the user to navigate
*   to the task page of the selected dependency. It uses the TaskApi
*   service to get the task data of the dependencies.
*/

import { Component, Input, OnInit } from '@angular/core';
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
export class DependencyDropdownComponent implements OnInit {
  @Input() data!: TaskData;
  
  taskDataArray: { label: string, value: number }[] = [];
  selectedDependency: number | null = null;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private taskApi: TaskApi
  ) {}

  ngOnInit() {
    this.loadAndSortDependencies();
  }

  loadAndSortDependencies(): void {
    this.taskDataArray = [];
    if (this.data.dependencies) {
      from(this.data.dependencies).pipe(
        concatMap((id) => this.taskApi.getTaskData(id)),
        toArray(),
        map((taskDataArray) => taskDataArray.sort((a, b) => a.id - b.id)),
        map((taskDataArray) => taskDataArray.map(task => ({ label: `Task ${task.id} - ${task.name}`, value: task.id })))
      ).subscribe(
        (sortedTaskDataArray: { label: string, value: number }[]) => {
          console.log("Tasks loaded: ", sortedTaskDataArray); // Add a console log here
          this.taskDataArray = sortedTaskDataArray;
        },
        (error: Error) => {
          console.error("Error occurred while loading tasks: ", error); // Add a console log here
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
