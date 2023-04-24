import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

import {
  ConfirmationService,
  MenuItem
} from 'primeng/api';

import { format } from 'date-fns';

import { SprintService } from 'src/app/services/sprint/sprint.service';

import { SprintData } from 'src/types/sprint';
import { CreateTaskModalComponent } from 'src/app/components/modals/create-task-modal/create-task-modal.component';

@Component({
  selector: 'sprint-dropdown',
  templateUrl: './sprint-dropdown.component.html',
  styleUrls: ['./sprint-dropdown.component.scss'],
  providers: [ConfirmationService],
})
export class SprintDropdownComponent implements OnInit {
  @Input() data!: SprintData;
  @Output() deleteSprint = new EventEmitter<number>();

  sprintStarted!: boolean;

  collapsed!: boolean;
  hidden!: boolean;

  optionsMenuItems: MenuItem[] = [];

  manageIncompleteTasksDialogVisible = false;
  incompleteTasksAction: 'moveToBacklog' | 'moveToSprint' | 'markAsDone' = 'moveToBacklog';

  availableSprints: SprintData[] = [];
  selectedAvailableSprint!: SprintData;
  availableSprintErrorVisibility: 'hidden' | 'visible' = 'hidden';

  availableBacklogs: SprintData[] = [];
  selectedAvailableBacklog!: SprintData;
  availableBacklogErrorVisibility: 'hidden' | 'visible' = 'hidden';

  sprintReportDialogVisible = false;

  @ViewChild('createTaskModal') createTaskModal!: ElementRef<CreateTaskModalComponent>;

  constructor(
    private confirmationService: ConfirmationService,
    private sprintService: SprintService,
  ) { }

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
      });
    }

    if (!this.data.isBacklog && this.sprintStarted && !this.data.isCompleted) {
      this.optionsMenuItems.push({
        label: 'Complete sprint',
        icon: 'pi pi-check',
        command: () => this.manageIncompleteTasks(),
      });
    }

    this.optionsMenuItems.push({
      label: this.data.isBacklog ? 'Delete backlog' : 'Delete sprint',
      icon: 'pi pi-trash',
      command: () => this.confirmSprintDeletion(),
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

  confirmSprintDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this sprint?',
      accept: () => this.deleteThisSprint(),
    });
  }

  deleteThisSprint() {
    // need to handle the tasks in this sprint before deleting
    // move them to the first available backlog
    this.sprintService.deleteSprint(this.data.id).subscribe({
      next: () => {
        this.deleteSprint.emit(this.data.id);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAvailableSprintsAndBacklogs() {
    this.sprintService.getSprintsInProject(this.data.projectId).subscribe({
      next: (sprints) => {
        this.availableBacklogs = sprints.filter(s => s.isBacklog);

        if (this.availableBacklogs.length === 0) {
          this.availableBacklogErrorVisibility = 'visible';
          this.incompleteTasksAction = 'moveToSprint';
        } else {
          this.selectedAvailableBacklog = this.availableBacklogs[0];
        }

        this.availableSprints = sprints.filter(s => !s.isBacklog && !s.isCompleted);

        if (this.availableSprints.length === 0) {
          this.availableSprintErrorVisibility = 'visible';
          this.incompleteTasksAction = 'markAsDone';
        } else {
          this.selectedAvailableSprint = this.availableSprints[0];
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // the first step in sprint completion, check if there are any incomplete tasks
  manageIncompleteTasks() {
    if (this.data.tasks.filter(t => t.progress !== 'Done').length > 0) {
      // there are tasks that haven't been completed yet
      this.getAvailableSprintsAndBacklogs();
      this.manageIncompleteTasksDialogVisible = true;
    } else {
      this.showSprintReport();
    }
  }

  moveTasksToSelectedSprintOrBacklog() {}

  continueSprintCompletion() {
    this.manageIncompleteTasksDialogVisible = false;
    this.moveTasksToSelectedSprintOrBacklog();
    this.showSprintReport();
  }

  // the second step in sprint completion, show user the sprint report
  showSprintReport() {}

  // the third step in sprint completion, mark sprint as completed
  markSprintAsCompleted() {
    const updatedSprint = {...this.data, isCompleted: true };
    this.sprintService.updateSprint(this.data.id, updatedSprint).subscribe({
      next: () => {
        this.data.isCompleted = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // so that we can use date-fns format() in the html file
  format(date: Date | number, str: string) {
    return format(date, str);
  }
}
