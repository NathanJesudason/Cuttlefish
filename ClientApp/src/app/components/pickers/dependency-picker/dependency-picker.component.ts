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
    selector: 'dependency-picker',
    templateUrl: './dependency-picker.component.html',
    styleUrls: ['./dependency-picker.component.scss'],
    providers: [MessageService],
  })
  export class DependencyPickerComponent implements OnInit {
    @ViewChild('overlayPanel')
    overlayPanel!: OverlayPanel;
  
    @Input() data!: TaskData;
  
    dependencyOptions!: number[] | undefined;
    selectedDependency!: number;
  
    constructor(
      private messageService: MessageService,
    ) { }
  
    ngOnInit() {
      this.dependencyOptions = this.data.dependencies;
    }
  
    showOption(option: number) {
      this.selectedDependency = option;
      this.approveChanges(option);
    }
  
    addDependency(dependencyId: number): number {
      if (!this.data.dependencies) {
        this.data.dependencies = [];
      }
    
      if (this.data.dependencies.includes(dependencyId)) {
        return -1; // dependency already exists

        /*
        Eventually, we'll want to check if the given dependency
        exists somewhere in the database. This component should
        not have the power to create new tasks, so if it attempts
        to add a dependency that doesn't exist within ProjectData,
        then this should return -1 and addDependency should not
        succeed.
        */
      }
    
      this.data.dependencies.push(dependencyId);
      return 1; // successful
    }

    approveChanges(event: any) {
      const result = this.addDependency(123); // replace with actual dependency id from HTML
      if (result === -1) {
        this.messageService.add({severity: 'error', summary: 'Dependency already exists!'});
      } else {
        this.overlayPanel.hide();
        this.messageService.add({severity: 'success', summary: `Dependency added successfully!`});
      }
    }
  
    cancelInput() {
      this.overlayPanel.hide();
      this.messageService.add({severity: 'info', summary: 'Dependency addition was cancelled'});
    }
  }
