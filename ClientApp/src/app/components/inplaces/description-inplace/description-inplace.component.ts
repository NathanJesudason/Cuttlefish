import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
  
import { MessageService } from 'primeng/api';
import { Inplace } from 'primeng/inplace';

import { ProjectService } from 'src/app/services/project/project.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

import {
  isProjectData,
  ProjectData
} from 'src/types/project';
import {
  isSprintData,
  SprintData
} from 'src/types/sprint';
import { isTaskData, TaskData } from 'src/types/task';

@Component({
  selector: 'description-inplace',
  templateUrl: './description-inplace.component.html',
  styleUrls: ['./description-inplace.component.scss'],
  providers: [MessageService],
})
export class DescriptionInplaceComponent implements OnInit {
  @Input() entityData!: TaskData | SprintData | ProjectData;
  @Input() defaultText!: string;

  text!: string;
  selected!: boolean;

  constructor(
    private projectService: ProjectService,
    private sprintService: SprintService,
    private messageService: MessageService,
    private taskApi: TaskApi
  ) { }

  @ViewChild('descriptionInplace') descriptionInplace!: Inplace;

  ngOnInit() {
    this.selected = false;
    if (isSprintData(this.entityData)) {
      this.text = this.entityData.goal;
    } else {
      this.text = this.entityData.description;
    }

    if (this.text === '' || this.text === null || this.text === undefined) {
      this.text = this.defaultText;
    }
  }

  select() {
    if (this.text === this.defaultText) {
      this.text = '';
    }
    this.selected = true;
  }

  unSelect() {
    if (this.text === '' || this.text === null || this.text === undefined) {
      this.text = this.defaultText;
    }
    this.selected = false;
  }

  approveChanges(event: any) {
    if (this.text === null || this.text === undefined) {
      this.text = '';
    }

    if (isTaskData(this.entityData)){
      if(this.text == this.entityData.description){
        this.unSelect();
        return;
      }
      const updatedTask = { ...this.entityData, description: this.text};
      this.taskApi.putTask(updatedTask).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Description was updated'});
          if(isTaskData(this.entityData)) {
            this.entityData.description = this.text;
          }
          this.unSelect();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating description: ${err}`})
        }
      })
    } else if (isSprintData(this.entityData)) {
      if (this.text === this.entityData.goal) {
        this.unSelect();
        return;
      }
      const updatedSprint = { ...this.entityData, goal: this.text };
      this.sprintService.updateSprint(this.entityData.id, updatedSprint).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Goal was updated'});
          if (isSprintData(this.entityData)) {
            this.entityData.goal = this.text;
          }
          this.unSelect();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating goal: ${err}`});
        },
      });
    } else if (isProjectData(this.entityData)) {
      if (this.text === this.entityData.description) {
        this.unSelect();
        return;
      }
      const updatedProject = { ...this.entityData, description: this.text };
      this.projectService.updateProject(this.entityData.id, updatedProject).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Description was updated'});
          if (isProjectData(this.entityData)) {
            this.entityData.description = this.text;
          }
        }
      })
    }
  }

  cancelInput(event: any) {
    this.unSelect();
  }
}
