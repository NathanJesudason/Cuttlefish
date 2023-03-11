import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { ServerApi } from 'src/app/services/server-api/server-api.service';
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
    const queryParamLabel = this.route.snapshot.queryParamMap.get('name');
    if (queryParamLabel === null) return;
    for (const label of this.availableLabels) {
      if (label.name === queryParamLabel) {
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
    this.taskApi.getAllTasks().subscribe({
      next: tasks => {
        this.taskApi.getLabelRelations().subscribe({
          next: labelRelations => {
            this.taskApi.getLabels().subscribe({
              next: labels => {
                console.log("tasks: ", tasks, "labelRelations: ", labelRelations, "labels: ", labels);

                var usefulIds: number[] = [];

                labelRelations.filter(r => r.label == this.currentLabel.name).forEach(t => {usefulIds.push(t.taskID)});

                console.log("IDS: ", usefulIds);
                //Grabs all relations with the current label, and then filters all relations if the taskID is in the list of tasks with the current label.
                labelRelations = labelRelations.filter(r => labelRelations.some(item => usefulIds.includes(item.taskID)));

                console.log(labelRelations);
                //filters to only tasks with this filter
                tasks = tasks.filter(t => labelRelations.some(item => item.taskID == t.id));

                labelRelations.forEach(relation => {
                  tasks.find(task => {return task.id == relation.taskID})?.labels?.push(this.labelAdaptor(labels.find(label => {return label.label == relation.label})!))
                });
                this.tasksByLabel = tasks;
              }
            });
          }
        });
      }
    });
  }

  getAvailableLabels() {
    this.taskApi.getLabels().subscribe({
      next: values => {
        console.log(values);
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
