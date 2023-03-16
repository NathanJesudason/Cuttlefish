import {
    Component,
    OnInit,
    Input,
    ViewChild,
  } from '@angular/core';
  
  import { MessageService } from 'primeng/api';
  import { OverlayPanel } from 'primeng/overlaypanel';
  
  import { TaskData } from 'src/types/task';
  
  @Component({
    selector: 'dependency-inplace',
    templateUrl: './dependency-inplace.component.html',
    styleUrls: ['./dependency-inplace.component.scss'],
    providers: [MessageService],
  })
  export class DependencyInplaceComponent implements OnInit {
    @ViewChild('overlayPanel')
    overlayPanel!: OverlayPanel;
  
    @Input() data!: TaskData;
  
    progressOptions!: string[] | undefined;
    selectedProgress!: string;
  
    constructor(
      private messageService: MessageService,
    ) { }
  
    ngOnInit() {
      this.progressOptions = this.data.dependencies;
    }
  
    showOption(option: string) {
      this.selectedProgress = option;
      this.overlayPanel.hide();
      this.approveChanges(option);
    }
  
    approveChanges(event: any) {
      this.messageService.add({severity: 'success', summary: `Progress was changed to ${this.selectedProgress}!`});
      // when the time comes, add a serverApi call here to send change to backend
    }
  
    cancelInput() {
      this.overlayPanel.hide();
      this.messageService.add({severity: 'info', summary: 'Progress update was cancelled'});
    }
  }
