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

@Component({
  selector: 'dependency-picker',
  templateUrl: './dependency-picker.component.html',
  styleUrls: ['./dependency-picker.component.scss'],
  providers: [MessageService],
})
export class DependencyPickerComponent implements OnInit {
  @ViewChild('overlayPanel')
  overlayPanel!: OverlayPanel;

  @Input() data!: TaskData;
  @Input() projectData!: ProjectData;

  dependencyOptions: { label: string, value: number }[] = [];
  availableTasks: { label: string, value: number }[] = [];
  selectedDependency!: number;

  constructor(
    private messageService: MessageService,
    private taskService: TaskApi
  ) { }

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
