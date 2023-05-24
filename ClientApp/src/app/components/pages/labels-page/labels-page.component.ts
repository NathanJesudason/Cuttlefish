import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { LabelService } from 'src/app/services/labels/label.service';

import { ServerApi } from 'src/app/services/server-api/server-api.service';

import { LabelData } from 'src/types/label';
import { TaskData } from 'src/types/task';
import { CreateLabelModalComponent } from 'src/app/components/modals/create-label-modal/create-label-modal.component'

@Component({
  selector: 'labels-page',
  templateUrl: './labels-page.component.html',
  styleUrls: ['./labels-page.component.scss'],
})
export class LabelsPageComponent implements OnInit {
  
  @ViewChild('createLabelModal') createLabelModal!: ElementRef<CreateLabelModalComponent>;
  
  availableLabels!: LabelData[];
  label: LabelData = { label: "", color: "#ff0000"}
  currentLabel!: LabelData | null;
  tasksByLabel: TaskData[] = [];
  taskPickerDisabled: boolean = false;
  
  constructor (
    private serverApi: ServerApi,
    private route: ActivatedRoute,
    private router: Router,
    public labelService: LabelService
  ) { }

  ngOnInit(): void {
    this.getAvailableLabels();
  }

  getCurrentLabel() {
    const queryParamLabel = this.route.snapshot.queryParamMap.get('label');
    if (queryParamLabel === null) return;
    for (const label of this.availableLabels) {
      if (label.label === queryParamLabel) {
        this.currentLabel = label
        return;
      }
    }
  }

  getTasksByCurrentLabel() {
    if (this.currentLabel === undefined || this.currentLabel === null) return;
    this.tasksByLabel = this.serverApi.getTasksByLabel(this.currentLabel.label);
  }

  getAvailableLabels() {
    this.labelService.refreshLabelList()
    this.labelService.getLabels().subscribe({
      next: res=>{
          this.availableLabels = res 
          this.getCurrentLabel();
          this.getTasksByCurrentLabel();
        },
        error: err=> {console.log("Error",err)}
      }
    )
  }

  updateSelectedLabel(event: { value: LabelData }) {
    this.taskPickerDisabled = true;
    if (event.value === null) {
      this.router.navigate(['/label'])
        .then(() => {
          this.tasksByLabel = [];
          this.taskPickerDisabled = false;
        });
      return;
    }
    this.router.navigate(['/label'], { queryParams: { label: event.value.label } })
      .then(() => {
        this.getTasksByCurrentLabel();
        this.taskPickerDisabled = false;
      });
  }

  insertLabel(){
    this.labelService.postLabel(this.label)
    .subscribe({
      next: res =>{
        console.log("label:",res)
        this.availableLabels.unshift(res) // update the dropdown
      },
      error: err=> {console.log("Error",err)}
    }
      
    )
  }
  
  editLabel(editLabel: LabelData){
    this.label.label = this.currentLabel!.label 
    this.label.color = editLabel.color
    this.labelService.putLabel(this.label).subscribe({
      next: ()=> { 
        this.currentLabel!.color = editLabel.color
      },
      error: err => {console.log("Error",err)}}
      )
  }


  showCreateLabelModal() {
    (this.createLabelModal as any).showCreateLabelModal("Create");
  }

  showEditLabelModal() {
    (this.createLabelModal as any).showCreateLabelModal("Edit");
  }

  deleteLabel(){
    this.label = this.currentLabel!
    this.labelService.deleteLabel(this.label.label).subscribe({
      next: res=>{
        console.log("res",res)
        this.availableLabels.splice(this.availableLabels.indexOf(this.currentLabel!),1) // update the dropdown
        this.currentLabel = null
      },
      error: err => {console.log("Error",err)}}
      )

  }
  
  createLabel(createL:LabelData){
    // check if label exists
    if(createL.label == ""){ 
      console.log("Must include label") 
      return -2;
    }
    
    else{
      // see if there exists that same label in the DB
      if(this.availableLabels.find( l => { return l.label === createL.label})){
        console.log("label exists!", this.availableLabels, createL.label)
        return -1;
      }
      else{
        // if doesn't exist, insert the label
        this.label = createL 
        this.insertLabel()
        this.availableLabels = this.labelService.refreshLabelList()
        return 0;
      }
    }
  }

  cancelLabelSelection(){
    this.currentLabel = null
  }


}
