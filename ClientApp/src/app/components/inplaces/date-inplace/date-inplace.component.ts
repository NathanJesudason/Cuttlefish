import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { MessageService } from 'primeng/api';

import { format } from 'date-fns';

import { ProjectService } from 'src/app/services/project/project.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';

import {
  isProjectData,
  ProjectData
} from 'src/types/project';
import { TaskData } from 'src/types/task';
import {
  isSprintData,
  SprintData
} from 'src/types/sprint';

@Component({
  selector: 'date-inplace',
  templateUrl: './date-inplace.component.html',
  styleUrls: ['./date-inplace.component.scss'],
  providers: [MessageService],
})
export class DateInplaceComponent implements OnInit {
  @Input() entityData!: TaskData | ProjectData | SprintData;
  @Input() whichDate!: 'start' | 'end';
  @Input() disabled!: boolean;

  selectedDate!: Date | undefined;

  constructor(
    private projectService: ProjectService,
    private sprintService: SprintService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.selectedDate = (this.whichDate === 'start') ? this.entityData.startDate : this.entityData.endDate;
  }

  approveChanges(event: any) {
    if (this.selectedDate === undefined) {
      this.messageService.add({severity: 'error', summary: 'Date cannot be empty'});
      return;
    }
    
    if (this.whichDate === 'start' && this.entityData.startDate == this.selectedDate) {
      return;
    }
    if (this.whichDate === 'end' && this.entityData.endDate == this.selectedDate) {
      return;
    }

    if (isProjectData(this.entityData)) {
      const updatedProject: ProjectData = this.whichDate === 'start'
        ? {...this.entityData, startDate: this.selectedDate}
        : {...this.entityData, endDate: this.selectedDate};
      const updatedDate = this.selectedDate;
      this.projectService.updateProject(this.entityData.id, updatedProject).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: `Date change accepted: ${format(updatedDate, 'MM/dd/yyyy')}`});
          if (this.whichDate === 'start') {
            this.entityData.startDate = this.selectedDate;
          } else {
            this.entityData.endDate = this.selectedDate;
          }
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating date: ${err.message}`});
        },
      });
    } else if (isSprintData(this.entityData)) {
      const updatedSprint: SprintData = this.whichDate === 'start'
        ? {...this.entityData, startDate: this.selectedDate}
        : {...this.entityData, endDate: this.selectedDate};
      const updatedDate = this.selectedDate;
      this.sprintService.updateSprint(this.entityData.id, updatedSprint).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: `Date change accepted: ${format(updatedDate, 'MM/dd/yyyy')}`});
          if (this.whichDate === 'start') {
            this.entityData.startDate = this.selectedDate;
          } else {
            this.entityData.endDate = this.selectedDate;
          }
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating date: ${err.message}`});
        },
      });
    }
  }
}
