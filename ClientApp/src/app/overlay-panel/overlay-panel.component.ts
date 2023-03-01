import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

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
  @ViewChild('overlayPanel')
  overlayPanel!: OverlayPanel;

  @Input() data!: TaskData;
  @Input() whichProgress!: 'Backlog' | 'In Progress' | 'In Review' | 'Done';
  @Input() disabled!: boolean;

  progress!: string;
  progressOptions: string[] = ['Backlog', 'In Progress', 'In Review', 'Done'];
  selectedProgress!: string;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.selectedProgress = this.data.progress;
  }

  showOption(option: string) {
    this.selectedProgress = option;
    this.overlayPanel.hide();
    this.approveChanges(option);
  }

  updateProgress() {
    this.progress = this.selectedProgress;
  }

  approveChanges(event: any) {
    this.messageService.add({severity: 'success', summary: `Progress was changed to ${this.selectedProgress}!`});
    // when the time comes, add a serverApi call here to send change to backend
  }

  cancelInput() {
    this.overlayPanel.hide();
    this.messageService.add({severity: 'info', summary: 'Progress update was cancelled'});
  }
}

  