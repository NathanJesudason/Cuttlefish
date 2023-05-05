import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

import { SprintData } from 'src/types/sprint';
import { TaskData } from 'src/types/task';

@Component({
  selector: 'create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  providers: [MessageService],
})
export class CreateTaskModalComponent implements OnInit {
  @Input() sprintData!: SprintData;
  
  createTaskModalShown: boolean = false;

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
  
  showCreateTaskModal() {
    this.createTaskModalShown = true;
  }

  hideCreateTaskModal() {
    this.createTaskModalShown = false;
    this.clearInputs();
  }

  acceptModalInput() {
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

  cancelModalInput() {
    this.hideCreateTaskModal();
  }

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
    } as TaskData;
  }

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
}
