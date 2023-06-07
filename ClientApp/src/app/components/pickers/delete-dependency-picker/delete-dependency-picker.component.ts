/*
* Component Folder: delete-dependency-picker
* Component Name: DeleteDependencyPickerComponent
* Description:
*     This component, used on the task page, allows the user to delete
*   a dependency from the task. It uses the TaskApi service to delete
*   the dependency from the backend.
*/

import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
// import { ConfirmationService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

  dependencyOptions: { label: string, value: number }[] = [];
  selectedDependency!: number;
  currentTaskId!: number;

  constructor(
    private messageService: MessageService,
    private taskApi: TaskApi,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadAndSortDependencies();
  }

  /**
   * Loads the dependencies for the current task and sorts them
   */
  loadAndSortDependencies(): void {
    this.route.params.subscribe(params => {
      this.currentTaskId = +params['id'];

      this.taskApi.getTaskRelations().subscribe({
        next: (relations) => {
          const filtered = relations.filter(r => r.dependentTaskID === this.currentTaskId);
          this.dependencyOptions = filtered.map(({id, independentTaskID, dependentTaskID}) => ({ label: `Task ${independentTaskID}`, value: independentTaskID }));
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }

  /**
   * Shows the confirmation dialog for deleting the selected dependency
   * TODO: Actually pull up confimation dialog
   * @param selectedDependencyValue the value of the dependency to be deleted
   */
  showConfirmation(selectedDependencyValue: number): void {
    if (!selectedDependencyValue) {
      this.messageService.add({severity: 'error', summary: 'Please select a dependency!'});
      return;
    }

    const selectedDependency = this.dependencyOptions.find(option => option.value === selectedDependencyValue);
    
    // Removed confirmation service related lines
    if (selectedDependency) {
      console.log('Accepted deletion for: ', selectedDependency.label);  // Debug line
      this.approveChanges(selectedDependency.value);
    } else {
      console.log('selectedDependency not found in dependencyOptions');  // Debug line
    }
  }

  /**
   * Deletes the dependency from this task in the backend
   * @param dependencyValue the value of the dependency to be deleted
   */
  approveChanges(dependencyValue: number) {
    console.log('approveChanges called with value: ', dependencyValue);
    this.taskApi.deleteTaskRelation(this.currentTaskId, dependencyValue)
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

  /**
   * Removes the dependency from the task in the frontend
   * @param dependency the dependency to be removed
   * @returns 1 if the dependency was removed, -1 if the dependency does not exist
   */
  removeDependency(dependency: number): number {
    const index = this.dependencyOptions.findIndex(option => option.value === dependency);
    if (index !== -1) {
      this.dependencyOptions.splice(index, 1);
      return 1;
    }
    return -1;
  }

  /**
   * Hides the overlay panel
   */
  cancelInput() {
    this.overlayPanel.hide();
  }

  /**
   * Display message that there are no dependencies available
   */
  showNoDependenciesToast() {
    this.messageService.add({severity: 'info', summary: 'No dependencies available'});
  }
}
