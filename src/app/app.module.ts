import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Dashboard/admin.component';
import { ProfilComponent } from './Dashboard/profil/profil.component';
import { APIsComponent } from './Dashboard/apis/apis.component';
import { BMComponent } from './Dashboard/bm/bm.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UploadInterceptor } from './user/registration/registration.component';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { routes } from './app-routing.module';

import { UserRole } from './user/registration/user-role';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { AllusersComponent } from './Dashboard/allusers/allusers.component';
import { AddEditComponent } from './Dashboard/allusers/add-edit/add-edit.component';
import { AlertComponent } from './alert/alert.component';


import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListOfUsersComponent } from './Dashboard/list-of-users/list-of-users.component';
import { EditService } from './edit-service.service';
import{EditApiService} from'./edit-api.service';
import { EditProfileComponent } from './Dashboard/edit-profile/edit-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomelogoComponent } from './welcomelogo/welcomelogo.component';
















@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ProfilComponent,
    APIsComponent,
    BMComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    
    AllusersComponent,
    AddEditComponent,
    AlertComponent,
    
    ListOfUsersComponent,
         EditProfileComponent,
         WelcomelogoComponent,
    
   
    
    
    
  ],
  imports:[
    CommonModule,
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    GridModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    HttpClientModule,
    DropDownsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UploadsModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
    LayoutModule,
    BrowserAnimationsModule,
    
    MatDialogModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbModule
   
    
    
  
  
   
     
     
    
    

    
    
  ],
  providers: [UserService,UserRole,
  {provide: HTTP_INTERCEPTORS,
    useClass: UploadInterceptor,
    multi: true},
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
    {
      deps: [HttpClient],
      provide : EditApiService
    }
    ],
    
    
  bootstrap: [AppComponent,EditProfileComponent],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
  
  
})
export class AppModule { }
