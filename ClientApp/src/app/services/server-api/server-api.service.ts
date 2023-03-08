import {
  Injectable,
  Inject
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  SprintData,
  SprintNotFoundError
} from 'src/types/sprint';
import {
  TaskData,
  TaskNotFoundError
} from 'src/types/task';
import {
  BackendProjectData,
  ProjectData,
  ProjectNotFoundError
} from 'src/types/project';
import { LabelData, LabelNotFoundError } from 'src/types/label';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ServerApi {
  baseUrl: string = environment.url;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  setHttpClient(http: HttpClient) {
    this.http = http;
  }

  /**
   * Simple http GET of the `'weatherforecast'` endpoint that's provided in the sample.
   * No error checking is done
   * @type The type that you expect to receive in the result (`WeatherForecast[]`)
   * @return An `Observable<T>` that stores the body of the HTTP response
   */
  // an example call to the backend, until we don't need it anymore
  // getWeatherForecast<T>(): Observable<T> {
  //   return this.http.get<T>(
  //     `${this.baseUrl}weatherforecast`,
  //     {
  //       // to get the full HttpResponse instead of just the body, set observe to 'response'
  //       observe: 'body',
  //       responseType: 'json'
  //     }
  //   );
  // }

  /**
   * 
   * @param id the id of the requested sprint
   * @returns `SprintData`
   * @throws `SprintNotFoundError` on invalid id
   */
  getSprintData(id: number): SprintData {
    // simple initial function
    if (id === 0) {
      let tasks: TaskData[] = [];
      tasks.push(this.getFullTaskData(10000));
      tasks.push(this.getFullTaskData(10001));
      let attempted = 0, completed = 0;
      tasks.forEach(task => {
        if (task.progress === 'Done') completed += task.storyPoints;
        attempted += task.storyPoints;
      });
      return {
        id: 0,
        name: 'Team Cuttlefish - Sprint 0',
        startDate: new Date(Date.parse('17 Jan 2023 00:00:00 GMT')),
        endDate: new Date(Date.parse('31 Jan 2023 00:00:00 GMT')),
        isCompleted: true,
        pointsAttempted: attempted,
        pointsCompleted: completed,
        projectId: 0,
        isBacklog: false,
        tasks: tasks,
      };
    } else if (id === 1) {
      let tasks: TaskData[] = [];
      tasks.push(this.getFullTaskData(10000));
      tasks.push(this.getFullTaskData(10001));
      let attempted = 0, completed = 0;
      tasks.forEach(task => {
        if (task.progress === 'Done') completed += task.storyPoints;
        attempted += task.storyPoints;
      });
      return {
        id: 1,
        name: 'Team Cuttlefish - Sprint 1',
        startDate: new Date(Date.parse('1 Feb 2023 00:00:00 GMT')),
        endDate: new Date(Date.parse('15 Feb 2023 00:00:00 GMT')),
        isCompleted: false,
        pointsAttempted: attempted,
        pointsCompleted: completed,
        projectId: 0,
        isBacklog: false,
        tasks: tasks,
      };
    }
    else if (id === 2) {
      let tasks: TaskData[] = [];
      tasks.push(this.getFullTaskData(10001));
      let attempted = 0, completed = 0;
      tasks.forEach(task => {
        if (task.progress === 'Done') completed += task.storyPoints;
        attempted += task.storyPoints;
      });
      return {
        id: 2,
        name: 'Different Team Cuttlefish - Sprint 2',
        startDate: new Date(Date.parse('19 Jan 2023 00:00:00 GMT')),
        endDate: new Date(Date.parse('2 Feb 2023 00:00:00 GMT')),
        isCompleted: false,
        pointsAttempted: attempted,
        pointsCompleted: completed,
        projectId: 1,
        isBacklog: false,
        tasks: tasks,
      };
    } else if (id == 3) {
      let tasks: TaskData[] = [];
      tasks.push(this.getFullTaskData(10002));
      let attempted = 0;
      tasks.forEach(task => {
        attempted += task.storyPoints;
      });
      return {
        id: 3,
        name: 'Backlog',
        startDate: new Date(0),
        endDate: new Date(0),
        isCompleted: false,
        pointsAttempted: attempted,
        pointsCompleted: 0,
        projectId: 0,
        isBacklog: true,
        tasks: tasks,
      }
    } else if (id == 4) {
      let tasks: TaskData[] = [];
      tasks.push(this.getFullTaskData(10002));
      let attempted = 0;
      tasks.forEach(task => {
        attempted += task.storyPoints;
      });
      return {
        id: 4,
        name: 'Backlog',
        startDate: new Date(0),
        endDate: new Date(0),
        isCompleted: false,
        pointsAttempted: attempted,
        pointsCompleted: 0,
        projectId: 1,
        isBacklog: true,
        tasks: tasks,
      }
    }
    throw new SprintNotFoundError('Sprint not found', id);
  }

  /**
   * 
   * @param id the id of the requested task
   * @returns `TaskData`
   * @throws `TaskNotFoundError` on invalid id
   */
  getTaskData(id: number): TaskData {
    // simple initial function
    if (id === 10000) {
      return {
        id: 10000,
        name: 'Work on angular',
        assignee: 'Sebastian Hardin',
        storyPoints: 5,
        description: 'This is the description of the task',
        progress: 'In Review',
        startDate: new Date(Date.parse('12/27/2022')),
        endDate: new Date(Date.parse('12/28/2022')),
      };
    } else if (id === 10001) {
      return {
        id: 10001,
        name: 'Add properties to database',
        assignee: 'Sebastian Hardin',
        storyPoints: 3,
        description: 'This is the description of the task',
        progress: 'Backlog',
        startDate: new Date(Date.parse('12/23/2022')),
        endDate: new Date(Date.parse('12/26/2022')),
      };
    }
    throw new TaskNotFoundError('Task not found', id);
  }

  /**
   * 
   * @param id the id of the requested task
   * @returns `TaskData`
   * @throws `TaskNotFoundError` on invalid id
   */
  getFullTaskData(id: number): TaskData {
    if (id === 10000) {
      return {
        id: 10000,
        name: 'Work on angular',
        assignee: 'Sebastian Hardin',
        storyPoints: 5,
        description: 'This is the description of the task',
        progress: 'Done',
        startDate: new Date(Date.parse('12/27/2022')),
        endDate: new Date(Date.parse('12/28/2022')),
        labels: [this.getLabel('frontend')],
      };
    } else if (id === 10001) {
      return {
        id: 10001,
        name: 'Add properties to database',
        assignee: 'Sebastian Hardin',
        storyPoints: 3,
        description: 'This is the description of the task',
        progress: 'Backlog',
        startDate: new Date(Date.parse('12/23/2022')),
        endDate: new Date(Date.parse('12/26/2022')),
        labels: [this.getLabel('backend'), this.getLabel('database')],
      };
    } else if (id === 10002) {
      return {
        id: 10002,
        name: 'Backlog task',
        assignee: 'Sebastian Hardin',
        storyPoints: 1,
        description: 'This is a test task that exists in the backlog',
        progress: 'Backlog',
        startDate: undefined,
        endDate: undefined,
        labels: [this.getLabel('frontend')],
      }
    }
    throw new TaskNotFoundError('Task not found', id);
  }

  /**
   * 
   * @param id the id of the requested project
   * @returns `ProjectData`
   * @throws `ProjectNotFoundError`
   */
  getProjectData(id: number): ProjectData {
    if(id === 0) {
      let sprints: SprintData[] = [];
      sprints.push(this.getSprintData(0));
      sprints.push(this.getSprintData(1));
      sprints.push(this.getSprintData(3));
      return {
        id: 0,
        name: 'Cuttlefish Project',
        color: '#234001',
        description: 'The goal of this project is to complete the creation of Cuttlefish, our 2022-2023 senior capstone project',
        endDate: new Date(),
        funds: 49.95,
        sprints: sprints,
      };
    } else if (id === 1) {
      let sprints: SprintData[] = [];
      sprints.push(this.getSprintData(2));
      sprints.push(this.getSprintData(4));
      return {
        id: 1,
        name: 'A Different Cuttlefish Project',
        color: '#D84B92',
        description: 'This is just a mock project to help fill some data into the site as we develop it',
        endDate: new Date(),
        funds: 194,
        sprints: sprints,
      };
    }
    throw new ProjectNotFoundError('Project not found', id);
  }

  /**
   * A small helper to convert from the backend's project format to the frontend's `ProjectData` format
   * @param backendProject the project in the backend's format
   * @returns the project as a `ProjectData` object
   */
  private backendProjectToProjectData(backendProject: BackendProjectData): ProjectData {
    return {
      id: backendProject.id,
      name: backendProject.name,
      color: `#${backendProject.color}`,
      description: backendProject.description,
      startDate: backendProject.startDate ? new Date(backendProject.startDate) : undefined,
      endDate: backendProject.dueDate ? new Date(backendProject.dueDate) : undefined,
      funds: backendProject.funds,
      sprints: [],
    };
  }

  /**
   * A small helper to convert from the frontend's `ProjectData` format to the backend's project format
   * @param project the project to convert to the backend's format
   * @returns the project in the backend's format
   */
  private projectDataToBackendProject(project: ProjectData): BackendProjectData {
    return {
      id: project.id,
      name: project.name,
      color: project.color.slice(1),
      description: project.description,
      startDate: project.startDate ? project.startDate.toISOString() : "",
      dueDate: project.endDate ? project.endDate.toISOString() : "",
      funds: project.funds,
    };
  }

  /**
   * Create a project with the given data
   * @param project the data to create the project with
   *  - `id` will be ignored, the backend will assign the next available id
   * @returns `Observable<ProjectData>` the created project
   */
  createProject(project: ProjectData): Observable<ProjectData> {
    project.id = 0;
    const backendProject = this.projectDataToBackendProject(project);
    return this.http.post(`${this.baseUrl}Projects`, backendProject)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error creating project: ${err.error.message}`));
        }),
        map((data: any) => {
          return this.backendProjectToProjectData(data);
        }),
      );
  }

  /**
   * Get all projects that the logged in user is a part of
   * @returns `Observable<ProjectData[]>`, all projects, which have empty `sprints` arrays
   */
  getAllProjects(): Observable<ProjectData[]> {
    return this.http.get(`${this.baseUrl}Projects`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error getting projects: ${err.error.message}`));
        }),
        map((data: any) => {
          let projects: ProjectData[] = [];
          for (let project of data) {
            projects.push(this.backendProjectToProjectData(project));
          }
          return projects;
        }),
      );
  }

  /**
   * Delete a project with the given id
   * @param id the id of the project to delete
   * @returns an `Observable` that completes when the project is deleted
   */
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Projects/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error deleting project: ${err.error.message}`));
        }),
      );
  }

  getLabel(name: string): LabelData {
    if (name === 'frontend') {
      return {
        name: 'frontend',
        color: '#F782CA',
      };
    } else if (name === 'backend') {
      return {
        name: 'backend',
        color: '#CEEF49',
      };
    } else if (name === 'database') {
      return {
        name: 'database',
        color: '#A3EE82',
      };
    }
    throw new LabelNotFoundError('Label not found', name);
  }

  getTasksByLabel(name: string): TaskData[] {
    if (name === 'frontend') {
      return [
        this.getFullTaskData(10000),
        this.getFullTaskData(10002),
      ];
    } else if (name === 'backend') {
      return [
        this.getFullTaskData(10001),
      ];
    } else if (name === 'database') {
      return [
        this.getFullTaskData(10001),
      ];
    }
    return [];
  }

  getAllLabels(): LabelData[] {
    return [
      this.getLabel('frontend'),
      this.getLabel('backend'),
      this.getLabel('database'),
    ];
  }
}
