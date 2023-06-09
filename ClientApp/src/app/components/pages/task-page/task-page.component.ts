/*
* Component Folder: task-page
* Component Name: TaskPageComponent
* Description:
*     The task page component is used to display all the content of a
*   task. The content of the page is as follows (from top to bottom):
*
*     - Back Button, Task# and Title, Delete Task Button
*     - Labels and progress
*     - Label and Dependency dropdowns
*     - Add/Remove Dependency pickers
*     - Description
*     - Start and End Dates
*     - Funding
*     - Comments
*
*     Through the page, dependencies and labels can be added and removed.
*   The description, dates, and funding can be edited. Finally, the comments
*   are displayed at the bottom of the page as cards signifying the user that
*   created them, and buttons to write on one's own comments.
*/

import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Location } from '@angular/common';

import {
  TaskData,
  TaskNotFoundError
} from 'src/types/task';
import { ProgressPickerComponent } from 'src/app/components/pickers/progress-picker/progress-picker.component';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { SprintService } from 'src/app/services/sprint/sprint.service'
import { BasicFadeAmination } from 'src/app/animations/animations';
import { LabelData } from 'src/types/label';
import { MessageService } from 'primeng/api';
import { ProjectData } from 'src/types/project';
import { SprintData } from 'src/types/sprint';

@Component({
  selector: 'task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  providers: [MessageService],
  animations: [BasicFadeAmination],
})
export class TaskPageComponent implements OnInit {
  pageLoading: boolean = true;
  allLabels: LabelData[] = [];
  taskData!: TaskData;
  sprintData!: SprintData; // sprintData.projectID is ProjectID# is in SprintData variable after init
  projectData: ProjectData = {} as ProjectData;
  oldLabelRelations: LabelData[] = [];
  @ViewChild('progressPicker') progressPicker !: ProgressPickerComponent;

  constructor(
    private taskApi: TaskApi,
    private projectApi: ProjectService,
    private sprintService: SprintService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(_routeParams => {
      this.pageLoading = true;
      this.loadTaskData();      // populate sprint data
    });
  }

  deleteTask(): void {
    this.taskApi.deleteTask(this.taskData).subscribe({
      next: () => {
        this.location.back();
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: `Error updating goal: ${err}`});
      }
    })
  }


  updateLabels(value: LabelData[]){
    try{
      if(value.length > this.oldLabelRelations.length ){
        //find relation that was added
        const valueChange = value.filter(x => !this.oldLabelRelations.includes(x))

        valueChange.forEach(x => {
          this.taskApi.AddLabelRelation(x, this.taskData.id).subscribe({
            error: (err) => {
              this.messageService.add({severity: 'error', summary: err.error.message});
            }
          })
        })
      } else {
        //find relation that was removed
        const valueChange = this.oldLabelRelations.filter(x => !value.includes(x))

        valueChange.forEach(x => {
          this.taskApi.deleteLabelRelations(x, this.taskData.id).subscribe({
            error: (err) => {
              this.messageService.add({severity: 'error', summary: err});
            }
          })
        })
      }
      this.oldLabelRelations = value;
    } catch (error) {
      this.messageService.add({severity: 'error', summary: `Error updating labels: ${error}`});
      this.taskData.labels = this.oldLabelRelations;
      return;
    }
  }

  loadTaskData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    try {
      this.taskApi.getFullTaskData(id).subscribe({
        next: task => {
          this.taskData = task;
          this.oldLabelRelations = this.taskData.labels ? this.taskData.labels : [];

          this.sprintService.getSprint(task.sprintID).subscribe({
            next: sprint => {
              this.sprintData = sprint;
              this.loadProjectTasks();  // populate project data
              this.loadTaskDependencies(); // populate task dependencies
              this.pageLoading = false;
            } 
          });

          this.taskApi.getTaskRelations().subscribe({
            next: relations => {
              let fullDependencies: number[] = [];
              
              // Filter relations to get only dependencies for the current task
              let currentTaskDependencies = relations.filter(rel => rel.independentTaskID === id);
        
              for(let i = 0; i < currentTaskDependencies.length; i++) {
                const dependencyId = currentTaskDependencies[i].dependentTaskID;
        
                this.taskApi.getTaskData(dependencyId).subscribe({
                  next: dependencyTaskData => {
                    if(dependencyTaskData) {
                      fullDependencies.push(dependencyTaskData.id);
                    }
                  },
                  error: err => {
                    this.messageService.add({severity: 'error', summary: `Error loading dependencies: ${err.message}`});
                  }
                });
              }
        
              this.taskData.dependencies = this.taskData.dependencies ?? [];
              this.taskData.dependencies.push(...fullDependencies);
            },
            error: err => {
              this.messageService.add({severity: 'error', summary: `Error getting task relations: ${err.message}`});
            }
          });
        },
        error: err => {
          if (err instanceof TaskNotFoundError) {
            this.router.navigate(['not-found', 'task', this.route.snapshot.paramMap.get('id')!]);
            return;
          } else {
            this.messageService.add({severity: 'error', summary: `Error loading task: ${err.message}`});
            this.pageLoading = false;
          }
        },
      });

      this.taskApi.getLabels().subscribe({
        next: labels => {
          labels.forEach(label => {this.allLabels.push({label: label.label, color: label.color})})
        }
      })
      
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        this.router.navigate(['not-found', 'task', this.route.snapshot.paramMap.get('id')!]);
        return;
      }
    }
  }

  loadProjectTasks(): void {
    // Because sprint data already has projectId, we can use it to get project data
    const projectId = this.sprintData.projectId;
    this.projectApi.getProject(projectId, true, true).subscribe(
      (data: ProjectData) => {
        this.projectData = data;
      },
      (error: any) => {
        console.error('Error: Failed to load project on task page', error);
      }
    );
  }

  // Add Get Task Relations Function Here
  loadTaskDependencies(): void {
    this.taskApi.getTaskRelations().subscribe({
      next: relations => {
        const relevantRelations = relations.filter(rel => rel.dependentTaskID === this.taskData.id);
        this.taskData.dependencies = relevantRelations.map(rel => rel.independentTaskID);
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: `Error getting task relations: ${err.message}`});
      },
    });
  }
}
