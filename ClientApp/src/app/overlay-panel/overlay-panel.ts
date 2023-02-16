import {
    Component,
    OnInit,
    Input,
    ViewChild,
  } from '@angular/core';
  
  import { MessageService } from 'primeng/api';
  import { Inplace } from 'primeng/inplace';
  import { OverlayPanel } from 'primeng/overlaypanel';
  
  import { ProjectData } from '../../types/project';
  import { TaskData } from '../../types/task';
  import { SprintData } from '../../types/sprint';
  
  @Component({
    selector: 'overlay-panel',
    templateUrl: './overlay-panel.component.html',
    styleUrls: ['./overlay-panel.component.scss'],
    providers: [MessageService],
  })
  export class OverlayPanelComponent implements OnInit {
    @Input() entityData!: TaskData | ProjectData | SprintData;
    @Input() size!: 'large' | 'medium' | 'small';
  
    @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  
    updatedTitle!: string;
  
    constructor(
      private messageService: MessageService,
    ) { }
  
    ngOnInit() {
      this.updatedTitle = this.entityData.name;
    }
  
    approveChanges() {
      this.messageService.add({severity: 'success', summary: `Progress was changed to ${this.updatedTitle}!`});
      this.entityData.name = this.updatedTitle;
      // when the time comes, add a serverApi call here to send change to backend
      this.overlayPanel.hide();
    }
  
    cancelInput() {
      this.messageService.add({severity: 'info', summary: 'Progress update was cancelled'});
      this.updatedTitle = this.entityData.name;
      this.overlayPanel.hide();
    }
  }
  