import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LabelData } from 'src/types/label'

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) { }

  label: LabelData = { label: "", color: "#ff0000"}
  list: LabelData[] = []

  readonly baseURL = `${environment.url}Labels/`

  getLabels(){
    return this.http.get(this.baseURL)
  }
  
  postLabel(){
    return this.http.post(this.baseURL, this.label)
  }

  putLabel(){
    return this.http.put(`${this.baseURL}${this.label.label}`, this.label)
  }

  deleteLabel(){
    return this.http.delete(`${this.baseURL}${this.label.label}`)
  }

  refreshLabelList(){
    this.http.get(`${this.baseURL}`).toPromise().then(
      res=> this.list = res as LabelData[],
      (err)=> {
        console.log("Error occured:", err.message)
      }
    )
    return this.list
  }
}
