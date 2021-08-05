import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

import { ToastrService } from 'ngx-toastr';
import { concat, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert.service';
import { UserService } from 'src/app/shared/user.service';
import { UserRole } from 'src/app/user/registration/user-role';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

   constructor(public service: UserService, private toastr: ToastrService, public alertService: AlertService) { }
   @ViewChild('password') public textbox: TextBoxComponent;
   public roles;

    ngOnInit() {
      this.service.registerForm.reset();
      this.service.getroles().subscribe(
        res=> {
          this.roles = res;
          console.log("roles:",this.roles)
        },
        err => {
          console.log(err);
        }
      )
    }
 

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === 'passwordUser' ? 'text' : 'passwordUser';
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.registerForm.reset();
          this.toastr.success('Account created');
          this.alertService.success('Account created!', 'Registration successful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.alertService.alert;
                this.toastr.error('Username is already token','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  uploadSaveUrl = 'saveUrl'; 
  uploadRemoveUrl = 'removeUrl';

}
@Injectable()
  export class UploadInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'saveUrl') {
      const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => of(<HttpProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 100
      }).pipe(delay(1000)));

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
      events.push(success);

      return concat(...events);
    }

    if (req.url === 'removeUrl') {
        return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}
