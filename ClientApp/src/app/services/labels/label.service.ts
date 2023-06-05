import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LabelData } from 'src/types/label'

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) { }

  list: LabelData[] = []
  readonly baseURL = `${environment.url}Labels/`

  getLabels(): Observable<LabelData[]>{
    return this.http.get(this.baseURL).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error getting labels: ${err.error.message}`));
      }),
      map(
        (data:any) => {return data}
      )
    )
  }
  
  postLabel(label: LabelData): Observable<LabelData>{
    return this.http.post(this.baseURL, label).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error creating label: ${err.error.message}`));
      }),
      map(
        (data:any) => {return data}
      )
    )
  }

  putLabel(label: LabelData): Observable<LabelData>{
    return this.http.put(`${this.baseURL}${label.label}`, label).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(`Error editing label: ${err.error.message}`));
      }),
      map(
        (data:any) => {return data}
      )
    )
  }

  deleteLabel(label: string){
    return this.http.delete(`${this.baseURL}${label}`)
  }

  getTasksByLabel(label: string){
    return this.http.get(`${environment.url}LabelsToTasks/${label}/tasks`)
  }

  refreshLabelList(){
    this.http.get(`${this.baseURL}`).toPromise().then(
      res=> this.list = res as LabelData[],
      err=> console.log("Error occured:", err.message)
    )
    return this.list
  }
}
