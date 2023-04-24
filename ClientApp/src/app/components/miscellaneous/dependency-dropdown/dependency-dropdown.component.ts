import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'dependency-dropdown',
  templateUrl: './dependency-dropdown.component.html',
  styleUrls: ['./dependency-dropdown.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DependencyDropdownComponent implements OnChanges {
  @Input() dependencies!: number[] | null;
  
  taskDataArray: TaskData[] = [];
  selectedDependency: number | null = null;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private taskApi: TaskApi
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('dependencies' in changes) {
      this.loadDependencies();
    }
  }

  loadDependencies(): void {
    if (this.dependencies) {
      this.dependencies.forEach((dependencyId: number) => {
        // deprecated .subscribe(), see dependency pickers for more instances of
        // this function call, should be replaced before code freeze
        this.taskApi.getTaskData(dependencyId).subscribe(
          (taskData: TaskData) => {
            // Add the fetched task data to the taskDataArray
            this.taskDataArray.push(taskData);
          },
          (error: Error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
          }
        );
      });
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
