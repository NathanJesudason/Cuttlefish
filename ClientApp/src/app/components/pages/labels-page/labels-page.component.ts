import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { TaskApi } from 'src/app/services/tasks/tasks.service';

import { LabelData } from 'src/types/label';
import { TaskData } from 'src/types/task';

@Component({
  selector: 'labels-page',
  templateUrl: './labels-page.component.html',
  styleUrls: ['./labels-page.component.scss'],
})
export class LabelsPageComponent implements OnInit {
  availableLabels!: LabelData[];

  currentLabel!: LabelData;
  tasksByLabel: TaskData[] = [];
  queryParamLabel!: string | null;

  taskPickerDisabled: boolean = false;
  
  constructor (
    private taskApi: TaskApi,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAvailableLabels();
  }

  getCurrentLabel() {
    this.queryParamLabel = this.route.snapshot.queryParamMap.get('name');
    if (this.queryParamLabel === null) return;
    for (const label of this.availableLabels) {
      if (label.name === this.queryParamLabel) {
        this.currentLabel = label;
        this.getTasksByCurrentLabel();
        return;
      }
    }
  }

  labelAdaptor(input: {label: string, color: string;}): LabelData {
    return {name: input.label, color: input.color};
  }

  getTasksByCurrentLabel() {
    if (this.currentLabel === undefined || this.currentLabel === null) return;
    console.log(this.currentLabel);
    //Get all tasks, get all labelrelations with currentLabel, filter
    this.taskApi.getAllTasksWithLabel(this.currentLabel).subscribe({
      next: tasks => {
        this.tasksByLabel = tasks;
      }
    });
  }

  getAvailableLabels() {
    this.taskApi.getLabels().subscribe({
      next: values => {
        var labels: LabelData[] = [];
        values.forEach(value => labels.push(this.labelAdaptor(value)));
        this.availableLabels = labels;
        this.getCurrentLabel();
      }
    });
  }

  updateSelectedLabel(event: { value: LabelData }) {
    this.taskPickerDisabled = true;
    if (event.value === null) {
      this.router.navigate(['/label'])
        .then(() => {
          this.tasksByLabel = [];
          this.taskPickerDisabled = false;
        });
      return;
    }
    this.router.navigate(['/label'], { queryParams: { name: event.value.name } })
      .then(() => {
        this.getTasksByCurrentLabel();
        this.taskPickerDisabled = false;
      });
  }
}
