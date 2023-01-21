import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { format } from 'date-fns';

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
  sprintStarted!: boolean;
  sprintComplete!: boolean;
  
  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.loadSprintData();
    this.updateProgress();
  }

  loadSprintData(): void {
    this.data = this.serverApi.getSprintData(this.id);
  }

  updateProgress(): void {
    this.sprintStarted = this.data.startDate < new Date();
    this.sprintComplete = this.data.dueDate < new Date();
  }

  // so that we can use date-fns format() in the html file
  format(date: Date | number, str: string) {
    return format(date, str);
  }
}
