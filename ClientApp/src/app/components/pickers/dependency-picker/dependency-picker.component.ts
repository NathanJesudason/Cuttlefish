import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

import { TaskData } from 'src/types/task';
import { ProjectData } from 'src/types/project';
import { TaskApi } from 'src/app/services/tasks/tasks.service'

/**
 * Component for adding dependencies to the provided task
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

  /**
   * The task to add dependencies to
   */
  @Input() data!: TaskData;

  /**
   * The project that the task belongs to, which contains the list of potential dependencies to add
   */
  @Input() projectData!: ProjectData;

  dependencyOptions: { label: string, value: number }[] = [];
  availableTasks: { label: string, value: number }[] = [];
  selectedDependency!: number;

  constructor(
    private messageService: MessageService,
    private taskService: TaskApi
  ) { }

  /**
   * Populate the dependencies dropdown with the dependencies of the provided task
   */
  ngOnInit() {
    // ngOnInit is required even if it is empty
  }

  loadAvailableTasks() {
    this.taskService.getAllTasks().subscribe(
      (tasks: TaskData[]) => {
        this.availableTasks = tasks
          .filter(task => !this.data.dependencies?.includes(task.id) && task.id !== this.data.id)
          .map(task => ({ label: `Task ${task.id} - ${task.name}`, value: task.id }));
      },
      error => {
        this.messageService.add({ severity: 'error', summary: `Failed to retrieve tasks: ${error.message}` });
      }
    );
  }

  toggleOverlayPanel(event: any) {
    this.loadAvailableTasks();
    this.overlayPanel.toggle(event);
  }

  /**
   * Adds `selectedDependency` as a dependency to the provided task
   * 
   * Displays a toast message on success or failure
   */
  approveChanges() {
    if (this.selectedDependency) {
      const result = this.addDependency(this.selectedDependency);
      if (result === -1) {
        this.messageService.add({severity: 'error', summary: 'Dependency already exists or is not valid!'});
        return;
      }

      this.taskService.addTaskRelation(this.data.id, this.selectedDependency).subscribe(
        () => {
          this.overlayPanel.hide();
          this.messageService.add({severity: 'success', summary: 'Dependency added successfully!'});
        },
        (error) => {
          this.overlayPanel.hide();
          this.messageService.add({severity: 'error', summary: 'Error adding dependency!'});
        }
      );
    } else {
      this.messageService.add({severity: 'error', summary: 'Please select a dependency!'});
    }
  }

  /**
   * Hides the overlay panel
   */
  cancelInput() {
    this.overlayPanel.hide();
  }

  addDependency(dependencyId: number): number {
    if (!this.data.dependencies) {
      this.data.dependencies = [];
    }

    if (this.data.dependencies.includes(dependencyId)) {
      return -1; // dependency already exists within the task
    }

    this.data.dependencies.push(dependencyId);
    return 1; // dependency added
  }
}
