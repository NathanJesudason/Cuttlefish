import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { MessageService } from 'primeng/api';

import { SprintDropdownComponent } from 'src/app/components/miscellaneous/sprint-dropdown/sprint-dropdown.component';
import { CreateSprintModalComponent } from 'src/app/components/modals/create-sprint-modal/create-sprint-modal.component';
import { ServerApi } from 'src/app/services/server-api/server-api.service';

import {
  ProjectData,
  ProjectNotFoundError
} from 'src/types/project';
import { SprintData } from 'src/types/sprint';

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  providers: [MessageService],
})
export class ProjectPageComponent {
  projectData!: ProjectData;

  collapseButtonText: 'Collapse All' | 'Expand All' = 'Collapse All';
  sprintsCollapsed: boolean = false;
  completedSprintsShown: boolean = false;

  @ViewChildren('sprintDropdown') sprintDropdowns!: QueryList<ElementRef<SprintDropdownComponent>>;
  @ViewChild('createSprintModal') createSprintModal!: ElementRef<CreateSprintModalComponent>;
  
  constructor(
    private serverApi: ServerApi,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(_routeParams => {
      this.loadProjectData();
    });
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

    this.projectData.sprints.sort(ProjectPageComponent.sprintOrdering);
  }

  toggleCollapseSprints() {
    if (!this.sprintsCollapsed) {
      for (const sprintDropdown of this.sprintDropdowns.toArray()) {
        if (!(sprintDropdown as any).hidden) {
          (sprintDropdown as any).collapse();
        }
      }
      this.collapseButtonText = 'Expand All';
    } else {
      for (const sprintDropdown of this.sprintDropdowns.toArray()) {
        if (!(sprintDropdown as any).hidden) {
          (sprintDropdown as any).expand();
        }
      }
      this.collapseButtonText = 'Collapse All';
    }
    this.sprintsCollapsed = !this.sprintsCollapsed;
    this.messageService.add({severity: 'success', summary: `Sprints are collapsed? ${this.sprintsCollapsed}`});
  }

  toggleHideCompletedSprints(event: {checked: boolean}) {
    if (event.checked) {
      for (const sprintDropdown of this.sprintDropdowns.toArray()) {
        (sprintDropdown as any).unhide();
      }
    } else {
      for (const sprintDropdown of this.sprintDropdowns.toArray()) {
        if ((sprintDropdown as any).data.isCompleted) {
          (sprintDropdown as any).hide();
        }
      }
    }
    this.messageService.add({severity: 'success', summary: `Completed sprints are shown? ${event.checked}`});
  }

  // for use within the array's builtin sort()
  static sprintOrdering(a: SprintData, b: SprintData): number {
    // backlogs must be at the bottom
    if (a.isBacklog && !b.isBacklog) {
      return 1;
    }
    if (b.isBacklog && !a.isBacklog) {
      return -1;
    }
    
    // completed sprints must be at the top
    if (a.isCompleted && !b.isCompleted) {
      return -1;
    }
    if (b.isCompleted && !a.isCompleted) {
      return 1;
    }

    // as long as both have a start time, sort by start time
    if (a.startDate && b.startDate) {
      return a.startDate.getTime() - b.startDate.getTime();
    }
    
    // as a last resort, sort by id
    return a.id - b.id;
  }

  showCreateSprintModal() {
    (this.createSprintModal as any).showCreateSprintModal();
  }
}
