/*
* Component Folder: task-progress-tag
* Component Name: TaskProgressTagComponent
* Description:
*     The task-progress-tag serves a given task's progress in a compact tag to be displayed
*   on the project page. It loads the appropriate color and icon for the given progress.
*   The possible progress options are 'Backlog', 'In Progress', 'In Review', and 'Done'.
*/

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
    'In Progress': 'pi pi-ellipsis-h',
    'In Review': 'pi pi-clock',
    'Done': 'pi pi-check-circle',
  };

  constructor() { }

  ngOnInit(): void {}
}
