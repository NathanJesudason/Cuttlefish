import {
  Component,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'create-sprint-modal',
  templateUrl: './create-sprint-modal.component.html',
  styleUrls: ['./create-sprint-modal.component.css'],
  providers: [MessageService],
})
export class CreateSprintModalComponent implements OnInit {
  createSprintModalShown: boolean = false;

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
  }

  acceptModalInput() {
    this.messageService.add({severity: 'success', summary: 'Input accepted!'});
    this.hideCreateSprintModal();
  }

  cancelModalInput() {
    this.messageService.add({severity: 'info', summary: 'Create sprint input cancelled'});
    this.hideCreateSprintModal();
  }
}
