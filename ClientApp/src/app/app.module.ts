import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';

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
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { EditorModule } from 'primeng/editor';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ColorPickerModule } from 'primeng/colorpicker';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';

import { NgxGanttModule } from '@worktile/gantt';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/miscellaneous/nav-menu/nav-menu.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { SprintDropdownComponent } from './components/miscellaneous/sprint-dropdown/sprint-dropdown.component';
import { ProjectPageComponent } from './components/pages/project-page/project-page.component';
import { TaskDropdownComponent } from './components/miscellaneous/task-dropdown/task-dropdown.component';
import { TaskPageComponent } from './components/pages/task-page/task-page.component';
import { GanttPageComponent } from './components/pages/gantt-page/gantt-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { FooterComponent } from './components/miscellaneous/footer/footer.component';
import { TitleInplaceComponent } from './components/inplaces/title-inplace/title-inplace.component';
import { TeamMembersComponent } from './components/pages/team-members/team-members.component';
import { TeamMembersFormComponent } from './components/miscellaneous/team-members-form/team-members-form.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component'
import { AuthGuard } from './guards/auth/auth.guard';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { DateInplaceComponent } from './components/inplaces/date-inplace/date-inplace.component';
import { ProjectsPageComponent } from './components/pages/projects-page/projects-page.component';
import { DescriptionInplaceComponent } from './components/inplaces/description-inplace/description-inplace.component';
import { CreateSprintModalComponent } from './components/modals/create-sprint-modal/create-sprint-modal.component';
import { CreateTaskModalComponent } from './components/modals/create-task-modal/create-task-modal.component';
import { CreateProjectModalComponent } from './components/modals/create-project-modal/create-project-modal.component';
import { ForgotPasswordComponent } from './components/pages/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { ProgressPickerComponent } from './components/pickers/progress-picker/progress-picker.component';
import { LabelsPageComponent } from './components/pages/labels-page/labels-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomePageComponent,
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
    DateInplaceComponent,
    ProjectsPageComponent,
    DescriptionInplaceComponent,
    CreateSprintModalComponent,
    CreateTaskModalComponent,
    CreateProjectModalComponent,
    ProgressPickerComponent,
    LabelsPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
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
    CalendarModule,
    MenuModule,
    CheckboxModule,
    DialogModule,
    InputNumberModule,
    ColorPickerModule,
    NgxGanttModule,
    EditorModule,
    OverlayPanelModule,
    DropdownModule,
    PasswordModule,
    MessagesModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full' },  // landing page for site
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
      { path: 'forgotpassword', component: ForgotPasswordComponent},
      { path: 'reset', component: ResetPasswordComponent},
      { path: 'teammembers', component: TeamMembersComponent, canActivate:[AuthGuard]},
      { path: 'project/:id', component: ProjectPageComponent, canActivate:[AuthGuard] },
      { path: 'project/:id/gantt', component: GanttPageComponent, canActivate:[AuthGuard] },
      { path: 'task/:id', component: TaskPageComponent, canActivate:[AuthGuard] },
      { path: 'projects', component: ProjectsPageComponent, canActivate: [AuthGuard] },     // route to here after successfully logging in
      { path: 'label', component: LabelsPageComponent, canActivate:[AuthGuard] },
      { path: 'not-found/*', component: NotFoundPageComponent },
      { path: '**', component: NotFoundPageComponent },    // fallback route, keep at bottom of route list
    ])
  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor,
      multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
