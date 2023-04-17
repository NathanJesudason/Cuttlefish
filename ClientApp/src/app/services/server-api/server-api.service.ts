import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {
  SprintData,
  SprintNotFoundError
} from 'src/types/sprint';
import {
  TaskData,
  TaskNotFoundError
} from 'src/types/task';
import {
  ProjectData,
  ProjectNotFoundError
} from 'src/types/project';
import {
  LabelData,
  LabelNotFoundError
} from 'src/types/label';

import { environment } from 'src/environments/environment';

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
        goal: '',
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
        goal: '',
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
        goal: '',
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
        goal: '',
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
        goal: '',
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
   *
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
  }*/

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
        sprintID: 0,
        priority: 0,
        cost: 0,
        type: "Epic",
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
        sprintID: 0,
        priority: 0,
        cost: 0,
        type: "Epic",
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
        sprintID: 0,
        priority: 0,
        cost: 0,
        type: "Epic",
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
