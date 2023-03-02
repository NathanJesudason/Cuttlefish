import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

import { ProjectData } from 'src/types/project';

@Component({
  selector: 'create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss'],
  providers: [MessageService],
})
export class CreateProjectModalComponent implements OnInit {
  @Input() projects!: ProjectData[];
  
  createProjectModalShown: boolean = false;

  inputName!: string;
  inputColor: string = '#ff0000';
  inputStartDate!: Date | null;
  inputEndDate!: Date | null;
  inputFunds!: number;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  showCreateProjectModal() {
    this.createProjectModalShown = true;
  }

  hideCreateProjectModal() {
    this.createProjectModalShown = false;
    this.clearInputs();
  }

  acceptModalInput() {
    this.messageService.add({severity: 'success', summary: `Input accepted! name: ${this.inputName}`});
    // call to serverapi with the collected input* values
    this.projects.push(this.collectInputs());
    this.hideCreateProjectModal();
  }

  cancelModalInput() {
    this.messageService.add({severity: 'info', summary: 'Create project input cancelled'});
    this.hideCreateProjectModal();
  }

  collectInputs(): ProjectData {
    return {
      id: 2,
      name: this.inputName,
      color: this.inputColor,
      description: '',
      startDate: this.inputStartDate,
      endDate: this.inputEndDate,
      funds: this.inputFunds,
      sprints: [],
    } as ProjectData;
  }

  clearInputs() {
    this.inputName = '';
    this.inputColor = '#ff0000';
    this.inputStartDate = null;
    this.inputEndDate = null;
    this.inputFunds = 0;
  }
}
