import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { Inplace } from 'primeng/inplace';

import { ProjectData } from 'src/types/project';
import { TaskData } from 'src/types/task';
import { SprintData } from 'src/types/sprint';

@Component({
  selector: 'title-inplace',
  templateUrl: './title-inplace.component.html',
  styleUrls: ['./title-inplace.component.scss'],
  providers: [MessageService],
})
export class TitleInplaceComponent implements OnInit {
  @Input() entityData!: TaskData | ProjectData | SprintData;
  @Input() size!: 'large' | 'medium' | 'small';

  @ViewChild('titleInplace') titleInplace!: Inplace;

  updatedTitle!: string;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.updatedTitle = this.entityData.name;
  }

  approveChanges() {
    this.messageService.add({severity: 'success', summary: `Title was changed to ${this.updatedTitle}!`});
    this.entityData.name = this.updatedTitle;
    // when the time comes, add a serverApi call here to send change to backend
    this.titleInplace.deactivate();
  }

  cancelInput() {
    this.messageService.add({severity: 'info', summary: 'Title update was cancelled'});
    this.updatedTitle = this.entityData.name;
    this.titleInplace.deactivate();
  }
}
