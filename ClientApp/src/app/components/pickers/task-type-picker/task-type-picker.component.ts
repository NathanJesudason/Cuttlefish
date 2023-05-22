import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

import { TaskData, isTaskData } from 'src/types/task';
  
/**
 * Component for selecting the type of a task
 */
@Component({
  selector: 'app-type-picker',
  templateUrl: './task-type-picker.component.html',
  styleUrls: ['./task-type-picker.component.scss'],
  providers: [MessageService],
})
export class TaskTypePickerComponent implements OnInit {
  @ViewChild('overlayPanel')
  overlayPanel!: OverlayPanel;

  @Input() data!: TaskData | string;

  progressOptions: string[] = [  'Epic' , 'Bug' , 'Spike' , 'Story' , 'Kaizen' , 'Subtask'];
  selectedType!: 'Epic' | 'Bug' | 'Spike' | 'Story' | 'Kaizen' | 'Subtask';

  constructor(
    private messageService: MessageService,
    private taskApi: TaskApi
  ){}
  
  ngOnInit() {
    if(isTaskData(this.data)){
      this.selectedType = this.data.type;
    }else{
      this.selectedType = (this.data as TaskData["type"]);
    }
  }
  
  /**
   * Select the provided type option and update the task
   * @param option the type option to be selected
   */
  showOption(option: 'Epic' | 'Bug' | 'Spike' | 'Story' | 'Kaizen' | 'Subtask') {
    this.selectedType = option;
    this.overlayPanel.hide();
    this.approveChanges(option);
  }
  
  /**
   * Update the task with `selectedType`
   */
  approveChanges(event: any) {
    if(isTaskData(this.data)){
      const updatedTask: TaskData = { ... this.data, type: this.selectedType}
      this.taskApi.putTask(updatedTask).subscribe({
        next: (_) => {
          (this.data as TaskData).type = this.selectedType;
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating name: ${err}`});
        }
      });
    } else {
      this.data = this.selectedType;
    }
  }
  
  /**
   * Cancel the input and hide the overlay panel
   */
  cancelInput() {
    this.overlayPanel.hide();
  }
}
  
    