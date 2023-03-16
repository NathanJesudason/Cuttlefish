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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';

import { NgxGanttModule } from '@worktile/gantt';

import { AppComponent } from 'src/app/app.component';
import { NavMenuComponent } from 'src/app/components/miscellaneous/nav-menu/nav-menu.component';
import { HomePageComponent } from 'src/app/components/pages/home-page/home-page.component';
import { SprintDropdownComponent } from 'src/app/components/miscellaneous/sprint-dropdown/sprint-dropdown.component';
import { ProjectPageComponent } from 'src/app/components/pages/project-page/project-page.component';
import { TaskDropdownComponent } from 'src/app/components/miscellaneous/task-dropdown/task-dropdown.component';
import { TaskPageComponent } from 'src/app/components/pages/task-page/task-page.component';
import { GanttPageComponent } from 'src/app/components/pages/gantt-page/gantt-page.component';
import { NotFoundPageComponent } from 'src/app/components/pages/not-found-page/not-found-page.component';
import { FooterComponent } from 'src/app/components/miscellaneous/footer/footer.component';
import { TitleInplaceComponent } from 'src/app/components/inplaces/title-inplace/title-inplace.component';
import { TeamMembersComponent } from 'src/app/components/pages/team-members/team-members.component';
import { TeamMembersFormComponent } from 'src/app/components/miscellaneous/team-members-form/team-members-form.component';
import { LoginComponent } from 'src/app/components/pages/login/login.component';
import { SignupComponent } from 'src/app/components/pages/signup/signup.component'
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { TokenInterceptor } from 'src/app/interceptors/token/token.interceptor';
import { DateInplaceComponent } from 'src/app/components/inplaces/date-inplace/date-inplace.component';
import { ProjectsPageComponent } from 'src/app/components/pages/projects-page/projects-page.component';
import { DescriptionInplaceComponent } from 'src/app/components/inplaces/description-inplace/description-inplace.component';
import { CreateSprintModalComponent } from 'src/app/components/modals/create-sprint-modal/create-sprint-modal.component';
import { CreateTaskModalComponent } from 'src/app/components/modals/create-task-modal/create-task-modal.component';
import { CreateProjectModalComponent } from 'src/app/components/modals/create-project-modal/create-project-modal.component';
import { ForgotPasswordComponent } from 'src/app/components/pages/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from 'src/app/components/pages/reset-password/reset-password.component';
import { ProgressPickerComponent } from 'src/app/components/pickers/progress-picker/progress-picker.component';
import { LabelsPageComponent } from 'src/app/components/pages/labels-page/labels-page.component';
import { ProjectCardComponent } from 'src/app/components/miscellaneous/project-card/project-card.component';
import { ColorInplaceComponent } from 'src/app/components/inplaces/color-inplace/color-inplace.component';
import { FundsInplaceComponent } from 'src/app/components/inplaces/funds-inplace/funds-inplace.component';
import { TaskTypePickerComponent } from './components/pickers/task-type-picker/task-type-picker.component';
import { DependencyPickerComponent } from 'src/app/components/pickers/dependency-picker/dependency-picker.component';
import { DeleteDependencyPickerComponent } from 'src/app/components/pickers/delete-dependency-picker/delete-dependency-picker.component';
import { DependencyInplaceComponent } from './components/inplaces/dependency-inplace/dependency-inplace.component';


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
    TaskTypePickerComponent,
    DependencyPickerComponent,
    DeleteDependencyPickerComponent,
    DependencyInplaceComponent,
    LabelsPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProjectCardComponent,
    ColorInplaceComponent,
    FundsInplaceComponent,
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
    ListboxModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    TooltipModule,
    MultiSelectModule,
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
