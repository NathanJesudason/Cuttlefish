import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { Inplace } from 'primeng/inplace';

import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectData } from 'src/types/project';

@Component({
  selector: 'funds-inplace',
  templateUrl: './funds-inplace.component.html',
  styleUrls: ['./funds-inplace.component.scss'],
  providers: [MessageService],
})
export class FundsInplaceComponent implements OnInit {
  @Input() projectData!: ProjectData;

  @ViewChild('fundsInplace') fundsInplace!: Inplace;

  funds!: number;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.funds = this.projectData.funds;
  }

  approveChanges(event: any) {
    if (this.funds === this.projectData.funds) {
      this.fundsInplace.deactivate();
      return;
    }

    const updatedProject = {...this.projectData, funds: this.funds};
    this.projectService.updateProject(this.projectData.id, updatedProject).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: `Funds were changed to $${this.funds}!`});
        this.projectData.funds = this.funds;
        this.fundsInplace.deactivate();
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: `Error updating funds: ${err.message}`});
        this.fundsInplace.deactivate();
      },
    });
  }

  cancelInput(event: any) {
    this.funds = this.projectData.funds;
    this.fundsInplace.deactivate();
  }
}
