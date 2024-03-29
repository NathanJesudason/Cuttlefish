import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

import { SprintData } from 'src/types/sprint';
import { TaskData } from 'src/types/task';

/**
 * Modal for creating a new task
 * 
 * Can be opened with `@ViewChild` and using the `showCreateTaskModal()` method
 */
@Component({
  selector: 'create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  providers: [MessageService],
})
export class CreateTaskModalComponent implements OnInit {
  /**
   * Sprint data of the sprint the task will be created in
   */
  @Input() sprintData!: SprintData;
  
  createTaskModalShown: boolean = false;
  progressOptions: string[] = ['Story', 'Epic', 'Bug', 'Spike', 'Kaizen', 'Subtask'];

  inputName!: string;
  inputStartDate!: Date | null;
  inputEndDate!: Date | null;
  inputStoryPoints!: number | undefined;
  inputDescription!: string;
  inputProgress!: string;
  inputPriority!: number;
  inputCost!: number;
  inputType!: 'Epic' | 'Bug' | 'Spike' | 'Story' | 'Kaizen' | 'Subtask';

  constructor(
    private messageService: MessageService,
    private taskApi: TaskApi
  ) { }

  ngOnInit(): void {
  }

  /**
   * Show the modal
   */
  showCreateTaskModal() {
    this.createTaskModalShown = true;
  }

  /**
   * Hide the modal
   */
  hideCreateTaskModal() {
    this.createTaskModalShown = false;
    this.clearInputs();
  }

  /**
   * Verify if inputs are valid and create a new task
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
    this.taskApi.postTask(this.collectInputs()).subscribe({
      next: data =>{
        this.sprintData.tasks.push(data);
        this.sprintData.pointsAttempted += data.storyPoints
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: `Error updating date: ${err.message}`});
      }
    })
    this.hideCreateTaskModal();
  }

  /**
   * Cancel the modal
   */
  cancelModalInput() {
    this.hideCreateTaskModal();
  }

  /**
   * Collect the current input values into a `TaskData` object
   * @returns `TaskData` object with the current input values
   */
  collectInputs(): TaskData {
    return {
      name: this.inputName,
      sprintID: this.sprintData.id,
      startDate: this.inputStartDate,
      endDate: this.inputEndDate,
      storyPoints: this.inputStoryPoints || 0,
      description: this.inputDescription,
      progress: 'Backlog',
      priority: 0,
      type: this.inputType,
      cost: this.inputCost,
      order: this.sprintData.tasks.length,
    } as TaskData;
  }

  /**
   * Clear modal inputs
   */
  clearInputs() {
    this.inputName = '';
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputStoryPoints = undefined;

    this.inputDescription = "";
    this.inputProgress = 'In Progress';
    this.inputPriority = 0;
    this.inputCost = 0;
    this.inputType = 'Story';
  }

  /**
   * Verify if all inputs are valid
   * @returns `true` if all inputs are valid, `false` otherwise
   */
  verifyInputs(): boolean {
    return this.inputName !== ''
      && this.inputStartDate !== undefined && this.inputStartDate !== null
      && this.inputEndDate !== undefined && this.inputEndDate !== null;
  }
}
