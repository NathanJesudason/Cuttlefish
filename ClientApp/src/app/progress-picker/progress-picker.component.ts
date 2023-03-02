import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

import { TaskData } from '../../types/task';

@Component({
  selector: 'app-progress-picker',
  templateUrl: './progress-picker.component.html',
  styleUrls: ['./progress-picker.component.scss'],
  providers: [MessageService],
})
export class ProgressPickerComponent implements OnInit {
  @ViewChild('overlayPanel')
  overlayPanel!: OverlayPanel;

  @Input() data!: TaskData;

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

  approveChanges(event: any) {
    this.messageService.add({severity: 'success', summary: `Progress was changed to ${this.selectedProgress}!`});
    // when the time comes, add a serverApi call here to send change to backend
  }

  cancelInput() {
    this.overlayPanel.hide();
    this.messageService.add({severity: 'info', summary: 'Progress update was cancelled'});
  }
}

  