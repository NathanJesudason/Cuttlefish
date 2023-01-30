import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MessageService } from 'primeng/api';

import { SprintDropdownComponent } from '../sprint-dropdown/sprint-dropdown.component';
import { ServerApi } from '../server-api/server-api.service';

import {
  ProjectData,
  ProjectNotFoundError
} from '../../types/project';
import { SprintData } from '../../types/sprint';

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  providers: [MessageService],
})
export class ProjectPageComponent {
  projectData!: ProjectData;

  collapseButtonText: 'Collapse All' | 'Uncollapse All' = 'Collapse All';
  sprintsCollapsed: boolean = false;
  completedSprintsShown: boolean = false;

  @ViewChildren('sprintDropdown') sprintDropdowns!: QueryList<ElementRef<SprintDropdownComponent>>;
  
  constructor(
    private serverApi: ServerApi,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.loadProjectData();
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
      this.collapseButtonText = 'Uncollapse All';
    } else {
      for (const sprintDropdown of this.sprintDropdowns.toArray()) {
        if (!(sprintDropdown as any).hidden) {
          (sprintDropdown as any).uncollapse();
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

    // everything else is ascending order by id
    return a.startDate.getTime() - b.startDate.getTime();
  }
}
