import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { ServerApi } from '../server-api/server-api.service';

import { LabelData } from '../../types/label';
import { TaskData } from '../../types/task';

@Component({
  selector: 'labels-page',
  templateUrl: './labels-page.component.html',
  styleUrls: ['./labels-page.component.scss'],
})
export class LabelsPageComponent implements OnInit {
  projectId!: number;

  availableLabels!: LabelData[];

  currentLabel!: LabelData;
  tasksByLabel: TaskData[] = [];

  taskPickerDisabled: boolean = false;
  
  constructor (
    private serverApi: ServerApi,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProjectId();
    this.getAvailableLabels();
    this.getCurrentLabel();
    this.getTasksByCurrentLabel();
  }

  getProjectId() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id')!);
  }

  getCurrentLabel() {
    const queryParamLabel = this.route.snapshot.queryParamMap.get('name');
    if (queryParamLabel === null) return;
    for (const label of this.availableLabels) {
      if (label.name === queryParamLabel) {
        this.currentLabel = label;
        return;
      }
    }
  }

  getTasksByCurrentLabel() {
    if (this.currentLabel === undefined || this.currentLabel === null) return;
    this.tasksByLabel = this.serverApi.getTasksByLabel(this.currentLabel.name);
  }

  getAvailableLabels() {
    this.availableLabels = this.serverApi.getAllLabels();
  }

  updateSelectedLabel(event: { value: LabelData }) {
    this.taskPickerDisabled = true;
    if (event.value === null) {
      this.router.navigate(['/project', this.projectId, 'labels'])
        .then(() => {
          this.tasksByLabel = [];
          this.taskPickerDisabled = false;
        });
      return;
    }
    this.router.navigate(['/project', this.projectId, 'labels'], { queryParams: { name: event.value.name } })
      .then(() => {
        this.getTasksByCurrentLabel();
        this.taskPickerDisabled = false;
      });
  }
}
