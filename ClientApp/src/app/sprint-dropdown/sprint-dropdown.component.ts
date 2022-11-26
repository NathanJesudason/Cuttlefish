import { Component, OnInit, Input } from '@angular/core';

import { ServerApi } from '../server-api/server-api.service';

@Component({
  selector: 'sprint-dropdown',
  templateUrl: './sprint-dropdown.component.html'
})
export class SprintDropdownComponent implements OnInit {
  @Input() id!: number;
  
  data!: SprintData;

  tasks!: TaskData[];
  
  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.tasks = [];
    this.loadSprintData();
  }

  loadSprintData(): void {
    this.data = this.serverApi.getSprintData(this.id);
    this.tasks.push(this.serverApi.getTaskData(10000));
    this.tasks.push(this.serverApi.getTaskData(10001));
  }
}

type SprintData = {
  name: string;
  dueDate: Date;
  complete: boolean;
}

type TaskData = {
  id: number;
  name: string;
  assignee: string;
  storyPoints: number;
}
