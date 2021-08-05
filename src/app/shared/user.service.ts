import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { delay } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserRole } from '../user/registration/user-role';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root',
  
})
export class UserService  {
  
  
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44321';

  

  registerForm : FormGroup = new FormGroup  ({
    UserName: new FormControl('', Validators.required),
    UserEmail:new FormControl('', Validators.email),
    Passwords: this.fb.group({
      PasswordUser: new FormControl('', (Validators.required, Validators.minLength(4))),
      ConfirmPassword: new FormControl('', Validators.required)
    }, { validator: this.comparePasswords }),
    IDR: new FormControl([], Validators.required)
    /*ProfilePicture :new FormControl ('', Validators.required)*/


  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('PasswordUser').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.registerForm.value.UserName,
      UserEmail: this.registerForm.value.UserEmail,
      PasswordUser: this.registerForm.value.Passwords.PasswordUser,
      IDR: this.registerForm.value.IDR
     /* ProfilePicture: this.registerForm.value.ProfilePicture*/
    };
    return this.http.post(this.BaseURI + '/Settings/Register', body);
    
  }

  getAll() {
    return this.http.get(this.BaseURI + '/Settings/getAdmin') 
}
  
  getroles()
  {
    return this.http.get(this.BaseURI + '/Settings/GetRoles') 
      
  }
  getrolename(idr)
  {
    return this.http.get(this.BaseURI + '/Settings/GetRoleName?idr='+idr) 
  }
  login(form : NgForm) {
    return this.http.post(this.BaseURI + '/Settings/Login', form);
  }

  getUserProfile(id) {
    return this.http.get(this.BaseURI + '/api/UserProfile?userId=' + id);
  }
  delete(id){
    return this.http.delete(this.BaseURI +'/api/UserProfile', id);
  }
  updateUser( id, model){
    return this.http.post(this.BaseURI +'/Settings/Update?id='+id,model)
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    
    
    var userRole = localStorage.getItem('userRole')
    
    allowedRoles.forEach(element => {
      console.log(userRole);
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  

  } 
 
}