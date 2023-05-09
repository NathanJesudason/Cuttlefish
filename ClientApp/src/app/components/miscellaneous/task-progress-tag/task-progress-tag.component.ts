import { Component, Input, OnInit } from '@angular/core';

import { TaskData } from 'src/types/task';

@Component({
  selector: 'task-progress-tag',
  templateUrl: './task-progress-tag.component.html',
  styleUrls: ['./task-progress-tag.component.css']
})
export class TaskProgressTagComponent implements OnInit {
  @Input() progress!: TaskData['progress'];

  progressColors: {[key in TaskData['progress']]: string} = {
    'Backlog': getComputedStyle(document.documentElement).getPropertyValue('--gray-400'),
    'In Progress': getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
    'In Review': getComputedStyle(document.documentElement).getPropertyValue('--yellow-500'),
    'Done': getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
  };

  progressIcons: {[key in TaskData['progress']]: string} = {
    'Backlog': 'pi pi-hourglass',
    'In Progress': 'pi pi-spin pi-spinner',
    'In Review': 'pi pi-clock',
    'Done': 'pi pi-check-circle',
  };

  constructor() { }

  ngOnInit(): void {}
}
