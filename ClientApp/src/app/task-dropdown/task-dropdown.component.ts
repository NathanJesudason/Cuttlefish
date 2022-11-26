import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'task-dropdown',
  templateUrl: './task-dropdown.component.html',
  styleUrls: ['./task-dropdown.component.css']
})
export class TaskDropdownComponent implements OnInit {
  @Input() id!: number;
  @Input() name!: string;
  @Input() storyPoints!: number;
  @Input() assignee!: string;

  constructor() { }

  ngOnInit(): void {
  
  }
}
