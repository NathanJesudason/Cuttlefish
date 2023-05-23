/*
* Component Folder: title-inplace
* Component Name: TitleInplaceComponent
* Description:
*     The title-inplace component is used to update the title of a project, sprint,
*   or task. Clicking on the title inplace will allow the user to edit the title.
*   While the inplace is open, clicking on the approve button will save the changes
*   to the title whereas clicking on the cancel button will discard the changes and
*   revert to the previous title.
*/

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

import {
  ProjectData,
  isProjectData
} from 'src/types/project';
import { TaskData, isTaskData } from 'src/types/task';
import {
  SprintData,
  isSprintData
} from 'src/types/sprint';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'title-inplace',
  templateUrl: './title-inplace.component.html',
  styleUrls: ['./title-inplace.component.scss'],
  providers: [MessageService],
})
export class TitleInplaceComponent implements OnInit {
  @Input() entityData!: TaskData | ProjectData | SprintData;
  @Input() size!: 'large' | 'medium' | 'small';

  @ViewChild('titleInplace') titleInplace!: Inplace;

  updatedTitle!: string;

  constructor(
    private projectService: ProjectService,
    private sprintService: SprintService,
    private messageService: MessageService,
    private taskApi: TaskApi
  ) { }

  ngOnInit() {
    this.updatedTitle = this.entityData.name;
  }

  approveChanges() {
    if (isProjectData(this.entityData)) {
      const updatedProject = {...this.entityData, name: this.updatedTitle};
      this.projectService.updateProject(this.entityData.id, updatedProject).subscribe({
        next: () => {
          this.entityData.name = this.updatedTitle;
          this.titleInplace.deactivate();
        },
        error: (err: any) => {
          this.messageService.add({severity: 'error', summary: `Error updating name: ${err}`});
        }
      })
    } else if (isTaskData(this.entityData)){
      if(this.updatedTitle == this.entityData.name){
        this.titleInplace.deactivate();
        return;
      }
      const updatedTask = { ...this.entityData, name: this.updatedTitle};
      this.taskApi.putTask(updatedTask).subscribe({
        next: () => {
          this.entityData.name = this.updatedTitle;
          this.titleInplace.deactivate();
        },
        error: (err: { message: any; }) => {
          this.messageService.add({severity: 'error', summary: `Error updating title: ${err.message}`});
          this.titleInplace.deactivate();
        },
      });
    } else if (isSprintData(this.entityData)) {
      const updatedSprint = {...this.entityData, name: this.updatedTitle};
      this.sprintService.updateSprint(this.entityData.id, updatedSprint).subscribe({
        next: () => {
          this.entityData.name = this.updatedTitle;
          this.titleInplace.deactivate();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating title: ${err.message}`});
          this.titleInplace.deactivate();
        },
      });
    }
  }

  cancelInput() {
    this.updatedTitle = this.entityData.name;
    this.titleInplace.deactivate();
  }
}
