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

@Component({
  selector: 'labels-page',
  templateUrl: './labels-page.component.html',
  styleUrls: ['./labels-page.component.css'],
})
export class LabelsPageComponent implements OnInit {
  projectId!: number;

  availableLabels!: LabelData[];

  currentLabel!: LabelData;
  
  constructor (
    private serverApi: ServerApi,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProjectId();
    this.getAvailableLabels();
    this.getCurrentLabel();
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

  getAvailableLabels() {
    this.availableLabels = this.serverApi.getAllLabels();
  }

  updateSelectedLabel(event: { value: LabelData }) {
    this.router.navigate(['/project', this.projectId, 'labels'], { queryParams: { name: event.value.name } });
  }

  clearSelectedLabel(_event: { value: LabelData }) {
    this.router.navigate(['/project', this.projectId, 'labels']);
  }
}
