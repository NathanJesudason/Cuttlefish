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

  collapsed!: boolean;
  hidden!: boolean;

  optionsMenuItems: MenuItem[] = [];
  
  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.loadSprintData();
    this.updateProgress();
    this.assignOptionsMenuItems();
    this.assignHidden();
    this.assignCollapsed();
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
        label: 'Hide completed sprint',
        icon: 'pi pi-eye-slash',
        command: () => this.hide(),
      })
    }
    this.optionsMenuItems.push({
      label: `Delete sprint`,
      icon: 'pi pi-trash',
    });
  }

  assignHidden() {
    this.hidden = this.data.isCompleted;
  }

  assignCollapsed() {
    this.collapsed = !this.data.isBacklog && this.data.isCompleted;
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

  hide() {
    this.hidden = true;
  }

  unhide() {
    this.hidden = false;
  }

  // so that we can use date-fns format() in the html file
  format(date: Date | number, str: string) {
    return format(date, str);
  }
}
