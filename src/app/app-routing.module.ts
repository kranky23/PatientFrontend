import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { Messages1Component } from './components/messages1/messages1.component';
import { MoodComponent } from './components/mood/mood.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProgressComponent } from './components/progress/progress.component';
import { RegisterComponent } from './components/register/register.component';
import { SectionsComponent } from './components/sections/sections.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthGuard } from './services/auth.guard';
//canActivate: [AuthGuard]
const routes: Routes = [
  {path : 'login' , component : LoginComponent , pathMatch : "full"} ,
  {path : 'mood' , component : MoodComponent , pathMatch : "full"} ,
  {path : 'dashboard' , component : DashboardComponent , pathMatch : "full"} ,
  {path : 'navbar' , component : NavBarComponent , pathMatch : "full"} ,
  {path : 'register' , component : RegisterComponent , pathMatch : "full"}  ,
  {path : 'sections' , component : SectionsComponent, pathMatch : "full"},
  {path : 'home' , component : HomeComponent, pathMatch : "full"},
  {path : 'messages' , component : MessagesComponent, pathMatch : "full"},
  {path : 'messages1' , component : Messages1Component, pathMatch : "full"},
  {path : 'tasks' , component : TasksComponent, pathMatch : "full"},
  {path : 'progress' , component : ProgressComponent, pathMatch : "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
