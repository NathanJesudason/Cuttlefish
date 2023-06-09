import {
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ActivatedRoute } from '@angular/router';

import { TaskData } from 'src/types/task';
import { ProjectData } from 'src/types/project';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

/**
 * DependencyPickerComponent
 *
 * This component provides an interface for adding dependencies to a task.
 */
@Component({
  selector: 'dependency-picker',
  templateUrl: './dependency-picker.component.html',
  styleUrls: ['./dependency-picker.component.scss'],
  providers: [MessageService],
})
export class DependencyPickerComponent implements OnInit {
  @ViewChild('overlayPanel')
  overlayPanel!: OverlayPanel;

  // The data of the project this component belongs to.
  @Input() projectData!: ProjectData;

  // ID of the current task.
  currentTaskId!: number;
  // Data of the current task.
  @Input() currentTaskData!: TaskData;

  // List of tasks that can be added as dependencies.
  availableTasks: { label: string, value: number }[] = [];

  // The task selected to be added as a dependency.
  selectedDependency!: number;

  constructor(
    private messageService: MessageService,
    private taskService: TaskApi,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get the current task's ID from the URL.
    this.route.params.subscribe(params => {
      this.currentTaskId = +params['id'];
      this.fetchCurrentTask();
    });
  }

  /**
   * Fetch the ID of the current task through the URL.
   */
  fetchCurrentTask() {
    this.route.params.subscribe(params => {
      this.currentTaskId = +params['id'];
    });
  }

  /**
  * Load the list of tasks that can be added as dependencies.
  */
  loadAvailableTasks() {
    // Flatten all tasks in the project.
    const allTasks: TaskData[] = this.projectData.sprints.reduce((taskList, sprint) => {
        return taskList.concat(sprint.tasks);
    }, [] as TaskData[]);

    // Filter out the current task and its current dependencies.
    this.availableTasks = allTasks
        .filter(task => task.id !== this.currentTaskId && !this.currentTaskData?.dependencies?.includes(task.id))
        .map(task => ({ label: `Task ${task.id} - ${task.name}`, value: task.id }));
  }

  /**
   * Toggle the overlay panel.
   */
  toggleOverlayPanel(event: any) {
    this.fetchCurrentTask();
    this.loadAvailableTasks();
    this.overlayPanel.toggle(event);
  }

  /**
  * Add the selected task as a dependency.
  */
  approveChanges() {
    if (this.selectedDependency) {
      const result = this.addDependency(this.selectedDependency);
      if (result === -1) {
        this.messageService.add({severity: 'error', summary: 'Dependency already exists or is not valid!'});
        return;
      }

      // Add the dependency in the backend.
      this.taskService.addTaskRelation(this.selectedDependency, this.currentTaskId).subscribe(
        () => {
          this.currentTaskData.dependencies?.push(this.selectedDependency);
          this.overlayPanel.hide();
          this.messageService.add({severity: 'success', summary: 'Dependency added successfully!'});
        },
        (error) => this.messageService.add({ severity: 'error', summary: `Failed to add dependency: ${error.message}` })
      );
    } else {
      this.messageService.add({severity: 'warn', summary: 'Please select a task to add as a dependency!'});
    }
  }

  /**
   * Add a dependency to the current task.
   *
   * @param dependencyId - The ID of the task to add as a dependency.
   * @returns -1 if the task is already a dependency or the same as the current task.
   */
  addDependency(dependencyId: number) {
    if (this.currentTaskData.dependencies?.includes(dependencyId) || this.currentTaskId === dependencyId) {
      return -1;
    }
    return 0;
  }

  /**
   * Cancel the input and hide the panel.
   */
  cancelInput() {
    this.overlayPanel.hide();
  }
}
