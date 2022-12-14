import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';

import { NgxGanttModule } from '@worktile/gantt';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SprintDropdownComponent } from './sprint-dropdown/sprint-dropdown.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { TaskDropdownComponent } from './task-dropdown/task-dropdown.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { GanttPageComponent } from './gantt-page/gantt-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SprintDropdownComponent,
    ProjectPageComponent,
    TaskDropdownComponent,
    TaskPageComponent,
    GanttPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    AccordionModule,
    FieldsetModule,
    CardModule,
    PanelModule,
    ButtonModule,
    DividerModule,
    ChipModule,
    TagModule,
    ToolbarModule,
    AvatarModule,
    MenubarModule,
    RadioButtonModule,
    NgxGanttModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'project/:id', component: ProjectPageComponent },
      { path: 'project/:id/gantt', component: GanttPageComponent },
      { path: 'task/:id', component: TaskPageComponent },
      { path: 'not-found/*', component: NotFoundPageComponent },
      { path: '**', component: NotFoundPageComponent },    // fallback route, keep at bottom of route list
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
