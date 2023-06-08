/*
* Component Folder: labels-page
* Component Name: LabelsPageComponent
* Description:
*     This page allows the user to search for tasks by label. The user
*   can select a label from the dropdown menu, and the page will display
*   all tasks that have that label. The dropdown then displays the selected
*   label and color after collapsing.
*/

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

import { TaskApi } from 'src/app/services/tasks/tasks.service';

import { LabelData } from 'src/types/label';
import { TaskData } from 'src/types/task';
import { CreateLabelModalComponent } from 'src/app/components/modals/create-label-modal/create-label-modal.component'
import { LableToTask } from 'src/types/label-to-tasks';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'labels-page',
  templateUrl: './labels-page.component.html',
  styleUrls: ['./labels-page.component.scss'],
  providers: [MessageService],
})
export class LabelsPageComponent implements OnInit {
  
  @ViewChild('createLabelModal') createLabelModal!: ElementRef<CreateLabelModalComponent>;
  
  availableLabels!: LabelData[];
  label: LabelData = { label: "", color: "#ff0000"}
  currentLabel!: LabelData | undefined;
  tasksByLabel: TaskData[] = [];
  taskPickerDisabled: boolean = false;
  
  constructor (
    private taskApi: TaskApi,
    private route: ActivatedRoute,
    private router: Router,
    public labelService: LabelService,
    private messageService: MessageService
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

  labelAdaptor(input: {label: string, color: string;}): LabelData {
    return {label: input.label, color: input.color};
  }

  getTasksByCurrentLabel() {
    if (this.currentLabel === undefined || this.currentLabel === null) return;
    // reset the array
    this.tasksByLabel = []
    this.labelService.getTasksByLabel(this.currentLabel.label).subscribe({
      next: res => {
        const labelsToTasks= res as LableToTask[]
         labelsToTasks.map(
          x => 
          this.taskApi.getTaskData(x.taskID).subscribe({
            next: res => {
              this.tasksByLabel.push(res)
            },
            error: err => {
              console.log('Error getting tasks: ',err)
            }
          })
        )
      },
      error: err => console.log('Error getting tasks by label: ',err)
    })
  }

  getAvailableLabels() {
    this.labelService.refreshLabelList()
    this.labelService.getLabels().subscribe({
      next: res=>{
          this.availableLabels = res 
          this.getCurrentLabel();
          this.getTasksByCurrentLabel();
        },
        error: err=> console.log("Error",err)
    })
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
        this.availableLabels.unshift(res) // update the dropdown
      },
      error: err=> console.log("Error",err)
    })
  }
  
  editLabel(editLabel: LabelData){
    this.label.label = this.currentLabel!.label 
    this.label.color = editLabel.color
    this.labelService.putLabel(this.label).subscribe({
      next: ()=> { 
        this.currentLabel!.color = editLabel.color
      },
      error: err => console.log("Error",err)
    })
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
      next: () =>{
        this.availableLabels.splice(this.availableLabels.indexOf(this.currentLabel!),1) // update the dropdown
        this.currentLabel = undefined
      },
      error: err => {console.log("Error",err)}}
      )

  }
  
  createLabel(createL:LabelData){
    // insert the label
    this.label = createL 
    this.insertLabel()
    this.availableLabels = this.labelService.refreshLabelList()
  }

  cancelLabelSelection(){
    this.currentLabel = undefined
  }
}
