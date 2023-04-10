import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'dependency-dropdown',
  templateUrl: './dependency-dropdown.component.html',
  styleUrls: ['./dependency-dropdown.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DependencyDropdownComponent {
  @Input() dependencies!: string[] | null;
  selectedDependency: string | null = null;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  redirectToTask(option: string): void {
    if (this.selectedDependency !== option) {
      this.selectedDependency = option;
      return;
    }

    const taskId = option;
    const taskUrl = `/task/${taskId}`;
    
    this.confirmationService.confirm({
      message: `Are you sure you want to navigate to task ${taskId}?`,
      accept: () => {
        this.router.navigateByUrl(taskUrl);
      },
      reject: () => {
        this.selectedDependency = null;
      }
    });
  }
}