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
import { ApexOptions } from 'ng-apexcharts';

import { SprintService } from 'src/app/services/sprint/sprint.service';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

import { SprintData } from 'src/types/sprint';
import { CreateTaskModalComponent } from 'src/app/components/modals/create-task-modal/create-task-modal.component';
import { TaskData } from 'src/types/task';

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
    private taskService: TaskApi,
  ) { }

  ngOnInit(): void {
    this.getSprintDateRange();
    this.updateProgress();
    this.assignOptionsMenuItems();
    this.initAssignHidden();
    this.initAssignCollapsed();
    this.initChartOptions();
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
        console.log(err);
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
        console.error(err);
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
          console.error(err);
        },
      });
    }
  }

  moveTasksToSprint(tasks: TaskData[]) {
    for (const task of tasks) {
      task.sprintID = this.selectedAvailableSprint.id;
      this.taskService.putTask(task).subscribe({
        next: () => {
          this.data.tasks = this.data.tasks.filter(t => t.id !== task.id);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  markTasksAsDone(tasks: TaskData[]) {
    for (const task of tasks) {
      this.taskService.completeTask(task).subscribe({
        error: (err) => {
          console.error(err);
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
        console.log(err);
      },
    });
  }
}
