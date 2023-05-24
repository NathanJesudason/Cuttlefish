/**
 * Test file for SprintOrderingService
 */

import { HttpClient } from '@angular/common/http';

import {
  firstValueFrom,
  of
} from 'rxjs';

import { SprintOrderingService } from './sprint-ordering.service';
import { environment } from 'src/environments/environment';

describe('SprintOrderingService', () => {
  let sprintOrderingServiceHttpSpy: jasmine.SpyObj<HttpClient>;
  let sprintOrderingService: SprintOrderingService;
  const baseUrl = environment.url;

  beforeEach(() => {
    sprintOrderingServiceHttpSpy = jasmine.createSpyObj('HttpClient', ['patch']);
    sprintOrderingService = new SprintOrderingService(sprintOrderingServiceHttpSpy);
  });

  it('should be created', () => {
    expect(sprintOrderingService).toBeTruthy();
  });

  it('should swap reorder tasks in a sprint', async () => {
    sprintOrderingServiceHttpSpy.patch.and.returnValue(of());

    await firstValueFrom(sprintOrderingService.swapReorderTasksInSprint(1, 1, 1), { defaultValue: null });
    expect(sprintOrderingServiceHttpSpy.patch).toHaveBeenCalledWith(`${baseUrl}Sprints/1/swap-reorder`, { taskId: 1, newOrder: 1 });
  });

  it('should remove reorder tasks in a sprint', async () => {
    sprintOrderingServiceHttpSpy.patch.and.returnValue(of());

    await firstValueFrom(sprintOrderingService.removeReorderTasksInSprint(1, 1), { defaultValue: null });
    expect(sprintOrderingServiceHttpSpy.patch).toHaveBeenCalledWith(`${baseUrl}Sprints/1/remove-reorder`, { oldOrder: 1 });
  });

  it('should add reorder tasks in a sprint', async () => {
    sprintOrderingServiceHttpSpy.patch.and.returnValue(of());

    await firstValueFrom(sprintOrderingService.addReorderTasksInSprint(1, 1), { defaultValue: null });
    expect(sprintOrderingServiceHttpSpy.patch).toHaveBeenCalledWith(`${baseUrl}Sprints/1/add-reorder`, { newOrder: 1 });
  });
});
