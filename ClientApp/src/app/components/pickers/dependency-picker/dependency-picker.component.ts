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
  
    dependencyOptions!: { label: string, value: number }[] | undefined;
    selectedDependency!: number;
  
    constructor(
      private messageService: MessageService,
      private taskService: TaskApi
    ) { }
  
    ngOnInit() {
      // What version of TS will we use? may need to find another solution than .subscribe()
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

    showOption(option: number) {
      this.selectedDependency = option;

      this.approveChanges();
    }

    approveChanges() {
      if (this.selectedDependency) {

      // calls the frontend addDependency function to check whether the operation is valid
      const result = this.addDependency(this.selectedDependency);
      if (result === -1) {
        this.messageService.add({severity: 'error', summary: 'Dependency already exists or is not valid!'});
        return;
      }

    // another instance of deprecated .subscribe()
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
      this.messageService.add({severity: 'info', summary: 'Dependency addition was cancelled'});
    }
  }
