import { Component, OnInit, Input } from '@angular/core';

import { ServerApi } from '../server-api/server-api.service';
import { SprintData } from '../../types/sprint';

@Component({
  selector: 'sprint-dropdown',
  templateUrl: './sprint-dropdown.component.html',
  styleUrls: ['./sprint-dropdown.component.css' ],
})
export class SprintDropdownComponent implements OnInit {
  @Input() id!: number;
  
  data!: SprintData;
  
  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.loadSprintData();
  }

  loadSprintData(): void {
    this.data = this.serverApi.getSprintData(this.id);
    this.data.tasks.push(this.serverApi.getTaskData(10000));
    this.data.tasks.push(this.serverApi.getTaskData(10001));
  }
}
