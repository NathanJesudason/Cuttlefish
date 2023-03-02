import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  TaskData,
  TaskNotFoundError
} from 'src/types/task';
import { ProgressPickerComponent } from 'src/app/components/pickers/progress-picker/progress-picker.component';
import { ServerApi } from 'src/app/services/server-api/server-api.service';

@Component({
  selector: 'task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  taskData!: TaskData;
  @ViewChild('progressPicker') progressPicker !: ProgressPickerComponent;

  constructor(
    private serverApi: ServerApi,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadTaskData();
  }

  loadTaskData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    try {
      this.taskData = this.serverApi.getFullTaskData(id);
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        this.router.navigate(['not-found', 'task', this.route.snapshot.paramMap.get('id')!]);
        return;
      }
    }
  }
}
