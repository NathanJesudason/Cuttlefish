import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

import { format } from 'date-fns';

import { ProjectService } from 'src/app/services/project/project.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';

import {
  isProjectData,
  ProjectData
} from 'src/types/project';
import { isTaskData, TaskData } from 'src/types/task';
import {
  isSprintData,
  SprintData
} from 'src/types/sprint';



@Component({
  selector: 'date-inplace',
  templateUrl: './date-inplace.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./date-inplace.component.scss'],
  providers: [MessageService],
})
export class DateInplaceComponent implements OnInit {
  //If we have TaskData, we need sprint data for validation
  //If we have SprintData, we need ProjectData for validation
  @Input() entityData!: TaskData | ProjectData | SprintData;
  @Input() validationEntityData?: SprintData | ProjectData;
  @Input() childEntityData?: TaskData[] | SprintData[];
  @Input() whichDate!: 'start' | 'end';
  @Input() disabled!: boolean;

  selectedDate!: Date | undefined;
  oldSelectedDate!: Date | undefined;

  constructor(
    private projectService: ProjectService,
    private sprintService: SprintService,
    private messageService: MessageService,
    private taskApi: TaskApi,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.selectedDate = (this.whichDate === 'start') ? this.entityData.startDate : this.entityData.endDate;
    this.oldSelectedDate = this.selectedDate;
  }

  approveChanges(event: any) {
    //Check if empty
    if (this.selectedDate === undefined){
      this.messageService.add({severity: 'error', summary: 'Date cannot be empty'});
      return;
    }

    //Check if no change
    if (this.whichDate === 'start' && this.entityData.startDate == this.selectedDate) {
      return;
    }
    if (this.whichDate === 'end' && this.entityData.endDate == this.selectedDate) {
      return;
    }

    //Check if date range does not make sense
    if((this.whichDate == 'start' && this.entityData.endDate && this.selectedDate > this.entityData.endDate)){
      this.messageService.add({severity: 'error', summary: 'Start date is ahead of end date'});
      this.cdr.detectChanges();
      this.selectedDate = this.oldSelectedDate;
      return;
    }
    if((this.whichDate == 'end' && this.entityData.startDate && this.selectedDate < this.entityData.startDate)){
      this.messageService.add({severity: 'error', summary: 'End date is behind of start date'});
      this.cdr.detectChanges();
      this.selectedDate = this.oldSelectedDate;
      return;
    }

    //Check if date range invalidates child dates
    if(this.childEntityData!= null){
      const predicate = this.whichDate == 'start' ? ((value: TaskData | SprintData) => value.startDate < this.selectedDate!) : ((value: TaskData | SprintData) => value.endDate > this.selectedDate!)
      if(this.childEntityData.some(predicate)){
        this.messageService.add({severity: 'warn', summary: 'This would invalidate some child sprints or tasks. Please change those dates first'});
        this.cdr.detectChanges();
        this.selectedDate = this.oldSelectedDate;
        return;
      }
    }

    //Check if date range is outside of parent range
    if(this.validationEntityData != null){
      if(this.selectedDate > this.validationEntityData.endDate || this.selectedDate < this.validationEntityData.startDate) {
        this.cdr.detectChanges();
        this.selectedDate = this.oldSelectedDate;
        if(isTaskData(this.entityData)){
          this.messageService.add({severity: 'error', summary: 'Date outside valid range for sprint'});
        }
        if(isSprintData(this.entityData)){
          this.messageService.add({severity: 'error', summary: 'Date outside valid range for project'});
        }
        return;
      }
    }

    if(isTaskData(this.entityData)) {
      const updatedTask: TaskData = this.whichDate === 'start' ? {...this.entityData, startDate: this.selectedDate}
        : {...this.entityData, endDate: this.selectedDate};
      this.taskApi.putTask(updatedTask).subscribe({
        next: () => {
          if (this.whichDate === 'start') {
            this.entityData.startDate = this.selectedDate!;
          } else {
            this.entityData.endDate = this.selectedDate!;
          }
          this.oldSelectedDate = this.selectedDate;
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating date: ${err.message}`});
          this.cdr.detectChanges();
          this.selectedDate = this.oldSelectedDate;
        }
      })
    } else if (isProjectData(this.entityData)) {
      const updatedProject: ProjectData = this.whichDate === 'start'
        ? {...this.entityData, startDate: this.selectedDate}
        : {...this.entityData, endDate: this.selectedDate};
      const updatedDate = this.selectedDate;
      this.projectService.updateProject(this.entityData.id, updatedProject).subscribe({
        next: () => {
          if (this.whichDate === 'start') {
            this.entityData.startDate = this.selectedDate!;
          } else {
            this.entityData.endDate = this.selectedDate!;
          }
          this.oldSelectedDate = this.selectedDate;
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating date: ${err.message}`});
          this.cdr.detectChanges();
          this.selectedDate = this.oldSelectedDate;
        },
      });
    } else if (isSprintData(this.entityData)) {
      const updatedSprint: SprintData = this.whichDate === 'start'
        ? {...this.entityData, startDate: this.selectedDate}
        : {...this.entityData, endDate: this.selectedDate};
      const updatedDate = this.selectedDate;
      this.sprintService.updateSprint(this.entityData.id, updatedSprint).subscribe({
        next: () => {
          if (this.whichDate === 'start') {
            this.entityData.startDate = this.selectedDate!;
          } else {
            this.entityData.endDate = this.selectedDate!;
          }
          this.oldSelectedDate = this.selectedDate;
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating date: ${err.message}`});
          this.cdr.detectChanges();
          this.selectedDate = this.oldSelectedDate;
        },
      });
    }
  }
}
