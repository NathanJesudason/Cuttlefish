/*
* Component Folder: funds-inplace
* Component Name: FundsInplaceComponent
* Description:
*     Funds-inplace is used to update the funds of a project or tasks. Clicking
*   on the funds inplace will allow the user to edit the funds (in $). While the
*   inplace is open, clicking on the approve button will save the changes to the
*   funds. Clicking on the cancel button will discard the changes and revert to
*   the previous funds.
*     Currently, the funds-inplace does not make assertions about whether a task's
*   updated funds are within the range of the parent sprint or project. This is
*   a known issue.
*/

import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { Inplace } from 'primeng/inplace';

import { ProjectService } from 'src/app/services/project/project.service';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { ProjectData, isProjectData } from 'src/types/project';
import { TaskData, isTaskData } from 'src/types/task';

@Component({
  selector: 'funds-inplace',
  templateUrl: './funds-inplace.component.html',
  styleUrls: ['./funds-inplace.component.scss'],
  providers: [MessageService],
})
export class FundsInplaceComponent implements OnInit {
  @Input() entityData!: ProjectData | TaskData;

  @ViewChild('fundsInplace') fundsInplace!: Inplace;

  funds!: number;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private taskApi: TaskApi
  ) { }

  ngOnInit(): void {
    if(isTaskData(this.entityData))
      this.funds = this.entityData.cost;
    else if(isProjectData(this.entityData))
      this.funds = this.entityData.funds;
  }

  approveChanges(event: any) {

    if (isTaskData(this.entityData)){
      if(this.funds == this.entityData.cost){
        this.fundsInplace.deactivate();
        return;
      }
      const updatedTask: TaskData = { ...this.entityData, cost: this.funds};
      this.taskApi.putTask(updatedTask).subscribe({
        next: () => {
          (this.entityData as TaskData).cost = this.funds;
          this.fundsInplace.deactivate();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating name: ${err}`});
          this.fundsInplace.deactivate();
        }
      })
    } else if (isProjectData(this.entityData)){
    
      if (this.funds === this.entityData.funds) {
        this.fundsInplace.deactivate();
        return;
      }

      const updatedProject = {...this.entityData, funds: this.funds};
      this.projectService.updateProject(this.entityData.id, updatedProject).subscribe({
        next: () => {
          (this.entityData as ProjectData).funds = this.funds;
          this.fundsInplace.deactivate();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating funds: ${err.message}`});
          this.fundsInplace.deactivate();
        },
      });
    }
  }

  cancelInput(event: any) {
  if(isTaskData(this.entityData)){
    this.funds = this.entityData.cost;
  } else if(isProjectData(this.entityData)){
    this.funds = this.entityData.funds;
  }
  this.fundsInplace.deactivate();
  }
}
