/*
* Component Folder: gantt-page
* Component Name: GanttPageComponent
* Repositories Used (all rights reserved to original authors):
*   - worktile/ngx-gantt (https://github.com/worktile/ngx-gantt)
* Description:
*      Utilizes the ngx-gantt library to display a gantt chart of the project's sprints.
*   This information is retrieved from the project service. The user is also able to create
*   and delete connections between tasks, which signify dependencies between tasks. The Gantt
*   chart's goal is to display all the given sprints and tasks of a project in an elegant,
*   easy-to-read manner.
*/

import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import {
  GanttBarClickEvent,
  GanttItem,
  GanttSelectedEvent,
  GanttViewOptions,
  GanttViewType
} from '@worktile/gantt';

import { format } from 'date-fns';
import { ProjectService } from 'src/app/services/project/project.service';

import { ProjectNotFoundError} from 'src/types/project';
import { TaskData } from 'src/types/task';

@Component({
  selector: 'gantt-page',
  templateUrl: './gantt-page.component.html',
  styleUrls: ['./gantt-page.component.css']
})
export class GanttPageComponent implements OnInit {
  items: GanttItem[] = [];

  projectId!: number;

  // these strings come from date-fns format()
  viewOptions: GanttViewOptions = {
    dateFormat: {
      week: `'Week' w`,
      month: `LLLL`,
      quarter: `QQQ yyyy`,
      yearMonth: `LLLL`,
      yearQuarter: `QQQ yyyy`,
      year: `y`,
    }
  };

  selectedViewMode!: GanttViewType;
  
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadProjectData();
    this.selectedViewMode = GanttViewType.day;
  }

  loadProjectData() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id')!);

    this.projectService.getProject(this.projectId, true, true).subscribe({
      next: (data) => {
        for (const sprint of data.sprints) {
          this.items.push(...sprint.tasks.map(this.taskToGanttItem));
        }
      },
      error: (error) => {
        if (error instanceof ProjectNotFoundError) {
          this.router.navigate(['not-found', 'project', this.route.snapshot.paramMap.get('id')!]);
          return;
        }
      },
    });
  }

  private taskToGanttItem(task: TaskData): GanttItem {
    let item: GanttItem = {
      id: String(task.id),
      title: `${task.id}: ${task.name}`,
      start: task.startDate ? task.startDate.getTime() : undefined,
      end: task.endDate ? task.endDate.getTime() : undefined,
    };

    // need to calculate group_id (epic this task is contained within)

    // do we want to use the progress completion marker?

    // need to calculate links (to epic, any sub tasks, other upwards/downwards dependencies)

    return item;
  }

  // so that we can use date-fns format() in the html file
  format(date: Date | number | undefined, str: string) {
    if (typeof date === 'undefined') {
      return "none";
    }
    return format(date, str);
  }

  itemBarClick(event: GanttBarClickEvent) {
    this.router.navigate(['task', event.item.id]);
  }

  itemTitleClick(event: GanttSelectedEvent) {
    this.router.navigate(['task', (event.selectedValue as GanttItem).id]);
  }
}
