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
import { TaskData } from 'src/types/task';
import {
  SprintData,
  isSprintData
} from 'src/types/sprint';

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
  ) { }

  ngOnInit() {
    this.updatedTitle = this.entityData.name;
  }

  approveChanges() {
    if (isProjectData(this.entityData)) {
      const updatedProject = {...this.entityData, name: this.updatedTitle};
      this.projectService.updateProject(this.entityData.id, updatedProject).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: `Title was changed to ${this.updatedTitle}!`});
          this.entityData.name = this.updatedTitle;
          this.titleInplace.deactivate();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating title: ${err.message}`});
          this.titleInplace.deactivate();
        },
      });
    } else if (isSprintData(this.entityData)) {
      const updatedSprint = {...this.entityData, name: this.updatedTitle};
      this.sprintService.updateSprint(this.entityData.id, updatedSprint).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: `Title was changed to ${this.updatedTitle}!`});
          this.entityData.name = this.updatedTitle;
          this.titleInplace.deactivate();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating title: ${err.message}`});
          this.titleInplace.deactivate();
        },
      });
    } /* else if (isTaskData(this.entityData)) {
      ...
    } */
  }

  cancelInput() {
    this.messageService.add({severity: 'info', summary: 'Title update was cancelled'});
    this.updatedTitle = this.entityData.name;
    this.titleInplace.deactivate();
  }
}
