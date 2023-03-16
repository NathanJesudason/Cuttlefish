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
    ProjectData,
    ProjectNotFoundError
  } from 'src/types/project';

  import {
    catchError,
    map,
    Observable,
    of,
    switchMap,
    throwError
  } from 'rxjs';
  
  import { LabelData, LabelNotFoundError } from 'src/types/label';
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
     * 
     * @param id the id of the requested task
     * @returns `TaskData`
     * @throws `TaskNotFoundError` on invalid id
     */
    getTaskData(id: number): Observable<TaskData> {


    return this.http.get<TaskData>(`${environment.url}Tasks/${id}`, {	
            observe: 'body',
            responseType: 'json'
	});
    }


    //Get all tasks
    getAllTasks(): Observable<TaskData[]> {
        return this.http.get<TaskData[]>(`${environment.url}Tasks`, {	
                observe: 'body',
                responseType: 'json'
        });
    }

    getLabelRelations() {
        return this.http.get<any[]>(`${environment.url}LabelsToTasks`, {	
            observe: 'body',
            responseType: 'json'
        });
    }

    getLabelRelationsByID(id: number) {
        return this.http.get<{id: number, label:string, taskID:number;}[]>(`${environment.url}LabelsToTasks/${id}/labels`, {	
            observe: 'body',
            responseType: 'json'
        });
    }

    // Might be temporary depending on how services are structured
    getLabel(id: string){
        return this.http.get<{label:string, color:string;}>(`${environment.url}labels/${id}`, {	
            observe: 'body',
            responseType: 'json'
        });
    }

    // Might be temporary depending on how services are structured
    getLabels(){
        return this.http.get<{label:string, color:string;}[]>(`${environment.url}labels`, {	
            observe: 'body',
            responseType: 'json'
        });
    }

       /**
     * Updates the label relations for a task. 
     * @param oldLabel the old label relation
     * @param id the Task ID
     */
    deleteLabelRelations(oldLabel: LabelData, id: number){
        return this.http.delete(`${environment.url}LabelsToTasks/${oldLabel.name}/${id}`)
   }

   AddLabelRelation(newLabel: LabelData, id: number){
        return this.http.post(`${environment.url}LabelsToTasks/`, {taskID: id, label: newLabel.name})
   }

    getAllTasksWithProgress(progress: string): Observable<TaskData[]> {
        return this.http.get<TaskData[]>(`${environment.url}Tasks/progress/${progress}`, {	
            observe: 'body',
            responseType: 'json'
        });
    }

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
                                  console.log("list of label IDs: ", listofIds)
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

    labelAdaptor(input: {label: string, color: string;}): LabelData {
        return {name: input.label, color: input.color};
      }

    //TODO
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

    putTask(task: TaskData){
        return this.http.put<TaskData>(`${environment.url}Tasks/${task.id}`, {id: task.id, sprintID: task.sprintID, name: task.name, assignee: task.assignee, storyPoints: task.storyPoints,
        description: task.description, progress: task.progress, startDate: task.startDate, endDate: task.endDate, priority: task.priority, cost: task.cost, type: task.type});
    }

    //TODO: Currently not connected with API for team members, so don't post with assignee because it's likely invalid.
    postTask(task: TaskData){
        return this.http.post<TaskData>(`${environment.url}Tasks`, {sprintID: task.sprintID, name: task.name, storyPoints: task.storyPoints,
            description: task.description, progress: task.progress, startDate: task.startDate, endDate: task.endDate, priority: task.priority, cost: task.cost, type: task.type});
    }

    deleteTask(id: number){
        return this.http.delete<TaskData>(`${environment.url}Tasks/${id}`);
    }

    // DELETE: api/TasksToTasks/inID/depID
    deleteTaskRelation(independentID: number, dependentID: number){
        return this.http.delete(`${environment.url}TasksToTasks/${independentID}/${dependentID}`);
    }

    addTaskRelation(independentID: number, dependentID: number){
        return this.http.post(`${environment.url}TasksToTasks`, {independentTaskID: independentID, dependentTaskID: dependentID});
    }

    getTaskRelations(){
        return this.http.get(`${environment.url}TasksToTasks`)
    }

  
  
    /**
     * 
     * @param id the id of the requested task
     * @returns `TaskData`
     * @throws `TaskNotFoundError` on invalid id
     *
    async getFullTaskData(id: number): Promise<TaskData> {

        return new Promise(resolve => {
            let task: TaskData;
            this.http.get<TaskData>(`${environment.url}Tasks/${id}`, {	
                observe: 'body',
                responseType: 'json'
            }).subscribe(res => {
                task = res;
    
                let labelIDs: LabelData[] = [];
                this.http.get<any[]>(`${environment.url}${id}/labels`, {	
                        observe: 'body',
                        responseType: 'json'
                }).subscribe(res => {
                    
                    for(let i of res){
                        this.http.get<LabelData>(`${environment.url}Labels/${i}`, {
                            observe: 'body',
                            responseType: 'json'
                        }).subscribe(res => {
                            labelIDs.push(res);
                        });
                    }
                    task.labels = labelIDs;
                    resolve(task);
                });
            });

        })
    }
  
    
  
    getTasksByLabel(name: string): Promise<TaskData[]> {

        return new Promise(resolve => {
            let taskArray: TaskData[];
            let taskIDs: number[];
            this.http.get<any[]>(`${environment.url}${name}/tasks`, {	
                observe: 'body',
                responseType: 'json'
            }).subscribe(res => {

                //get taskData from every label
                for (let i of res){
                    this.getTaskData(i["taskID"]).subscribe(

                    );
                    this.http.get<TaskData>(`${environment.url}Labels/${i}`, {
                        observe: 'body',
                        responseType: 'json'
                    }).subscribe(res => {
                        labelIDs.push(res);
                    });
                }

                }
    
                let labelIDs: LabelData[] = [];
                this.http.get<any[]>(`${environment.url}${id}/labels`, {	
                        observe: 'body',
                        responseType: 'json'
                }).subscribe(res => {
                    
                    for(let i of res){
                        this.http.get<LabelData>(`${environment.url}Labels/${i}`, {
                            observe: 'body',
                            responseType: 'json'
                        }).subscribe(res => {
                            labelIDs.push(res);
                        });
                    }
                    task.labels = labelIDs;
                    resolve(task);
                });
            });

        })
    }*/
  
  }
  