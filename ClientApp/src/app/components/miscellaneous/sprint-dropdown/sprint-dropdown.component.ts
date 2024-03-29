/*
* Component Folder: sprint-dropdown
* Component Name: SprintDropdownComponent
* Description:
*     The sprint-dropdown is used on the project page to display the contents of a given
*  sprint. The header of the dropdown contains the sprint name, start date, end date,
*  completed and total tasks, and the sprint status (a status icon, which can be read
*  as text on hover).
*     The body of the dropdown contains the title-inplace, date-inplaces and the description-
*  inplace for the goal of the sprint. Below this is the tasks section, which containts the
*  create task button and the task list. Each individual task-overview card can be moved around
*  both within the sprint and the project itself (using the drag and drop functionality). At the
*  bottom of the project page is the backlog section, a modified sprint-dropdown to store all
*  tasks that are not currently assigned to a sprint.
*/

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
  CdkDragDrop,
  moveItemInArray
} from '@angular/cdk/drag-drop';

import {
  ConfirmationService,
  MenuItem,
  MessageService
} from 'primeng/api';

import { format } from 'date-fns';
import { ApexOptions } from 'ng-apexcharts';

import { SprintService } from 'src/app/services/sprint/sprint.service';
import { SprintOrderingService } from 'src/app/services/sprint-ordering/sprint-ordering.service';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

import { SprintData } from 'src/types/sprint';
import { CreateTaskModalComponent } from 'src/app/components/modals/create-task-modal/create-task-modal.component';
import { TaskData } from 'src/types/task';
import { ProjectData } from 'src/types/project';

@Component({
  selector: 'sprint-dropdown',
  templateUrl: './sprint-dropdown.component.html',
  styleUrls: ['./sprint-dropdown.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SprintDropdownComponent implements OnInit {
  @Input() projectData!: ProjectData;
  @Input() data!: SprintData;
  @Output() deleteSprint = new EventEmitter<number>();
  @Output() moveTaskAcrossSprints = new EventEmitter<{ taskId: number, oldOrder: number, prevSprintId: number }>();

  sprintStarted!: boolean;

  sprintFormattedStartDate: string | undefined = '';
  sprintFormattedEndDate: string | undefined = '';

  collapsed!: boolean;
  hidden!: boolean;

  optionsMenuItems: MenuItem[] = [];

  manageIncompleteTasksDialogVisible = false;
  incompleteTasksAction: 'moveToBacklog' | 'moveToSprint' | 'markAsDone' = 'moveToBacklog';
  incompleteTasksProcess: 'sprintCompletion' | 'sprintDeletion' = 'sprintCompletion';

  availableSprints: SprintData[] = [];
  selectedAvailableSprint!: SprintData;
  availableSprintErrorVisibility: 'hidden' | 'visible' = 'hidden';

  availableBacklogs: SprintData[] = [];
  selectedAvailableBacklog!: SprintData;
  availableBacklogErrorVisibility: 'hidden' | 'visible' = 'hidden';

  numIncompleteTasks = 0;
  numCompleteTasks = 0;

  incompletePoints = 0;
  completePoints = 0;

  sprintReportDialogVisible = false;

  sprintReportTasksData!: any;
  sprintReportPointsData!: any;

  green500 = getComputedStyle(document.documentElement).getPropertyValue('--green-500');
  bluegray500 = getComputedStyle(document.documentElement).getPropertyValue('--bluegray-500');

  textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
  fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-family');

  primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

  tasksPieChartOptions!: ApexOptions;
  pointsPieChartOptions!: ApexOptions;
  burndownChartOptions!: ApexOptions;

  @ViewChild('createTaskModal') createTaskModal!: ElementRef<CreateTaskModalComponent>;

  constructor(
    private confirmationService: ConfirmationService,
    private sprintService: SprintService,
    private sprintOrderingService: SprintOrderingService,
    private taskService: TaskApi,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getSprintDateRange();
    this.updateProgress();
    this.assignOptionsMenuItems();
    this.initAssignHidden();
    this.initAssignCollapsed();
    this.initChartOptions();
    this.sortTasksByOrder();
  }

  sortTasksByOrder() {
    this.data.tasks.sort((a, b) => a.order - b.order);
  }

  getSprintDateRange() {
    if (this.data.isBacklog) {
      this.sprintFormattedStartDate = undefined;
      this.sprintFormattedEndDate = undefined;
      return;
    }
    this.sprintFormattedStartDate = format(this.data.startDate, 'MM/dd/yyyy');
    this.sprintFormattedEndDate = format(this.data.endDate, 'MM/dd/yyyy');
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

  initChartOptions() {
    this.tasksPieChartOptions = {
      series: [],
      chart: {
        type: 'pie',
        width: '100%',
        height: 300,
      },
      labels: ['Tasks completed', 'Tasks not completed'],
      title: {
        text: 'Number of Tasks Completed',
        style: {
          color: this.textColor,
          fontFamily: this.fontFamily,
        },
      },
      fill: {
        colors: [this.green500, this.bluegray500],
      },
      colors: [this.green500, this.bluegray500],
    };

    this.pointsPieChartOptions = {
      series: [],
      chart: {
        type: 'pie',
        width: '100%',
        height: 300,
      },
      labels: ['Points completed', 'Points not completed'],
      title: {
        text: 'Number of Story Points Completed',
        style: {
          color: this.textColor,
          fontFamily: this.fontFamily,
        },
      },
      fill: {
        colors: [this.green500, this.bluegray500],
      },
      colors: [this.green500, this.bluegray500],
    };

    this.burndownChartOptions = {
      series: [],
      chart: {
        type: 'area',
        width: '100%',
        height: 300,
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Sprint Burndown',
        style: {
          color: this.textColor,
          fontFamily: this.fontFamily,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 95, 100],
        },
        colors: [this.primaryColor],
      },
      stroke: {
        curve: 'stepline',
        colors: [this.primaryColor],
      },
      yaxis: {
        title: {
          text: 'Remaining Story Points',
          style: {
            color: this.textColor,
            fontFamily: this.fontFamily,
          },
        },
        min: 0,
        labels: {
          formatter: (value: any) => {
            return value.toFixed(0);
          },
        },
      },
      xaxis: {
        type: 'datetime',
      },
    };
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
      message: 'Are you sure you want to delete this sprint? All completed tasks will be deleted, the next screen will prompt for how to handle incomplete tasks, if there are any.',
      accept: () => this.manageSprintDeletion(),
    });
  }

  deleteThisSprint() {
    this.sprintService.deleteSprint(this.data.id).subscribe({
      next: () => {
        this.deleteSprint.emit(this.data.id);
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: err.message});
      }
    });
  }

  manageSprintDeletion() {
    this.incompleteTasksProcess = 'sprintDeletion';
    const incompleteTasks = this.data.tasks.filter(t => t.progress !== 'Done');
    this.numIncompleteTasks = incompleteTasks.length;
    if (this.numIncompleteTasks > 0) {
      // there are tasks that haven't been completed yet
      this.getAvailableSprintsAndBacklogs();
      this.manageIncompleteTasksDialogVisible = true;
    } else {
      this.deleteThisSprint();
    }
  }

  continueSprintDeletion() {
    this.manageIncompleteTasksDialogVisible = false;
    this.moveTasksToSelectedSprintOrBacklog();
    this.deleteThisSprint();
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

        this.availableSprints = sprints.filter(s => !s.isBacklog && !s.isCompleted && s.id !== this.data.id);

        if (this.availableSprints.length === 0) {
          this.availableSprintErrorVisibility = 'visible';
          this.incompleteTasksAction = 'markAsDone';
        } else {
          this.selectedAvailableSprint = this.availableSprints[0];
        }
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: err.message});
      },
    });
  }

  // the first step in sprint completion, check if there are any incomplete tasks
  manageIncompleteTasks() {
    this.incompleteTasksProcess = 'sprintCompletion';
    const incompleteTasks = this.data.tasks.filter(t => t.progress !== 'Done');
    const completeTasks = this.data.tasks.filter(t => t.progress === 'Done');

    this.numIncompleteTasks = incompleteTasks.length;
    this.numCompleteTasks = completeTasks.length;

    this.incompletePoints = incompleteTasks.reduce((acc, t) => acc + t.storyPoints, 0);
    this.completePoints = completeTasks.reduce((acc, t) => acc + t.storyPoints, 0);
    if (this.numIncompleteTasks > 0) {
      // there are tasks that haven't been completed yet
      this.getAvailableSprintsAndBacklogs();
      this.manageIncompleteTasksDialogVisible = true;
    } else {
      this.showSprintReport();
    }
  }

  moveTasksToSelectedSprintOrBacklog() {
    const incompleteTasks = this.data.tasks.filter(t => t.progress !== 'Done');
    if (this.incompleteTasksAction === 'moveToBacklog') {
      this.moveTasksToBacklog(incompleteTasks);
    } else if (this.incompleteTasksAction === 'moveToSprint') {
      this.moveTasksToSprint(incompleteTasks);
    } else {
      this.markTasksAsDone(incompleteTasks);
    }
  }

  moveTasksToBacklog(tasks: TaskData[]) {
    for (const task of tasks) {
      task.sprintID = this.selectedAvailableBacklog.id;
      this.taskService.putTask(task).subscribe({
        next: () => {
          this.data.tasks = this.data.tasks.filter(t => t.id !== task.id);
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: err.message});
        },
      });
    }
  }

  moveTasksToSprint(tasks: TaskData[]) {
    for (let task of tasks) {
      task.sprintID = this.selectedAvailableSprint.id;
      this.sprintService.getSprint(this.selectedAvailableSprint.id).subscribe({
        next: (sprint) => {
          task = SprintDropdownComponent.updateTaskDatesForNewSprint(task, sprint.startDate, sprint.endDate);
          this.taskService.putTask(task).subscribe({
            next: () => {
              this.data.tasks = this.data.tasks.filter(t => t.id !== task.id);
            },
            error: (err) => {
              this.messageService.add({severity: 'error', summary: err.message});
            },
          });
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: err.message});
        },
      });
    }
  }

  markTasksAsDone(tasks: TaskData[]) {
    for (const task of tasks) {
      this.taskService.completeTask(task).subscribe({
        error: (err) => {
          this.messageService.add({severity: 'error', summary: err.message});
        },
      });
    }
  }

  completeManageIncompleteTasksModal() {
    if (this.incompleteTasksProcess === 'sprintDeletion') {
      this.continueSprintDeletion();
    } else {
      this.continueSprintCompletion();
    }
  }

  continueSprintCompletion() {
    this.manageIncompleteTasksDialogVisible = false;
    this.showSprintReport();
  }

  // the second step in sprint completion, show user the sprint report
  showSprintReport() {
    this.tasksPieChartOptions = {
      ...this.tasksPieChartOptions,
      series: [this.numCompleteTasks, this.numIncompleteTasks],
    };

    this.pointsPieChartOptions = {
      ...this.pointsPieChartOptions,
      series: [this.completePoints, this.incompletePoints],
    };

    this.generateSprintReportGraphData();

    this.sprintReportDialogVisible = true;
  }

  generateSprintReportGraphData() {
    const tasks = [...this.data.tasks];
    tasks.sort((a, b) => {
      if (!a.endDate || a.progress !== 'Done') {
        return 1;
      }
      if (!b.endDate || b.progress !== 'Done') {
        return -1;
      }
      return a.endDate.getTime() - b.endDate.getTime();
    });

    // loop between sprint start and now
    const loopGranularityMillis = 1000 * 60 * 60; // 1 hour
    const sprintStartMillis = this.data.startDate.getTime();
    const nowMillis = new Date().getTime();
  
    const storyPointsData = [];
    let yValue = this.incompletePoints + this.completePoints;

    storyPointsData.push([sprintStartMillis, yValue]);
    for (let loopMillis = sprintStartMillis; loopMillis <= nowMillis; loopMillis += loopGranularityMillis) {
      if (tasks.length === 0 || tasks[0].progress !== 'Done' || !tasks[0].endDate) {
        // finish looping without subtracting story points from yValue
        for (let innerLoopMillis = loopMillis; innerLoopMillis <= nowMillis; innerLoopMillis += loopGranularityMillis) {
          storyPointsData.push([innerLoopMillis, yValue]);
        }
        break;
      }
      
      if (tasks[0].endDate && loopMillis >= tasks[0].endDate.getTime()) {
        // we have reached the end of a task
        yValue -= tasks[0].storyPoints;
        tasks.shift();
      }
      storyPointsData.push([loopMillis, yValue]);
    }
    storyPointsData.push([nowMillis, this.incompletePoints]);

    this.burndownChartOptions = {
      ...this.burndownChartOptions,
      series: [{
        name: 'Story Points',
        data: storyPointsData,
      }],
      yaxis: {
        ...this.burndownChartOptions.yaxis,
        tickAmount: this.incompletePoints + this.completePoints,
      },
    };
  }

  completeSprintReport() {
    this.sprintReportDialogVisible = false;
    this.moveTasksToSelectedSprintOrBacklog();
    this.markThisSprintAsCompleted();
  }

  // the third step in sprint completion, mark sprint as completed
  markThisSprintAsCompleted() {
    const updatedSprint = {...this.data, isCompleted: true };
    this.sprintService.updateSprint(this.data.id, updatedSprint).subscribe({
      next: () => {
        this.data.isCompleted = true;
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: err.message});
      },
    });
  }

  onTaskDrop(event: CdkDragDrop<TaskData[], TaskData[], TaskData>) {
    let droppedTask = event.previousContainer.data[event.previousIndex];
    if (droppedTask.sprintID === this.data.id) {
      // task was dropped in the same sprint
      if (event.currentIndex === event.previousIndex) {
        // task was dropped in the same position
        return;
      }

      // task was moved to a new position in the same sprint
      droppedTask.order = event.currentIndex;
      this.data.tasks.forEach(t => {
        if (t.id === droppedTask.id) {
          t.order = droppedTask.order;
          return;
        }
      });
      moveItemInArray(this.data.tasks, event.previousIndex, event.currentIndex);
      this.sprintOrderingService.swapReorderTasksInSprint(this.data.id, droppedTask.id, event.currentIndex).subscribe({
        error: (err) => {
          this.messageService.add({severity: 'error', summary: err.message});
        },
      });
    } else {
      // task was moved to a new sprint, this one
      this.moveTaskAcrossSprints.emit({ taskId: droppedTask.id, oldOrder: event.previousIndex, prevSprintId: droppedTask.sprintID });
      droppedTask.sprintID = this.data.id;
      droppedTask.order = event.currentIndex;
      droppedTask = SprintDropdownComponent.updateTaskDatesForNewSprint(droppedTask, this.data.startDate, this.data.endDate);
      this.data.tasks.splice(event.currentIndex, 0, droppedTask);
      this.sprintOrderingService.addReorderTasksInSprint(this.data.id, event.currentIndex).subscribe({
        next: () => {
          this.data.tasks.forEach((task, i) => {
            if (task.order >= event.currentIndex && task.id !== droppedTask.id) {
              this.data.tasks[i].order++;
            }
          });
          this.taskService.putTask(droppedTask).subscribe({
            error: (err) => {
              this.messageService.add({severity: 'error', summary: err.message});
            },
          });
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: err.message});
        },
      });
    }
    
  }

  /**
   * Helper function to constrain the start and end dates of a task to the start and end dates of a sprint
   * 
   * In theory this is called when a task is moving to a new sprint and the start and end dates need to be updated accordingly
   * 
   * @param task the task to update
   * @param sprintStart the start date of the sprint
   * @param sprintEnd the end date of the sprint
   * @returns the updated task
   */
  static updateTaskDatesForNewSprint(task: TaskData, sprintStart: Date, sprintEnd: Date): TaskData {
    if (task.startDate < sprintStart) {
      const dateDiff = sprintStart.getTime() - task.startDate.getTime();
      task.startDate = new Date(task.startDate.getTime() + dateDiff);
      task.endDate = new Date(task.endDate.getTime() + dateDiff);
      if (task.endDate > sprintEnd) {
        task.endDate = sprintEnd;
      }
      return task;
    }

    if (task.endDate > sprintEnd) {
      const dateDiff = task.endDate.getTime() - sprintEnd.getTime();
      task.endDate = new Date(task.endDate.getTime() - dateDiff);
      task.startDate = new Date(task.startDate.getTime() - dateDiff);
      if (task.startDate < sprintStart) {
        task.startDate = sprintStart;
      }
      return task;
    }

    return task;
  }
}
