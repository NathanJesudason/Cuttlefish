import {
  Injectable,
  Inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  SprintData,
  SprintNotFoundError
} from '../../types/sprint';
import {
  TaskData,
  TaskNotFoundError
} from '../../types/task';
import {
  ProjectData,
  ProjectNotFoundError
} from '../../types/project';

@Injectable({providedIn: 'root'})
export class ServerApi {
  baseUrl: string;
  http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
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
  getWeatherForecast<T>(): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}weatherforecast`,
      {
        // to get the full HttpResponse instead of just the body, set observe to 'response'
        observe: 'body',
        responseType: 'json'
      }
    );
  }

  /**
   * 
   * @param id the id of the requested sprint
   * @returns `SprintData`
   * @throws `SprintNotFoundError` on invalid id
   */
  getSprintData(id: number): SprintData {
    // simple initial function
    const date = new Date();
    if (id === 0) {
      date.setHours(new Date().getHours() - 1);
      let tasks: TaskData[] = [];
      tasks.push(this.getFullTaskData(10000));
      tasks.push(this.getFullTaskData(10001));
      return {
        id: 0,
        name: 'Sprint 0',
        dueDate: date,
        complete: false,
        tasks: tasks,
      };
    } else if (id === 1) {
      date.setHours(new Date().getHours() - 1);
      let tasks: TaskData[] = [];
      tasks.push(this.getFullTaskData(10000));
      tasks.push(this.getFullTaskData(10001));
      return {
        id: 1,
        name: 'Sprint 1',
        dueDate: date,
        complete: true,
        tasks: tasks,
      };
    }
    else if (id === 2) {
      date.setHours(new Date().getHours() + 7);
      let tasks: TaskData[] = [];
      tasks.push(this.getFullTaskData(10001));
      return {
        id: 2,
        name: 'Sprint 1',
        dueDate: date,
        complete: false,
        tasks: tasks,
      };
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
   * @param id the id of the requested project
   * @returns `ProjectData`
   * @throws `ProjectNotFoundError`
   */
  getProjectData(id: number): ProjectData {
    if(id === 0) {
      let sprints: SprintData[] = [];
      sprints.push(this.getSprintData(0));
      sprints.push(this.getSprintData(1));
      return {
        id: 0,
        name: 'Cuttlefish Project',
        color: '#234001',
        description: 'The goal of this project is to complete the creation of Cuttlefish, our 2022-2023 senior capstone project',
        dueDate: new Date(),
        funds: 49.95,
        sprints: sprints,
      };
    } else if (id === 1) {
      let sprints: SprintData[] = [];
      sprints.push(this.getSprintData(2));
      return {
        id: 1,
        name: 'A Different Cuttlefish Project',
        color: '#D84B92',
        description: 'This is just a mock project to help fill some data into the site as we develop it',
        dueDate: new Date(),
        funds: 194,
        sprints: sprints,
      };
    }
    throw new ProjectNotFoundError('Project not found', id);
  }

  getAllProjects(): ProjectData[] {
    return [
      this.getProjectData(0),
      this.getProjectData(1)
    ];
  }
}
