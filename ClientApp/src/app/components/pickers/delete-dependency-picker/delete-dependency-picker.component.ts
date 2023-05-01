import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { OverlayPanel } from 'primeng/overlaypanel';

import { TaskData } from 'src/types/task';
import { TaskApi } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'delete-dependency-picker',
  templateUrl: './delete-dependency-picker.component.html',
  styleUrls: ['./delete-dependency-picker.component.scss'],
  providers: [MessageService],
})
export class DeleteDependencyPickerComponent implements OnInit {
  @ViewChild('overlayPanel')
  overlayPanel!: OverlayPanel;

  @Input() data!: TaskData;

  dependencyOptions!: number[] | undefined;
  selectedDependency!: number;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskApi: TaskApi
  ) { }

  ngOnInit() {
    this.dependencyOptions = this.data.dependencies;
    if (!this.dependencyOptions || this.dependencyOptions.length === 0) {
      this.showNoDependenciesToast();
    }
  }

  showConfirmation(dependency: number) {
    this.selectedDependency = dependency;
    this.confirmationService.confirm({
      message: `Are you sure you want to remove dependency ${this.selectedDependency}?`,
      accept: () => {
        this.approveChanges();
      },
      reject: () => {
        this.overlayPanel.hide();
        this.messageService.add({severity: 'info', summary: 'Dependency deletion was cancelled'});
      },
    });
  }

  approveChanges() {
    this.taskApi.deleteTaskRelation(this.data.id, this.selectedDependency)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.messageService.add({severity: 'error', summary: `Failed to remove dependency ${this.selectedDependency}: ${error.message}`});
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response !== null) {
          const result = this.removeDependency(this.selectedDependency);
          if (result === 1) {
            this.messageService.add({severity: 'success', summary: `Dependency ${this.selectedDependency} was successfully removed!`});
          } else {
            this.messageService.add({severity: 'error', summary: `Dependency ${this.selectedDependency} does not exist!`});
          }
        }
      });
  }  

  removeDependency(dependency: number): number {
    const index = this.data.dependencies?.indexOf(dependency);
    if (index !== undefined && index !== -1) {
      this.data.dependencies?.splice(index, 1);
      return 1;
    }
    return -1;
  }

  cancelInput() {
    this.overlayPanel.hide();
    this.messageService.add({severity: 'info', summary: 'Dependency deletion was cancelled'});
  }

  showNoDependenciesToast() {
    this.messageService.add({severity: 'info', summary: 'No dependencies available'});
  }
}
