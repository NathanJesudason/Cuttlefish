import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LabelService } from 'src/app/services/labels/label.service';
import { LabelData } from 'src/types/label';

@Component({
  selector: 'create-label-modal',
  templateUrl: './create-label-modal.component.html',
  styleUrls: ['./create-label-modal.component.css'],
  providers: [MessageService],
})
export class CreateLabelModalComponent implements OnInit {

  @Input() labels!: LabelData[]
  @Output() createLabel = new EventEmitter<LabelData>();
  @Output() editLabel = new EventEmitter<LabelData>();
  @Output() delete = new EventEmitter()
  
  labelCreated!: LabelData
  createLabelModalShown: boolean = false;
  editLabelModalShown: boolean = false;
  label!: string
  color: string = "#ff0000"
  title: string = "Create"

  constructor(private messageService: MessageService, private labelService: LabelService) { }

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
      if(!this.labelCreated.label){ 
        this.messageService.add({severity: 'error', summary: 'label cannot be empty'});
      } 
      else{
        // get list of all labels
        this.labelService.getLabels().subscribe({
          next: res=>{
            // search through list, if label does not exist then emit (create new label)
            const availableLabels = res 
            // see if there exists that same label in the DB
            const result = availableLabels.find( l => { return l.label === this.labelCreated.label})
            if(!result){
              this.createLabel.emit(this.labelCreated)
              this.messageService.add({severity: 'success', summary: 'Label Created'});
              this.hideCreateLabelModal()
            } else{
              this.messageService.add({severity: 'error', summary: 'label exists'});
            }
          },
          error: err=> console.log("Error",err)
        })
      }
    }
    else{
      this.editLabel.emit(this.labelCreated)
      this.messageService.add({severity: 'success', summary: 'Label Color Edited'});
      this.hideCreateLabelModal()
    }
  }

  deleteLabel(){
    this.labelCreated = this.collectInputs() 
    this.delete.emit()
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
