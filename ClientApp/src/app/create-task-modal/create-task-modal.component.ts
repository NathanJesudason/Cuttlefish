import {
  Component,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  providers: [MessageService],
})
export class CreateTaskModalComponent implements OnInit {
  createTaskModalShown: boolean = false;

  inputName!: string;
  inputStartDate!: Date | null;
  inputEndDate!: Date | null;
  inputIsBacklog: boolean = false;

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
    this.inputName = "";
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputIsBacklog = false;
  }

  acceptModalInput() {
    this.messageService.add({severity: 'success', summary: `Input accepted! name: ${this.inputName}`});
    // call to serverapi with the collected input* values
    this.hideCreateTaskModal();
  }

  cancelModalInput() {
    this.messageService.add({severity: 'info', summary: 'Create task input cancelled'});
    this.hideCreateTaskModal();
  }
}
