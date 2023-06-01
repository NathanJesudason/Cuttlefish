import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LabelData } from 'src/types/label';
import { LabelsPageComponent } from 'src/app/components/pages/labels-page/labels-page.component';

@Component({
  selector: 'create-label-modal',
  templateUrl: './create-label-modal.component.html',
  styleUrls: ['./create-label-modal.component.css'],
  providers: [MessageService],
})
export class CreateLabelModalComponent implements OnInit {

  @Input() labels!: LabelData[]
  
  labelCreated!: LabelData
  createLabelModalShown: boolean = false;
  editLabelModalShown: boolean = false;
  label!: string
  color: string = "#ff0000"
  title: string = "Create"

  constructor(private labelsComponent: LabelsPageComponent, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  showCreateLabelModal(title: string) {
    this.title = title
    this.createLabelModalShown = true;
  }

  changeTitle(){
    this.title = "Edit"
  }


  hideCreateLabelModal() {
    this.createLabelModalShown = false;
    this.clearInputs();
  }

  acceptModalInput() {
    // call to serverapi with the collected input* values
    
    this.labelCreated = this.collectInputs()
    if (this.title === "Create"){
      var res = this.labelsComponent.createLabel(this.labelCreated)
      if (res === -1){
        this.messageService.add({severity: 'error', summary: 'label exists'});
      }
      else if( res === -2 ){
        this.messageService.add({severity: 'error', summary: 'label cannot be empty'});
      }
      else if (res === 0 ){
        this.messageService.add({severity: 'success', summary: 'Label Created'});
        this.hideCreateLabelModal()
      }
    }
    else{
      this.labelsComponent.editLabel(this.labelCreated)
      this.messageService.add({severity: 'success', summary: 'Label Color Edited'});
      this.hideCreateLabelModal()
    }
      
  }

  deleteLabel(){
    this.labelCreated = this.collectInputs() 
    this.labelsComponent.deleteLabel()
    this.messageService.add({severity: 'success', summary: 'Label Deleted'});
    this.hideCreateLabelModal()
  }

  cancelModalInput() {
    this.messageService.add({severity: 'info', summary: 'Create label input cancelled'});
    this.hideCreateLabelModal();
  }

  collectInputs(){
    return{
      label: this.label,
      color: this.color
    }
  }

  clearInputs() {
    this.label = '';
    this.color = '#ff0000';
  }
}
