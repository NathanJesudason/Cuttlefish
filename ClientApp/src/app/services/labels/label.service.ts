import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LabelData } from 'src/types/label'

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) { }

  list: LabelData[] = []

  readonly baseURL = `${environment.url}Labels/`

  getLabels(){
    return this.http.get(this.baseURL)
  }
  
  postLabel(label: LabelData){
    return this.http.post(this.baseURL, label)
  }

  putLabel(label: LabelData){
    return this.http.put(`${this.baseURL}${label.label}`, label)
  }

  deleteLabel(label: string){
    return this.http.delete(`${this.baseURL}${label}`)
  }

  refreshLabelList(){
    this.http.get(`${this.baseURL}`).toPromise().then(
      res=> this.list = res as LabelData[],
      err=> console.log("Error occured:", err.message)
    )
    return this.list
  }
}
