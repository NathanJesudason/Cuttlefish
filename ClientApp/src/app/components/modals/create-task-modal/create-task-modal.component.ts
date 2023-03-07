import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

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
    this.messageService.add({severity: 'success', summary: `Input accepted! name: ${this.inputName}`});
    // call to serverapi with the collected input* values
    this.sprintData.tasks.push(this.collectInputs());
    this.hideCreateTaskModal();
  }

  cancelModalInput() {
    this.messageService.add({severity: 'info', summary: 'Create task input cancelled'});
    this.hideCreateTaskModal();
  }

  collectInputs(): TaskData {
    return {
      id: 10003,
      name: this.inputName,
      startDate: this.inputStartDate,
      endDate: this.inputEndDate,
      assignee: '',
      storyPoints: this.inputStoryPoints || 0,
      description: '',
      progress: 'Backlog',
    } as TaskData;
  }

  clearInputs() {
    this.inputName = '';
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputStoryPoints = undefined;
  }
}
