import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { TaskData } from '../../types/task';

@Component({
  selector: 'task-dropdown',
  templateUrl: './task-dropdown.component.html',
  styleUrls: ['./task-dropdown.component.css']
})
export class TaskDropdownComponent implements OnInit {
  @Input() taskData!: TaskData;

  constructor() { }

  ngOnInit(): void { }
}
