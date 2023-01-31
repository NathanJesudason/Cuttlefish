import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { NgxGanttModule } from '@worktile/gantt';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SprintDropdownComponent } from './sprint-dropdown/sprint-dropdown.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { TaskDropdownComponent } from './task-dropdown/task-dropdown.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { GanttPageComponent } from './gantt-page/gantt-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FooterComponent } from './footer/footer.component';
import { TitleInplaceComponent } from './title-inplace/title-inplace.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamMembersFormComponent } from './team-members/team-members-form/team-members-form.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { AuthGuard } from './server-api/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomePageComponent,
    CounterComponent,
    FetchDataComponent,
    SprintDropdownComponent,
    ProjectPageComponent,
    TaskDropdownComponent,
    TaskPageComponent,
    GanttPageComponent,
    NotFoundPageComponent,
    FooterComponent,
    TitleInplaceComponent,
    TeamMembersComponent,
    TeamMembersFormComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
    InplaceModule,
    InputTextModule,
    ToastModule,
    NgxGanttModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full', canActivate:[AuthGuard] },
      { path: 'home', component: HomePageComponent, pathMatch: 'full', canActivate:[AuthGuard] }, // home is restricted so the user has to login first to see the home
      { path: 'login', component: LoginComponent},
      { path: 'signUp', component: SignupComponent}, // possible bug where it won't route to 'signup' but goes to 'signUp'
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'teammembers', component: TeamMembersComponent},
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
