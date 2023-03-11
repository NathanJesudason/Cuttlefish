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
    console.log(this.collectInputs())
    this.taskApi.postTask(this.collectInputs()).subscribe({
      next: data =>{
        this.messageService.add({severity: 'success', summary: `Input accepted! name: ${this.inputName}`});
        this.sprintData.tasks.push(data);
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: `Error updating date: ${err.message}`});
      }
    })
    this.hideCreateTaskModal();
  }

  cancelModalInput() {
    this.messageService.add({severity: 'info', summary: 'Create task input cancelled'});
    this.hideCreateTaskModal();
  }

  collectInputs(): TaskData {
    return {
      name: this.inputName,
      sprintID: this.sprintData.id,
      startDate: this.inputStartDate,
      endDate: this.inputEndDate,
      storyPoints: this.inputStoryPoints || 0,
      description: '',
      progress: 'Backlog',
      priority: 0,
      type: "",
      cost: 0.0,
    } as TaskData;
  }

  clearInputs() {
    this.inputName = '';
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputStoryPoints = undefined;
  }
}
