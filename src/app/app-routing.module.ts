import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './Dashboard/admin.component';
import { ProfilComponent } from './Dashboard/profil/profil.component';
import { APIsComponent } from './Dashboard/apis/apis.component';
import { BMComponent } from './Dashboard/bm/bm.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AllusersComponent } from './Dashboard/allusers/allusers.component';
import { AddEditComponent } from './Dashboard/allusers/add-edit/add-edit.component';
import { UserRole } from './user/registration/user-role';
import { AuthGuard } from './auth/auth.guard';

import { ListOfUsersComponent } from './Dashboard/list-of-users/list-of-users.component';
import { EditProfileComponent } from './Dashboard/edit-profile/edit-profile.component';
import { WelcomelogoComponent } from './welcomelogo/welcomelogo.component';
import { LogDetailsComponent } from './Dashboard/log-details/log-details.component';
import { StatisticsComponent } from './Dashboard/statistics/statistics.component';





 export const routes: Routes = [
  {path:'',redirectTo:'/welcomelogo',pathMatch:'full'},
  {path : 'welcomelogo' , component:WelcomelogoComponent},
  {
    path: 'user', component:UserComponent,
    children: [
     
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
 
  {
    path: 'Dashboard', component: AdminComponent,
    children: [
      {path:'edit-profile', component:EditProfileComponent},
      { path: 'profil', component: ProfilComponent},
   
      { path: 'apis', component: APIsComponent },
      { path: 'log-details', component: LogDetailsComponent },
      {path : 'statistics', component:  StatisticsComponent},
      { path: 'bm', component: BMComponent },
      { path: 'allusers', component: AllusersComponent,
       children:[
      { path: 'add', component: AddEditComponent, 
      canActivate: [AuthGuard],
      data :{permittedRoles:[1,2]}},
      { path: 'edit/:id', component: AddEditComponent,
      canActivate: [AuthGuard],
      data :{permittedRoles:[1]} }]},
      {path : 'list-of-users',component : ListOfUsersComponent}
      
        
      
    
    ]}
    
    

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
