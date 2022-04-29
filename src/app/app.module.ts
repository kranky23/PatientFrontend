import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MoodComponent } from './components/mood/mood.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './components/home/home.component';

import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SectionsComponent } from './components/sections/sections.component';
import { LoginService } from './services/login.service';
import { AuthGuard } from './services/auth.guard';
import { TasksComponent } from './components/tasks/tasks.component';
import { MessagesComponent } from './components/messages/messages.component';
import { Messages1Component } from './components/messages1/messages1.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressComponent } from './components/progress/progress.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
// import { AuthInterceptor } from './services/auth.interceptor';  
// ==> uncomment when you need JWT for all API calls



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MoodComponent,
    DashboardComponent,
    NavBarComponent,
    HomeComponent,
    SectionsComponent,
    TasksComponent,
    MessagesComponent,
    Messages1Component,
    ProgressComponent,
    AdminComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  // , [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}]   => put this in the providers array below
  providers: [LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
