import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { TaskData } from 'src/types/task';
import { ApiService } from 'src/app/services/api.service';

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
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.dependencyOptions = this.data.dependencies;
  }

  showOption(option: number) {
    this.selectedDependency = option;
    this.approveChanges();
  }

  approveChanges() {
    this.http.delete('/api/tasks/' + this.data.id + '/dependencies/' + this.selectedDependency)
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

  deleteTaskRelation(taskId: number, dependencyId: number): Observable<any> {
    const url = `api/tasks/${taskId}/dependencies/${dependencyId}`;
    return this.http.delete(url);
  }

  cancelInput() {
    this.overlayPanel.hide();
    this.messageService.add({severity: 'info', summary: 'Dependency deletion was cancelled'});
  }
}
