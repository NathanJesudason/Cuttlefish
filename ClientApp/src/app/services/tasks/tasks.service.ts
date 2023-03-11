import {
    Injectable,
    Inject
  } from '@angular/core';
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
  import { LabelData, LabelNotFoundError } from 'src/types/label';
  import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
  
  @Injectable({providedIn: 'root'})
  export class TaskApi {
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
        return this.http.get<string[]>(`${environment.url}LabelsToTasks/${id}/labels`, {	
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

    getAllTasksWithProgress(progress: string): Observable<TaskData[]> {
        return this.http.get<TaskData[]>(`${environment.url}Tasks/progress/${progress}`, {	
            observe: 'body',
            responseType: 'json'
        });
    }

    putTask(task: TaskData){
        return this.http.put<TaskData>(`${environment.url}Tasks/${task.id}`, {id: task.id, sprintID: task.sprintID, name: task.name, assignee: task.assignee, storyPoints: task.storyPoints,
        description: task.description, progress: task.progress, startDate: task.startDate, endDate: task.endDate, priority: task.priority, cost: task.cost});
    }

    //TODO: Currently not connected with API for team members, so don't post with assignee because it's likely invalid.
    postTask(task: TaskData){
        return this.http.post<TaskData>(`${environment.url}Tasks`, {sprintID: task.sprintID, name: task.name, storyPoints: task.storyPoints,
            description: task.description, progress: task.progress, startDate: task.startDate, endDate: task.endDate, priority: task.priority, cost: task.cost, type: task.type});
    }

    deleteTask(id: number){
        return this.http.delete<TaskData>(`${environment.url}Tasks/${id}`);
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
  