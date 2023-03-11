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
import { ServerApi } from 'src/app/services/server-api/server-api.service';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  taskData!: TaskData;
  @ViewChild('progressPicker') progressPicker !: ProgressPickerComponent;

  constructor(
    private taskApi: TaskApi,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.loadTaskData();
  }

  deleteTask(): void {
    this.taskApi.deleteTask(Number(this.route.snapshot.paramMap.get('id')!)).subscribe({
      next: () => {
        this.location.back();
      },
      error: err => {
        //this.messageService.add({severity: 'error', summary: `Error updating goal: ${err}`});
        console.log(err);
      }
    })
  }

  loadTaskData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    try {
      this.taskApi.getTaskData(id).subscribe({
        next: (task: TaskData) => {
          this.taskApi.getLabelRelationsByID(id).subscribe({
            next: (labelIds: String[]) => {
              this.taskApi.getLabels().subscribe({
                next: labels => {
                  labels = labels.filter(r => labelIds.includes(r.label));
                  labels.forEach(r => {
                    task.labels?.push({name: r.label, color: r.color});
                  });
                  this.taskData = task;
                }
              })
            }
          })
        }
      });
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        this.router.navigate(['not-found', 'task', this.route.snapshot.paramMap.get('id')!]);
        return;
      }
      console.log(error);
    }
  }
}
