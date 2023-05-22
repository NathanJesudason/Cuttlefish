/*
* Component Folder: project-page
* Component Name: ProjectPageComponent
* Description:
*     The project-page serves as the primary page for viewing and
*   interacting with a project. The page displays the project title
*   and color, the dates, the funding, the description, the button
*   to navigate to the project Gantt chart, the create sprint button,
*   and all of the sprint cards, with an option to expand or collapse
*   all of the sprint cards at once. 
*/

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
import { ProjectService } from 'src/app/services/project/project.service';
import { BasicFadeAmination } from 'src/app/animations/animations';
import { SprintOrderingService } from 'src/app/services/sprint-ordering/sprint-ordering.service';

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
  animations: [BasicFadeAmination],
})
export class ProjectPageComponent {
  pageLoading: boolean = true;
  
  projectData!: ProjectData;

  collapseButtonText: 'Collapse All' | 'Expand All' = 'Collapse All';
  collapseButtonIcon: 'pi pi-chevron-up' | 'pi pi-chevron-down' = 'pi pi-chevron-up';
  sprintsCollapsed: boolean = false;
  completedSprintsShown: boolean = false;

  @ViewChildren('sprintDropdown') sprintDropdowns!: QueryList<ElementRef<SprintDropdownComponent>>;
  @ViewChild('createSprintModal') createSprintModal!: ElementRef<CreateSprintModalComponent>;
  
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private sprintOrderingService: SprintOrderingService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(_routeParams => {
      this.pageLoading = true;
      this.loadProjectData();
    });
  }

  loadProjectData() {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    this.projectService.getProject(id, true, true).subscribe({
      next: (projectData: ProjectData) => {
        this.projectData = projectData;
        this.projectData.sprints.sort(ProjectPageComponent.sprintOrdering);
        this.pageLoading = false;
      },
      error: (err) => {
        if (err instanceof ProjectNotFoundError) {
          this.router.navigate(['not-found', 'project', this.route.snapshot.paramMap.get('id')!]);
          return;
        }
      }
    });
  }

  toggleCollapseSprints() {
    if (!this.sprintsCollapsed) {
      for (const sprintDropdown of this.sprintDropdowns.toArray()) {
        if (!(sprintDropdown as any).hidden) {
          (sprintDropdown as any).collapse();
        }
      }
      this.collapseButtonText = 'Expand All';
      this.collapseButtonIcon = 'pi pi-chevron-down';
    } else {
      for (const sprintDropdown of this.sprintDropdowns.toArray()) {
        if (!(sprintDropdown as any).hidden) {
          (sprintDropdown as any).expand();
        }
      }
      this.collapseButtonText = 'Collapse All';
      this.collapseButtonIcon = 'pi pi-chevron-up';
    }
    this.sprintsCollapsed = !this.sprintsCollapsed;
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

  deleteSprint(sprintId: number) {
    this.projectData.sprints = this.projectData.sprints.filter(sprint => sprint.id !== sprintId);
  }

  removeTaskFromSprint(event: { taskId: number, oldOrder: number, prevSprintId: number }) {
    const prevSprint = this.projectData.sprints.find(sprint => sprint.id === event.prevSprintId)!;
    prevSprint.tasks = prevSprint.tasks.filter(task => task.id !== event.taskId);
    prevSprint.tasks.forEach((task, i) => {
      if (task.order > event.oldOrder) {
        prevSprint.tasks[i].order--;
      }
    });
    this.sprintOrderingService.removeReorderTasksInSprint(event.prevSprintId, event.oldOrder).subscribe({
      error: (err) => {
        console.error(err);
      },
    });
  }
}
