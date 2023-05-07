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
import { Dropdown } from 'primeng/dropdown';

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

  @ViewChild('dropdown')
  dropdown!: Dropdown;

  @Input() data!: TaskData;

  dependencyOptions: { label: string, value: number }[] = [];
  selectedDependency!: number;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskApi: TaskApi
  ) { }

  ngOnInit() {
    if (this.data.dependencies) {
      this.dependencyOptions = this.data.dependencies.map((dependency: number) => {
        return { label: `Task ${dependency}`, value: dependency };
      });
    } else {
      this.showNoDependenciesToast();
    }
  }

  showConfirmation(selectedDependencyValue: number): void {
    if (!selectedDependencyValue) {
      this.messageService.add({severity: 'error', summary: 'Please select a dependency!'});
      return;
    }

    const selectedDependency = this.dependencyOptions.find(option => option.value === selectedDependencyValue);
    
    if (selectedDependency) {
      this.confirmationService.confirm({
        message: `Are you sure you want to remove dependency ${selectedDependency.value}?`,
        accept: () => {
          this.approveChanges(selectedDependency.value);
        },
        reject: () => {
          this.overlayPanel.hide();
          this.messageService.add({severity: 'info', summary: 'Dependency deletion was cancelled'});
        },
      });
    }
  }

  approveChanges(dependencyValue: number) {
    this.taskApi.deleteTaskRelation(this.data.id, dependencyValue)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.messageService.add({severity: 'error', summary: `Failed to remove dependency ${dependencyValue}: ${error.message}`});
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response !== null) {
          const result = this.removeDependency(dependencyValue);
          if (result === 1) {
            this.overlayPanel.hide();
            this.messageService.add({severity: 'success', summary: `Dependency ${dependencyValue} was successfully removed!`});
          } else {
            this.overlayPanel.hide();
            this.messageService.add({severity: 'error', summary: `Dependency ${dependencyValue} does not exist!`});
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
