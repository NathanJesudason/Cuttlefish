import {
  Component,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'create-sprint-modal',
  templateUrl: './create-sprint-modal.component.html',
  styleUrls: ['./create-sprint-modal.component.scss'],
  providers: [MessageService],
})
export class CreateSprintModalComponent implements OnInit {
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
    this.inputName = "";
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputIsBacklog = false;
  }

  acceptModalInput() {
    this.messageService.add({severity: 'success', summary: `Input accepted! name: ${this.inputName}`});
    // call to serverapi with the collected input* values
    this.hideCreateSprintModal();
  }

  cancelModalInput() {
    this.messageService.add({severity: 'info', summary: 'Create sprint input cancelled'});
    this.hideCreateSprintModal();
  }
}
