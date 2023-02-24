import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { ProjectData } from '../../types/project';
import { TaskData } from '../../types/task';
import { SprintData } from '../../types/sprint';

@Component({
  selector: 'overlay-panel',
  templateUrl: './overlay-panel.component.html',
  styleUrls: ['./overlay-panel.component.scss'],
  providers: [MessageService],
})
export class OverlayPanelComponent implements OnInit {
  @Input() data!: TaskData;
  @Input() whichProgress!: 'Backlog' | 'In Progress' | 'In Review' | 'Done';
  @Input() disabled!: boolean;

  selectedProgress!: string | undefined;
  progressOptions: string[] = ['Backlog', 'In Progress', 'In Review', 'Done'];

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.selectedProgress = this.whichProgress;
  }

  updateProgress(event: any) {
    this.selectedProgress = event.target.value;
  }

  approveChanges(event: any) {
    this.messageService.add({severity: 'success', summary: `Progress was changed to ${this.selectedProgress}!`});
    // when the time comes, add a serverApi call here to send change to backend
  }

  cancelInput(event: any) {
    this.messageService.add({severity: 'info', summary: 'Progress update was cancelled'});
  }
}

  