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

/**
 * Modal for creating a new sprint
 * 
 * Can be opened with `@ViewChild` and using the `showCreateSprintModal()` method
 */
@Component({
  selector: 'create-sprint-modal',
  templateUrl: './create-sprint-modal.component.html',
  styleUrls: ['./create-sprint-modal.component.scss'],
  providers: [MessageService],
})
export class CreateSprintModalComponent implements OnInit {
  /**
   * Project data of the project the sprint will be created in
   */
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

  /**
   * Show the modal
   */
  showCreateSprintModal() {
    this.createSprintModalShown = true;
  }

  /**
   * Hide the modal
   */
  hideCreateSprintModal() {
    this.createSprintModalShown = false;
    this.clearInputs();
  }

  /**
   * Verify if inputs are valid and create a new sprint
   */
  acceptModalInput() {
    if (!this.verifyInputs()) {
      this.messageService.add({severity: 'error', summary: 'Name, start date, and end date are required values'});
      return;
    }
    if(this.inputStartDate! > this.inputEndDate!){
      this.messageService.add({severity: 'error', summary: 'Start date is after end date'});
      return;
    }

    this.sprintService.createSprint(this.projectData.id, this.collectInputs()).subscribe({
      next: (sprint: SprintData) => {
        this.projectData.sprints.push(sprint);
        this.projectData.sprints.sort(ProjectPageComponent.sprintOrdering);
        this.hideCreateSprintModal();
      },
      error: (err: Error) => {
        this.messageService.add({severity: 'error', summary: `Error creating sprint: ${err.message}`});
        this.hideCreateSprintModal();
      },
    });
  }

  /**
   * Cancel the modal
   */
  cancelModalInput() {
    this.hideCreateSprintModal();
  }

  /**
   * Collect the current input values into a `SprintData` object
   * @returns a `SprintData` object with the current input values
   */
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

  /**
   * Clear the current input values
   */
  clearInputs() {
    this.inputName = '';
    this.inputGoal = '';
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputIsBacklog = false;
  }

  /**
   * Verify if all required inputs are valid
   * @returns `true` if all required inputs are valid, `false` otherwise
   */
  verifyInputs(): boolean {
    if (this.inputIsBacklog === true) {
      return this.inputName != undefined;
    }
    return this.inputName != undefined
      && this.inputStartDate !== undefined && this.inputStartDate !== null
      && this.inputEndDate !== undefined && this.inputEndDate !== null;
  }
}
