/*
* Component Folder: description-inplace
* Component Name: DescriptionInplaceComponent
* Description:
*     The description-inplace component is used to update the description of a
*   project, sprint, or task. Clicking on the description inplace will allow the
*   user to edit the description. While the inplace is open, clicking on the
*   approve button will save the changes to the description. Clicking on the
*   cancel button will discard the changes and revert to the previous description.
*     The description-inplace allows for editing the text heading type, the font,
*   bolding, italicizing, and underlining the test. The options also allow for 
*   changing the text color and highlight color. Finally, the user can make lists,
*   change the paragraph alignment, add a link, and insert a code block (which
*   just uses a monospace font, white text, and black highlighting to appear as a
*   code block).
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
          if (isProjectData(this.entityData)) {
            this.entityData.description = this.text;
          }        
          this.unSelect();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating description: ${err}`});
        }
      })
    }
  }

  cancelInput(event: any) {
    this.unSelect();

    if (this.text === this.defaultText) return;

    const originalDescription = isSprintData(this.entityData) ? this.entityData.goal : this.entityData.description;
    const trimmedText = this.text.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
    
    if (trimmedText === '') {
      this.text = this.defaultText;
      return;
    }

    if (this.text === '' || this.text === null || this.text === undefined) {
      this.text = this.defaultText;
      return;
    }

    if (originalDescription === '') {
      this.text = this.defaultText;
      return;
    }
    
    this.text = originalDescription;
  }
}
