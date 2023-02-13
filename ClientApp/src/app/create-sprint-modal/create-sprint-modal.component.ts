import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

import { ProjectPageComponent } from '../project-page/project-page.component';

import { ProjectData } from '../../types/project';
import { SprintData } from '../../types/sprint';

@Component({
  selector: 'create-sprint-modal',
  templateUrl: './create-sprint-modal.component.html',
  styleUrls: ['./create-sprint-modal.component.scss'],
  providers: [MessageService],
})
export class CreateSprintModalComponent implements OnInit {
  @Input() projectData!: ProjectData;
  
  createSprintModalShown: boolean = false;

  inputName!: string;
  inputStartDate!: Date | null;
  inputEndDate!: Date | null;
  inputIsBacklog: boolean = false;

  constructor(
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
    this.messageService.add({severity: 'success', summary: `Input accepted! name: ${this.inputName}`});
    // call to serverapi with the collected input* values
    this.projectData.sprints.push(this.collectInputs());
    this.projectData.sprints.sort(ProjectPageComponent.sprintOrdering);
    this.hideCreateSprintModal();
  }

  cancelModalInput() {
    this.messageService.add({severity: 'info', summary: 'Create sprint input cancelled'});
    this.hideCreateSprintModal();
  }

  collectInputs(): SprintData {
    return {
      id: 2,
      name: this.inputName,
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
    this.inputName = "";
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputIsBacklog = false;
  }
}
