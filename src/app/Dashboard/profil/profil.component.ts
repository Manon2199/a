import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogService } from '@progress/kendo-angular-dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';




@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
 userDetails;
 roleName;
 data: Array<any> = [{
  text: 'List of all theUsers'
}]
  userId = localStorage.getItem('userId');
  roleId = localStorage.getItem('userRole')

  constructor(private router: Router, private service: UserService, private modalService: NgbModal) { }
  
 
   
  
  
  ngOnInit() {
    this.service.getUserProfile(this.userId).subscribe(
      res => {
        this.userDetails= res;
        console.log("user:",this.userDetails);
      
        console.log("roleId :", this.roleId);
      },
      err => {
        console.log(err);
      },
    );
    this.service.getrolename(this.roleId).subscribe(
      res=>{
      this.roleName= res;
        console.log("roleName :",this.roleName) 
      },
      err => {
        console.log(err);
      },
    );
  }
  
  open(userId) {
    this.modalService.open(EditProfileComponent);
    userId = localStorage.getItem('userId');
    console.log('**',this.userId);
   
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

 
}
