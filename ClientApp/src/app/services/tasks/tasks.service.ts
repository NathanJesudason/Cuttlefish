import {
  Injectable
} from '@angular/core';
  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  
import { TaskData } from 'src/types/task';

import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  throwError
} from 'rxjs';
  
import { LabelData } from 'src/types/label';
import { environment } from 'src/environments/environment';
  
@Injectable({providedIn: 'root'})
export class TaskApi {
  baseUrl: string = environment.url;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  setHttpClient(http: HttpClient) {
    this.http = http;
  }

  /**
   * @param id the id of the requested task
   * @returns `TaskData`
   * @throws `HTTPErrorResponse` on any error
   */
  getTaskData(id: number): Observable<TaskData> {
    return this.http.get<TaskData>(`${environment.url}Tasks/${id}`, {	
      observe: 'body',
      responseType: 'json'
    })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    )
  }

  /**
   * @returns `List of tasks`
   * @throws `HTTPErrorResponse` on any error
   */
  getAllTasks(): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(`${environment.url}Tasks`, {	
      observe: 'body',
      responseType: 'json'
    })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * NOTE: this might be temporary depending on service structure
   * @returns `The entries in the m2m table with task IDs and label names`
   * @throws `HTTPErrorResponse` on any error
   */
  getLabelRelations() {
    return this.http.get<any[]>(`${environment.url}LabelsToTasks`, {	
      observe: 'body',
      responseType: 'json'
    })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * @param id the id of the requested task
   * @returns The label relations for a task
   * @throws `HTTPErrorResponse` on any error
   */
  getLabelRelationsByID(id: number) {
    return this.http.get<{id: number, label:string, taskID:number;}[]>(`${environment.url}LabelsToTasks/${id}/labels`, {	
      observe: 'body',
      responseType: 'json'
    })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * NOTE: this might be temporary depending on service structure
   * @param id the id of the requested task
   * @returns `TaskData`
   * @throws `HTTPErrorResponse` on any error
   */
  getLabel(id: string){
    return this.http.get<{label:string, color:string;}>(`${environment.url}labels/${id}`, {	
      observe: 'body',
      responseType: 'json'
    })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * NOTE: this might be temporary depending on service structure
   * @param id the id of the requested task
   * @returns `TaskData`
   * @throws `HTTPErrorResponse` on any error
   */
  getLabels(){
    return this.http.get<{label:string, color:string;}[]>(`${environment.url}labels`, {	
      observe: 'body',
      responseType: 'json'
    })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * Deletes a label relationship for a task. 
   * @param oldLabel the old label relation
   * @param id the Task ID
   * @throws `HTTPErrorResponse`
   */
  deleteLabelRelations(oldLabel: LabelData, id: number){
    return this.http.delete(`${environment.url}LabelsToTasks/${oldLabel.name}/${id}`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    )
  }

  /**
   * Adds a label relationship for a task
   * @param newLabel new label for the task to have
   * @param id the Task ID
   * @throws `HTTPErrorResponse`
   */
  AddLabelRelation(newLabel: LabelData, id: number){
    return this.http.post(`${environment.url}LabelsToTasks/`, {taskID: id, label: newLabel.name})
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    )
  }

  /**
   * Gets all tasks with a certain progress
   * @param progress the progress of the tasks
   * @returns an array of TaskData
   * @throws `HTTPErrorResponse` on any error
   */
  getAllTasksWithProgress(progress: string): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(`${environment.url}Tasks/progress/${progress}`, {	
      observe: 'body',
      responseType: 'json'
    })    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * Gets the task data along with its labels
   * @param id the Task ID
   * @throws `HTTPErrorResponse` on any error
   */
  getTaskDataWithLabels(id: number) {
    return this.getTaskData(id).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      }),
      switchMap((task) => {
        return this.getLabelRelationsByID(task.id).pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
          }),
          switchMap((labelRelations) => {
            return this.getLabels().pipe(
              catchError((err: HttpErrorResponse) => {
                return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
              }),
              map((allLabels) => {
                var listofIds: string[] = []
                labelRelations.forEach(r => {
                  listofIds.push(r.label)
                })
                var newLabels = allLabels.filter(r => listofIds.includes(r.label));
                task.labels = []
                newLabels.forEach(r => {
                  task.labels!.push({name: r.label, color: r.color});
                });
                return task;
              }),
            )
          }),
        )
      }),
    )
  }

  //Small helper to convert between label in database and label in UI
  labelAdaptor(input: {label: string, color: string;}): LabelData {
    return {name: input.label, color: input.color};
  }

  /**
   * Gets all task that have a label
   * @param Label the label to query
   * @throws error if it catches HttpErrorResponse
   */
  getAllTasksWithLabel(Label: LabelData) {
    return this.getAllTasks().pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting sprints: ${err.error.message}`));
      }),
      switchMap((tasks) => {
        return this.getLabelRelations().pipe(switchMap((labelRelations) => {
          return this.getLabels().pipe(map((labels) => {
            var usefulIds: number[] = [];
            labelRelations.filter(r => r.label == Label.name).forEach(t => {usefulIds.push(t.taskID)});
            labelRelations = labelRelations.filter(r => labelRelations.some(item => usefulIds.includes(item.taskID)));
            tasks = tasks.filter(t => labelRelations.some(item => item.taskID == t.id))              
            labelRelations.forEach(relation => {
              tasks.find(task => {return task.id == relation.taskID})?.labels?.push(this.labelAdaptor(labels.find(label => {return label.label == relation.label})!))
            });
            return tasks;
          }))
        }))
      })
    )
  }

  /**
   * Replaces the task in Database with the task given with ID
   * @param task the Task object
   * @throws `HTTPErrorResponse` on any error
   */
  putTask(task: TaskData){
    return this.http.put<TaskData>(`${environment.url}Tasks/${task.id}`, {id: task.id, sprintID: task.sprintID, name: task.name, assignee: task.assignee, storyPoints: task.storyPoints,
      description: task.description, progress: task.progress, startDate: task.startDate, endDate: task.endDate, priority: task.priority, cost: task.cost, type: task.type})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
        })
      );
  }

  /**
   * Updates the label relations for a task. 
   * NOTE: doesn't handle asignee atm
   * @param oldLabel the old label relation
   * @param id the Task ID
   * @throws error if it catches HttpError
   */
  postTask(task: TaskData){
    return this.http.post<TaskData>(`${environment.url}Tasks`, {sprintID: task.sprintID, name: task.name, storyPoints: task.storyPoints,
      description: task.description, progress: task.progress, startDate: task.startDate, endDate: task.endDate, priority: task.priority, cost: task.cost, type: task.type})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
        })
      );
  }

  /**
   * Deletes a task
   * @param id the Task ID
   * @throws error if it catches HttpError
   */
  deleteTask(id: number){
    return this.http.delete<TaskData>(`${environment.url}Tasks/${id}`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * Deletes a dependency relationship for tasks
   * @param independentID ID of independent task
   * @param dependentID ID of dependent task
   * @throws error if it catches HttpError
   */
  deleteTaskRelation(independentID: number, dependentID: number){
    return this.http.delete(`${environment.url}TasksToTasks/${independentID}/${dependentID}`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * Adds a dependency relationship for tasks
   * @param independentID ID of independent task
   * @param dependentID ID of dependent task
   * @throws error if it catches HttpError
   */
  addTaskRelation(independentID: number, dependentID: number){
    return this.http.post(`${environment.url}TasksToTasks`, {independentTaskID: independentID, dependentTaskID: dependentID})
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    );
  }

  /**
   * Gets all task relationships with each other
   * @throws error if it catches HttpError
   */
  getTaskRelations(){
    return this.http.get(`${environment.url}TasksToTasks`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting taskData: ${err.error.message}`));
      })
    )
  }

}
  