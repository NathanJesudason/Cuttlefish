import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { format } from 'date-fns';

import { ServerApi } from '../server-api/server-api.service';
import { SprintData } from '../../types/sprint';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sprint-dropdown',
  templateUrl: './sprint-dropdown.component.html',
  styleUrls: ['./sprint-dropdown.component.css' ],
})
export class SprintDropdownComponent implements OnInit {
  @Input() id!: number;
  
  data!: SprintData;
  sprintStarted!: boolean;

  collapsed: boolean = false;

  optionsMenuItems: MenuItem[] = [];
  
  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.loadSprintData();
    this.updateProgress();
    this.assignOptionsMenuItems();
  }

  loadSprintData(): void {
    this.data = this.serverApi.getSprintData(this.id);
  }

  updateProgress(): void {
    this.sprintStarted = this.data.startDate < new Date();
  }

  assignOptionsMenuItems() {
    if (this.data.isCompleted) {
      this.optionsMenuItems.push({
        label: 'Hide completed sprint from view',
        icon: 'pi pi-eye-slash',
      })
    }
    this.optionsMenuItems.push({
      label: `Delete sprint`,
      icon: 'pi pi-trash',
    });
  }

  collapse() {
    if (!this.collapsed) {
      this.collapsed = true;
    }
  }

  uncollapse() {
    if (this.collapsed) {
      this.collapsed = false;
    }
  }

  // so that we can use date-fns format() in the html file
  format(date: Date | number, str: string) {
    return format(date, str);
  }
}
