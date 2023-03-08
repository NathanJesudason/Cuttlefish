import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  ConfirmationService,
  MenuItem
} from 'primeng/api';

import { ServerApi } from 'src/app/services/server-api/server-api.service';

import { ProjectData } from 'src/types/project';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  providers: [ConfirmationService],
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
    private serverApi: ServerApi,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void { }

  confirmProjectDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this project?',
      accept: () => this.deleteThisProject(),
    });
  }

  deleteThisProject() {
    this.serverApi.deleteProject(this.project.id).subscribe({
      next: () => {
        this.deleteProject.emit(this.project.id);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
