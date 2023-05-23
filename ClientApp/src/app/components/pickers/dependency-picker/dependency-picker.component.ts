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
  selectedDependency!: number;

  constructor(
    private messageService: MessageService,
    private taskService: TaskApi
  ) { }

  /**
   * Populate the dependencies dropdown with the dependencies of the provided task
   */
  ngOnInit() {
    // Deprecated subscribe call
    this.taskService.getTaskRelations().subscribe(
      (taskRelations: any) => {
        this.dependencyOptions = taskRelations.map((taskRelation: any) => {
          return { label: `Task ${taskRelation.id}`, value: taskRelation.id };
        });
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: `Failed to retrieve task relations: ${error.message}`});
      }
    );
  }

  /**
   * Verify that a dependency can be added to this task
   * @param dependencyId the id of the task to be added as a dependency
   * @returns 1 if the dependency can be added, -1 if the dependency already exists or is not valid
   */
  addDependency(dependencyId: number): number {
    if (!this.data.dependencies) {
      this.data.dependencies = [];
    }

    if (this.data.dependencies.includes(dependencyId)) {
      return -1; // dependency already exists within the task
    }

    let dependencyExists = false;

    // loop through the sprints within the project
    for (const sprint of this.projectData.sprints) {
      // loop through the tasks within each sprint
      for (const task of sprint.tasks) {
        if (task.id === dependencyId) {
          dependencyExists = true;
          break;
        }
      }

      if (dependencyExists) {
        break;
      }
    }

    if (!dependencyExists) {
      return -1; // dependency does not exist
    }

    return 1; // dependency added
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
}
