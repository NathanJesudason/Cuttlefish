import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { TaskData } from 'src/types/task';

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
  selectedProgress!: 'Backlog' | 'In Progress' | 'In Review' | 'Done';

  constructor(
    private messageService: MessageService,
    private taskService: TaskApi,
  ) { }

  ngOnInit() {
    this.selectedProgress = this.data.progress;
  }

  showOption(option: 'Backlog' | 'In Progress' | 'In Review' | 'Done') {
    this.selectedProgress = option;
    this.overlayPanel.hide();
    this.approveChanges(option);
  }

  approveChanges(event: any) {
    if (this.selectedProgress === 'Done') {
      this.taskService.completeTask(this.data).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: `Progress was changed to ${this.selectedProgress}`});
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error completing task: ${err}`});
        },
      });
    } else {
      this.taskService.putTask({...this.data, progress: this.selectedProgress}).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: `Progress was changed to ${this.selectedProgress}`});
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating task: ${err}`});
        }
      });
    }
  }

  cancelInput() {
    this.overlayPanel.hide();
    this.messageService.add({severity: 'info', summary: 'Progress update was cancelled'});
  }
}

  