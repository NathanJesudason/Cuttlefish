/*
* Component Folder: dependency-dropdown
* Component Name: DependencyDropdownComponent
* Description:
*     This component, used on the task page, populates a dropdown with
*   the dependencies of the task. It also allows the user to navigate
*   to the task page of the selected dependency. It uses the TaskApi
*   service to get the task data of the dependencies.
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { TaskApi } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'dependency-dropdown',
  templateUrl: './dependency-dropdown.component.html',
  styleUrls: ['./dependency-dropdown.component.scss'],
  providers: [ConfirmationService]
})
export class DependencyDropdownComponent implements OnInit {
  taskDataArray: { label: string, value: number }[] = [];
  selectedDependency: number | null = null;

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    private taskApi: TaskApi
  ) {}

  ngOnInit() {
  }

  loadAndSortDependencies(): void {
    this.route.params.subscribe(params => {
      const taskId = +params['id'];  // The '+' is to convert the string to a number

      this.taskApi.getTaskRelations().subscribe({
        next: (relations) => {
          const filtered = relations.filter(r => r.dependentTaskID === taskId);
          this.taskDataArray = filtered.map(({id, independentTaskID, dependentTaskID}) => ({ label: `Task ${independentTaskID}`, value: independentTaskID }));
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
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
