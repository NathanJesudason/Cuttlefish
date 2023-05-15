import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import {
  GanttBarClickEvent,
  GanttDate,
  GanttDragEvent,
  GanttGroup,
  GanttItem,
  GanttLinkDragEvent,
  GanttLinkType,
  GanttSelectedEvent,
  GanttViewOptions,
  GanttViewType,
  NgxGanttComponent
} from '@worktile/gantt';

import { format } from 'date-fns';

import { BasicFadeAmination } from 'src/app/animations/animations';
import { ProjectService } from 'src/app/services/project/project.service';
import { progressColors } from 'src/app/components/miscellaneous/task-progress-tag/task-progress-tag.component';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

import {
  ProjectData,
  ProjectNotFoundError
} from 'src/types/project';
import { TaskData } from 'src/types/task';
import { SprintData } from 'src/types/sprint';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'gantt-page',
  templateUrl: './gantt-page.component.html',
  styleUrls: ['./gantt-page.component.scss'],
  animations: [BasicFadeAmination],
  providers: [MessageService],
})
export class GanttPageComponent implements OnInit {
  items: GanttItem[] = [];
  groups: GanttGroup[] = [];

  projectId!: number;
  project!: ProjectData;

  viewOptions!: GanttViewOptions;

  dateViewMode!: GanttViewType;

  taskOrganizationMode: 'standalone' | 'epic' | 'sprint' = 'standalone';

  loading: boolean = true;

  @ViewChild('gantt') gantt!: NgxGanttComponent;
  
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskApi,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getUrlParams();
    this.loadProjectData();
  }

  getUrlParams() {
    const params = this.route.snapshot.queryParamMap;
    if (params.has('dateViewMode')) {
      this.dateViewMode = params.get('dateViewMode') as GanttViewType;
    } else {
      this.dateViewMode = GanttViewType.day;
    }

    if (params.has('taskOrganizationMode')) {
      this.taskOrganizationMode = params.get('taskOrganizationMode') as 'standalone' | 'epic' | 'sprint';
    } else {
      this.taskOrganizationMode = 'standalone';
    }
  }

  loadProjectData() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id')!);

    this.projectService.getProject(this.projectId, true, true).subscribe({
      next: (data) => {
        this.project = data;
        this.initGanttViewOptions();
        if (this.taskOrganizationMode === 'standalone') {
          for (const sprint of data.sprints) {
            this.items.push(...this.standaloneTasks(sprint.tasks));
          }
        } else if (this.taskOrganizationMode === 'epic') {
          const allTasks: TaskData[] = [];
          for (const sprint of data.sprints) {
            allTasks.push(...sprint.tasks);
          }
          const { items, groups } = this.tasksInEpics(allTasks);
          this.items = items;
          this.groups = groups;
        } else if (this.taskOrganizationMode === 'sprint') {
          const { items, groups } = this.tasksInSprints(data.sprints);
          this.items = items;
          this.groups = groups;
        }
        this.loading = false;
      },
      error: (error) => {
        if (error instanceof ProjectNotFoundError) {
          this.router.navigate(['not-found', 'project', this.route.snapshot.paramMap.get('id')!]);
          return;
        }
      },
    });
  }

  standaloneTasks(tasks: TaskData[]): GanttItem[] {
    const items: GanttItem[] = [];
    for (const task of tasks) {
      let item: GanttItem = {
        id: `task-${task.id}`,
        title: `${task.id}: ${task.name} (${task.progress})`,
        start: task.startDate.getTime() / 1000,
        end: task.endDate.getTime() / 1000,
        color: progressColors[task.progress],
      };

      if (task.dependencies !== undefined && task.dependencies.length > 0) {
        item.links = task.dependencies.map((dep) => {
          return {
            type: GanttLinkType.fs,
            link: `task-${dep}`,
          };
        });
      }

      items.push(item);
    }
    return items;
  }

  tasksInSprints(sprints: SprintData[]): { items: GanttItem[], groups: GanttGroup[] } {
    const groups: GanttGroup[] = [];
    const items: GanttItem[] = [];

    for (const sprint of sprints) {
      const groupName = `sprint-${sprint.id}`;
      groups.push({
        id: groupName,
        title: sprint.name,
        expanded: true,
      });
      const thisSprintItems = this.standaloneTasks(sprint.tasks).map(item => {
        item.group_id = groupName;
        return item;
      });
      items.push(...thisSprintItems);
    }

    return { items, groups };
  }

  tasksInEpics(tasks: TaskData[]): { items: GanttItem[], groups: GanttGroup[] } {
    const groups: GanttGroup[] = [];
    const items: GanttItem[] = [];

    const epics = tasks.filter(task => task.type === 'Epic');
    for (const epic of epics) {
      const groupName = `epic-${epic.id}`;
      groups.push({
        id: groupName,
        title: epic.name,
        expanded: true,
      });
      if (epic.dependencies === undefined || epic.dependencies.length === 0) continue;
      const epicTasks = tasks.filter(task => epic.dependencies!.includes(task.id));
      const epicItems = this.standaloneTasks(epicTasks).map(item => {
        item.group_id = groupName;
        return item;
      });
      items.push(...epicItems);
    }

    return { items, groups };
  }

  initGanttViewOptions() {
    this.viewOptions = {
      // these strings come from date-fns format()
      dateFormat: {
        week: `'Week' w`,
        month: `LLLL`,
        quarter: `QQQ yyyy`,
        yearMonth: `LLLL`,
        yearQuarter: `QQQ yyyy`,
        year: `y`,
      },
      start: new GanttDate(this.project.startDate.getTime() - 15 * 24 * 60 * 60 * 1000),
      end: new GanttDate(this.project.endDate),
    };
  }

  updateDateViewMode(newMode: string) {
    this.router.navigate(
      ['/project', this.projectId, 'gantt'],
      { queryParams: { dateViewMode: newMode, taskOrganizationMode: this.taskOrganizationMode } },
    );
  }

  updateTaskOrganizationMode(newMode: string) {
    this.router.navigate(
      ['/project', this.projectId, 'gantt'],
      { queryParams: { dateViewMode: this.dateViewMode, taskOrganizationMode: newMode } },
    ).then(() => {
      window.location.reload();
    });
  }

  // so that we can use date-fns format() in the html file
  format(date: Date | number | undefined, str: string) {
    if (typeof date === 'undefined') {
      return "none";
    }
    return format(date, str);
  }

  itemBarClick(event: GanttBarClickEvent) {
    const taskId = ((event.item) as GanttItem).id.split('-')[1];
    this.router.navigate(['task', taskId]);
  }

  itemTitleClick(event: GanttSelectedEvent) {
    const taskId = ((event.selectedValue) as GanttItem).id.split('-')[1];
    this.router.navigate(['task', taskId]);
  }

  itemDependencyCreate(event: GanttLinkDragEvent) {
    console.log('itemDependencyCreate', event);
  }

  itemMove(event: GanttDragEvent) {
    const taskId = Number(((event.item) as GanttItem).id.split('-')[1]);
    let thisTask: TaskData = this.project.sprints[0].tasks[0];
    let thisSprint: SprintData = this.project.sprints[0];
    for (const sprint of this.project.sprints) {
      const maybeTask = sprint.tasks.find(t => t.id === taskId);
      if (maybeTask !== undefined) {
        thisTask = maybeTask;
        thisSprint = sprint;
        break;
      }
    }

    const proposedStartDate = new Date(event.item.start! * 1000);
    const proposedEndDate = new Date(event.item.end! * 1000);

    if (proposedStartDate.getTime() === thisTask.startDate.getTime() && proposedEndDate.getTime() === thisTask.endDate.getTime()) {
      return;
    }

    if (proposedStartDate.getTime() < thisSprint.startDate.getTime()) {
      this.messageService.add({severity: 'error', summary: `Task cannot start before sprint start date, ${format(thisSprint.startDate, 'yyyy-MM-dd')}`, life: 5000});
      return;
    }

    if (proposedEndDate.getTime() > thisSprint.endDate.getTime()) {
      this.messageService.add({severity: 'error', summary: `Task cannot end after sprint end date, ${format(thisSprint.endDate, 'yyyy-MM-dd')}`, life: 5000});
      return;
    }

    thisTask.startDate = proposedStartDate;
    thisTask.endDate = proposedEndDate;
    this.taskService.putTask(thisTask).subscribe({
      error: (error) => {
        this.messageService.add({severity: 'error', summary: `Error updating task: ${error.message}`});
      },
    });
  }
}
