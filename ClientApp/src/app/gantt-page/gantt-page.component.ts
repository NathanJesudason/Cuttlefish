import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item as GanttItem, Options as GanttOptions, SVGGantt } from 'gantt';

import { ServerApi } from '../server-api/server-api.service';

import { ProjectData } from '../../types/project';
import { TaskData } from '../../types/task';

@Component({
  selector: 'gantt-page',
  templateUrl: './gantt-page.component.html',
  styleUrls: ['./gantt-page.component.css']
})
export class GanttPageComponent implements OnInit {
  ganttChart!: SVGGantt;
  defaultChartOptions!: GanttOptions;
  
  projectData!: ProjectData;

  selectedViewMode!: 'day' | 'week' | 'month';
  
  constructor(
    private serverApi: ServerApi,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.selectedViewMode = 'day';
    this.defaultChartOptions = {
      viewMode: this.selectedViewMode,
      onClick: (ganttItem: GanttItem) => {
        this.router.navigate(['task', ganttItem.id]);
        return {};
      },
    };

    this.createGanttChart();
  }

  private taskToGanttItem(task: TaskData): GanttItem {
    let item: GanttItem = {
      id: task.id,
      parent: -1,
      text: `${task.id}: ${task.name}`,
      start: task.startDate ? task.startDate : new Date(),
      end: task.endDate ? task.endDate : new Date(),
      percent: 0,
      links: [],
    };

    // need to calculate parent (epic this task is contained within)

    // do we want to use the percent completion marker?

    // need to calculate links (to epic, any sub tasks, other upwards/downwards dependencies)

    return item;
  }

  createGanttChart(): void {
    let data: GanttItem[] = [];
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.projectData = this.serverApi.getProjectData(id);
    for (const sprint of this.projectData.sprints) {
      for (const task of sprint.tasks) {
        data.push(this.taskToGanttItem(task));
      } 
    }
    
    this.ganttChart = new SVGGantt('#gantt-chart', data, {
      viewMode: this.selectedViewMode,
      onClick: (ganttItem: GanttItem) => {
        this.router.navigate(['task', ganttItem.id]);
        return {};
      },
    });
  }

  changeViewMode(viewMode: 'day' | 'week' | 'month'): void {
    this.ganttChart.setOptions({...this.defaultChartOptions, viewMode: viewMode});
  }
}
