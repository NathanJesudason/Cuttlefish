import {
    Component,
    OnInit,
    Input,
    ViewChild,
  } from '@angular/core';
  
  import { MessageService } from 'primeng/api';
  import { Inplace } from 'primeng/inplace';
  
  import { ProjectData } from '../../types/project';
  import { TaskData } from '../../types/task';
  
  @Component({
    selector: 'description-inplace',
    templateUrl: './description-inplace.component.html',
    styleUrls: ['./description-inplace.component.scss'],
    providers: [MessageService],
  })
  export class DescriptionInplaceComponent implements OnInit {
    @Input() entityData!: TaskData | ProjectData;
    
    text!: string;
    selected!: boolean;
  
    constructor(
      private messageService: MessageService,
    ) { }
  
    @ViewChild('descriptionInplace') descriptionInplace!: Inplace;

    ngOnInit() {
      this.selected = false;
      this.text = this.entityData.description;
    }

    select() {
      this.selected = true;
    }

    unSelect() {
      this.selected = false;
    }
  
    approveChanges(event: any) {
      this.messageService.add({severity: 'success', summary: 'Description was updated'});
      this.entityData.description = this.text;
      // when the time comes, add a serverApi call here to send change to backend
      this.unSelect();
    }
  
    cancelInput(event: any) {
      this.messageService.add({severity: 'info', summary: 'Description update was cancelled'});
      this.unSelect();
    }
  }
