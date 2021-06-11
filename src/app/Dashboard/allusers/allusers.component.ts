import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss']
})
export class AllusersComponent implements OnInit {
  users = null;
 
  

  constructor(private userService: UserService) {}
  
  
 

  ngOnInit() {
      this.userService.getAll()
          .pipe(first())
          .subscribe(users => this.users= users);
    
         
         
  }

  deleteUser(id: number) {
      console.log('todelete',id);
      const user = this.users.find(x => x.UserID === id);
      if (!user) return;
      user.isDeleting = true;
      this.userService.delete(id.toString())
         
          .subscribe(() => this.users = this.users.filter(x =>  x.UserID === id));
  }

  

}
