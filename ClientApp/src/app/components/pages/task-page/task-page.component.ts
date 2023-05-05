import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Location } from '@angular/common';

import {
  TaskData,
  TaskNotFoundError
} from 'src/types/task';
import { ProgressPickerComponent } from 'src/app/components/pickers/progress-picker/progress-picker.component';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { BasicFadeAmination } from 'src/app/animations/animations';
import { LabelData } from 'src/types/label';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  providers: [MessageService],
  animations: [BasicFadeAmination],
})
export class TaskPageComponent implements OnInit {
  pageLoading: boolean = true;
  allLabels: LabelData[] = [];
  taskData!: TaskData;
  oldLabelRelations: LabelData[] = [];
  @ViewChild('progressPicker') progressPicker !: ProgressPickerComponent;

  constructor(
    private taskApi: TaskApi,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.pageLoading = true;
    this.loadTaskData();
  }

  deleteTask(): void {
    this.taskApi.deleteTask(Number(this.route.snapshot.paramMap.get('id')!)).subscribe({
      next: () => {
        this.location.back();
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: `Error updating goal: ${err}`});
      }
    })
  }


  updateLabels(value: LabelData[]){
    try{
      if(value.length > this.oldLabelRelations.length ){
        //find relation that was added
        const valueChange = value.filter(x => !this.oldLabelRelations.includes(x))

        valueChange.forEach(x => {
          this.taskApi.AddLabelRelation(x, this.taskData.id).subscribe({
            error: (err) => {
              this.messageService.add({severity: 'error', summary: err.error.message});
            }
          })
        })
      } else {
        //find relation that was removed
        const valueChange = this.oldLabelRelations.filter(x => !value.includes(x))

        valueChange.forEach(x => {
          this.taskApi.deleteLabelRelations(x, this.taskData.id).subscribe({
            error: (err) => {
              this.messageService.add({severity: 'error', summary: err.error.message});
            }
          })
        })
      }
      this.oldLabelRelations = value;
    } catch (error) {
      this.messageService.add({severity: 'error', summary: `Error updating labels: ${error}`});
      this.taskData.labels = this.oldLabelRelations;
      return;
    }
  }

  loadTaskData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    try {
      this.taskApi.getTaskDataWithLabels(id).subscribe({
        next: task => {
          this.taskData = task;
          this.oldLabelRelations = this.taskData.labels ? this.taskData.labels : []
          this.pageLoading = false;
        }
      });

      this.taskApi.getLabels().subscribe({
        next: labels => {
          labels.forEach(label => {this.allLabels.push({name: label.label, color: label.color})})
        }
      })
      
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        this.router.navigate(['not-found', 'task', this.route.snapshot.paramMap.get('id')!]);
        return;
      }
    }
  }
}
