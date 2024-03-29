/*
* Component Folder: project-card
* Component Name: ProjectCardComponent
* Description:
*     This component represents a project card. It is displayed on the
*   projects page and contains the following content from top to bottom:
*   project color choice, project number and title, project description, the
*   navigate to project button, and the project options menu button (currently
*   only the delete option).
*     Deleting the project is done by calling the deleteProject() method from
*   the project service.
*/

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  ConfirmationService,
  MenuItem,
  MessageService
} from 'primeng/api';

import { ProjectService } from 'src/app/services/project/project.service';

import { ProjectData } from 'src/types/project';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: ProjectData;
  @Output() deleteProject = new EventEmitter<number>();

  projectOptionsMenuItems: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.confirmProjectDeletion(),
    },
  ];

  constructor(
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void { }

  confirmProjectDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this project?',
      accept: () => this.deleteThisProject(),
    });
  }

  deleteThisProject() {
    this.projectService.deleteProject(this.project.id).subscribe({
      next: () => {
        this.deleteProject.emit(this.project.id);
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: err.message});
      }
    });
  }
}
