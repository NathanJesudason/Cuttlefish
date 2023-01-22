import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { MessageService } from 'primeng/api';
import { Inplace } from 'primeng/inplace';

import { ProjectData } from '../../types/project';
import { TaskData } from '../../types/task';
import { SprintData } from '../../types/sprint';

@Component({
  selector: 'date-inplace',
  templateUrl: './date-inplace.component.html',
  styleUrls: ['./date-inplace.component.scss'],
  providers: [MessageService],
})
export class DateInplaceComponent implements OnInit {
  @Input() entityData!: TaskData | ProjectData | SprintData;
  @Input() whichDate!: 'start' | 'end';
  @Input() disabled!: boolean;

  // @ViewChild('dateInplace') dateInplace!: Inplace;

  selectedDate!: Date | undefined;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.selectedDate = (this.whichDate === 'start') ? this.entityData.startDate : this.entityData.endDate;
  }

  approveChanges(event: any) {
    this.messageService.add({severity: 'success', summary: `Date was changed to ${this.selectedDate}!`});
    if (this.whichDate === 'start') {
      this.entityData.startDate = this.selectedDate;
    } else {
      this.entityData.endDate = this.selectedDate;
    }
    // when the time comes, add a serverApi call here to send change to backend
  }

  cancelInput(event: any) {
    this.messageService.add({severity: 'info', summary: 'Date update was cancelled'});
  }
}
