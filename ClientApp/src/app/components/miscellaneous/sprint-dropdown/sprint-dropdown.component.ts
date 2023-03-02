import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MenuItem } from 'primeng/api';
import { format } from 'date-fns';

import { SprintData } from 'src/types/sprint';

import { CreateTaskModalComponent } from 'src/app/components/modals/create-task-modal/create-task-modal.component';

@Component({
  selector: 'sprint-dropdown',
  templateUrl: './sprint-dropdown.component.html',
  styleUrls: ['./sprint-dropdown.component.css' ],
})
export class SprintDropdownComponent implements OnInit {
  @Input() data!: SprintData;

  sprintStarted!: boolean;

  collapsed!: boolean;
  hidden!: boolean;

  optionsMenuItems: MenuItem[] = [];

  @ViewChild('createTaskModal') createTaskModal!: ElementRef<CreateTaskModalComponent>;

  ngOnInit(): void {
    this.updateProgress();
    this.assignOptionsMenuItems();
    this.initAssignHidden();
    this.initAssignCollapsed();
  }

  updateProgress() {
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
      label: 'Delete sprint',
      icon: 'pi pi-trash',
    });
  }

  initAssignHidden() {
    this.hidden = this.data.isCompleted;
  }

  initAssignCollapsed() {
    this.collapsed = !this.data.isBacklog && this.data.isCompleted;
  }

  collapse() {
    if (!this.collapsed) {
      this.collapsed = true;
    }
  }

  expand() {
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

  showCreateTaskModal() {
    (this.createTaskModal as any).showCreateTaskModal();
  }

  // so that we can use date-fns format() in the html file
  format(date: Date | number, str: string) {
    return format(date, str);
  }
}
