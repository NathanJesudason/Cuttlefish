import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

import { SprintService } from 'src/app/services/sprint/sprint.service';

import { ProjectPageComponent } from 'src/app/components/pages/project-page/project-page.component';
import { ProjectData } from 'src/types/project';
import { SprintData } from 'src/types/sprint';

@Component({
  selector: 'create-sprint-modal',
  templateUrl: './create-sprint-modal.component.html',
  styleUrls: ['./create-sprint-modal.component.scss'],
  providers: [MessageService],
})
export class CreateSprintModalComponent implements OnInit {
  @Input() projectData!: ProjectData;
  
  createSprintModalShown: boolean = false;

  inputName: string = '';
  inputStartDate!: Date | null;
  inputEndDate!: Date | null;
  inputIsBacklog: boolean = false;
  inputGoal: string = '';

  constructor(
    private sprintService: SprintService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }
  
  showCreateSprintModal() {
    this.createSprintModalShown = true;
  }

  hideCreateSprintModal() {
    this.createSprintModalShown = false;
    this.clearInputs();
  }

  acceptModalInput() {
    if (!this.verifyInputs()) {
      this.messageService.add({severity: 'error', summary: 'Name, start date, and end date are required values'});
      return;
    }

    this.sprintService.createSprint(this.projectData.id, this.collectInputs()).subscribe({
      next: (sprint: SprintData) => {
        this.projectData.sprints.push(sprint);
        this.projectData.sprints.sort(ProjectPageComponent.sprintOrdering);
        this.messageService.add({severity: 'success', summary: `Created sprint with id: ${sprint.id}`});
        this.hideCreateSprintModal();
      },
      error: (err: Error) => {
        this.messageService.add({severity: 'error', summary: `Error creating sprint: ${err.message}`});
        this.hideCreateSprintModal();
      },
    });
  }

  cancelModalInput() {
    this.hideCreateSprintModal();
  }

  collectInputs(): SprintData {
    return {
      id: -1,
      name: this.inputName,
      goal: this.inputGoal,
      startDate: this.inputStartDate,
      endDate: this.inputEndDate,
      isCompleted: false,
      pointsCompleted: 0,
      pointsAttempted: 0,
      projectId: this.projectData.id,
      isBacklog: this.inputIsBacklog,
      tasks: [],
    } as SprintData;
  }

  clearInputs() {
    this.inputName = '';
    this.inputGoal = '';
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputIsBacklog = false;
  }

  verifyInputs(): boolean {
    return this.inputName != undefined
      && this.inputStartDate !== undefined && this.inputStartDate !== null
      && this.inputEndDate !== undefined && this.inputEndDate !== null;
  }
}
