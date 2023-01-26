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

import { ServerApi } from '../server-api/server-api.service';

import {
  ProjectData,
  ProjectNotFoundError
} from '../../types/project';
import { TaskData } from '../../types/task';

@Component({
  selector: 'gantt-page',
  templateUrl: './gantt-page.component.html',
  styleUrls: ['./gantt-page.component.css']
})
export class GanttPageComponent implements OnInit {
  projectData!: ProjectData;

  items: GanttItem[] = [];

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
    private serverApi: ServerApi,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadProjectData();
    this.selectedViewMode = GanttViewType.day;
  }

  loadProjectData() {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    try {
      this.projectData = this.serverApi.getProjectData(id);
    } catch (error) {
      if (error instanceof ProjectNotFoundError) {
        this.router.navigate(['not-found', 'project', this.route.snapshot.paramMap.get('id')!]);
        return;
      }
    }

    for (const sprint of this.projectData.sprints) {
      this.items.push(...sprint.tasks.map(this.taskToGanttItem));
    }
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
