import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';
import {
  MockBuilder,
  MockInstance,
  MockRender,
  ngMocks
} from 'ng-mocks';

import {
  NotFoundPageComponent,
  NotFoundReason
} from './not-found-page.component';

import { AppModule } from 'src/app/app.module';
import { Location } from '@angular/common';

describe('NotFoundPageComponent', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(NotFoundPageComponent, [AppModule, RouterModule, Location]);
  });

  it('should create', () => {
    const urlArray = ['lol'];

    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      url: urlArray.map(
        urlItem => ({ toString: () => urlItem })
      )
    });
    MockRender(NotFoundPageComponent);

    expect(ngMocks.findAll(NotFoundPageComponent)[0]).toBeTruthy();
  });

  it('should getUrl() correctly', () => {
    const urlArray = ['lol'];

    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      url: urlArray.map(
        urlItem => ({ toString: () => urlItem })
      )
    });
    const fixture = MockRender(NotFoundPageComponent);

    expect(fixture.point.componentInstance.url).toEqual(urlArray);
  });

  it('should determine notFoundReason as unknown correctly', () => {
    const urlArray = ['lol'];

    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      url: urlArray.map(
        urlItem => ({ toString: () => urlItem })
      )
    });
    const fixture = MockRender(NotFoundPageComponent);

    expect(fixture.point.componentInstance.notFoundReason).toEqual(NotFoundReason.Unknown);
  });

  it('should determine notFoundReason as project correctly', () => {
    const urlArray = ['not-found', 'project', '-1'];

    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      url: urlArray.map(
        urlItem => ({ toString: () => urlItem })
      )
    });
    const fixture = MockRender(NotFoundPageComponent);

    expect(fixture.point.componentInstance.notFoundReason).toEqual(NotFoundReason.Project);
  });

  it('should determine notFoundReason as sprint correctly', () => {
    const urlArray = ['not-found', 'sprint', '-1'];

    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      url: urlArray.map(
        urlItem => ({ toString: () => urlItem })
      )
    });
    const fixture = MockRender(NotFoundPageComponent);

    expect(fixture.point.componentInstance.notFoundReason).toEqual(NotFoundReason.Sprint);
  });

  it('should determine notFoundReason as task correctly', () => {
    const urlArray = ['not-found', 'task', '-1'];

    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      url: urlArray.map(
        urlItem => ({ toString: () => urlItem })
      )
    });
    const fixture = MockRender(NotFoundPageComponent);

    expect(fixture.point.componentInstance.notFoundReason).toEqual(NotFoundReason.Task);
  });

  it('should determine invalidId as url value correctly', () => {
    const urlArray = ['not-found', 'task', '-1'];

    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      url: urlArray.map(
        urlItem => ({ toString: () => urlItem })
      )
    });
    const fixture = MockRender(NotFoundPageComponent);

    expect(fixture.point.componentInstance.invalidId).toEqual(urlArray[2]);
  });

  it('should determine invalidId as undefined correctly', () => {
    const urlArray = ['not-found', 'task'];

    MockInstance(
      ActivatedRoute,
      'snapshot',
      jasmine.createSpy(),
      'get'
    ).and.returnValue({
      url: urlArray.map(
        urlItem => ({ toString: () => urlItem })
      )
    });
    const fixture = MockRender(NotFoundPageComponent);

    expect(fixture.point.componentInstance.invalidId).toBeUndefined();
  });

  it('should create the component when URL path is /404', () => {
    history.pushState(null, '', '/404');
    
    const fixture = MockRender(NotFoundPageComponent);
    
    expect(fixture.point.componentInstance).toBeTruthy();
  });
  
});
