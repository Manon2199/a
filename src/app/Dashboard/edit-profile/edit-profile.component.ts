import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert.service';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/user';
import { Users } from 'src/app/users';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
 form: FormGroup;
  id: number;
  loading = false;
  submitted = false;
  userId = localStorage.getItem('userId');
  
  

  
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService : AlertService,
      public activeModal: NgbActiveModal
      
      

      
      
   ) {}
 public roles;





  ngOnInit(): void {
    
       
        const passwordValidators = [Validators.minLength(4)];
           this.form = this.formBuilder.group({
           
            userName: ['', Validators.required],
            userEmail: ['', Validators.required],
            passwordUser: ['', passwordValidators],
            idr: ['', Validators.required]   
           });
        this.userService.getroles().subscribe(
          res=> {
            this.roles = res;
            console.log("roles:",this.roles)
          },
          err => {
            console.log(err);
          }
        )

        this.userService.getUserProfile(this.userId)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
        
  }
  

  

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.updateUser();
      }
  
  

   

    updateUser() {
        this.userService.updateUser(this.userId, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.activeModal.close();
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
  


  
    
  }



