import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskData } from '../../types/task';
import { ServerApi } from '../server-api/server-api.service';

@Component({
  selector: 'task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  taskData!: TaskData;

  constructor(
    private serverApi: ServerApi,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadTaskData();
  }

  loadTaskData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.taskData = this.serverApi.getFullTaskData(id);
  }
}
