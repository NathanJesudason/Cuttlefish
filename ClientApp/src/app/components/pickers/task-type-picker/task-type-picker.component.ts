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
    ) { }
  
    ngOnInit() {
        if(isTaskData(this.data)){
            console.log(this.data)
            console.log(this.data.type)
            this.selectedType = this.data.type;
        }else{
            this.selectedType = (this.data as TaskData["type"]);
        }
    }
  
    showOption(option: 'Epic' | 'Bug' | 'Spike' | 'Story' | 'Kaizen' | 'Subtask') {
      this.selectedType = option;
      this.overlayPanel.hide();
      this.approveChanges(option);
    }
  
    approveChanges(event: any) {
        if(isTaskData(this.data)){
            console.log(this.selectedType)
            const updatedTask: TaskData = { ... this.data, type: this.selectedType}
            this.taskApi.putTask(updatedTask).subscribe({
                next: (_) => {
                    console.log(_)
                    this.messageService.add({severity: 'success', summary: `Type was changed to ${this.selectedType}`});
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
  
    cancelInput() {
      this.overlayPanel.hide();
      this.messageService.add({severity: 'info', summary: 'Type update was cancelled'});
    }
  }
  
    