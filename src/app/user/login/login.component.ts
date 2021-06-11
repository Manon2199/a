import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }
  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/Dashboard/profil');
   
}

LoginForm  : FormGroup = new FormGroup  ({
   
  UserEmail:new FormControl('', Validators.email),
  PasswordUser: new FormControl('', (Validators.required, Validators.minLength(4))),
})

 
getDecodedAccessToken(token: string): any {
  try{
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}
submitForm(): void {
  this.LoginForm.markAllAsTouched();
  this.service.login(this.LoginForm.value).subscribe(
    (res: any) => {
      localStorage.setItem('token', res.token);
      let token = this.getDecodedAccessToken(res.token);
      console.log(token.Role)
      localStorage.setItem('userRole', token.Role);

      localStorage.setItem('userId', res.userID);
      this.router.navigateByUrl('/Dashboard/profil');
    },
    err => {
      if (err.status == 400)
        this.toastr.error('Incorrect username or password.', 'Authentication failed.');
      else
        console.log(err);
    }
  );
}
}


