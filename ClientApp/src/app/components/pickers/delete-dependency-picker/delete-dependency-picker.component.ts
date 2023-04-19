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
  ) { }

  ngOnInit() {
    this.dependencyOptions = this.data.dependencies;
  }

  showOption(option: number) {
    this.selectedDependency = option;
    this.approveChanges();
  }

  approveChanges() {
    const result = this.removeDependency(this.selectedDependency);
    if (result === 1) {
      this.messageService.add({severity: 'success', summary: `Dependency ${this.selectedDependency} was successfully removed!`});
    } else {
      this.messageService.add({severity: 'error', summary: `Dependency ${this.selectedDependency} does not exist!`});
    }
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
}
