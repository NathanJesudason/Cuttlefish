import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectData } from 'src/types/project';

@Component({
  selector: 'color-inplace',
  templateUrl: './color-inplace.component.html',
  styleUrls: ['./color-inplace.component.scss'],
  providers: [MessageService],
})
export class ColorInplaceComponent implements OnInit {
  @Input() projectData!: ProjectData;
  
  color!: string;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.color = this.projectData.color;
  }

  onColorSelect(event: any) {
    if (this.color !== this.projectData.color) {
      const updatedProject = {...this.projectData, color: this.color};
      this.projectService.updateProject(this.projectData.id, updatedProject).subscribe({
        next: () => {
          this.projectData.color = this.color;
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: `Error updating color: ${err.message}`});
        },
      });
    }
  }
}
