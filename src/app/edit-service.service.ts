import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Users } from './users';

const CREATE_ACTION = "create";
const UPDATE_ACTION = "update";
const REMOVE_ACTION = "destroy";

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
  userService: any;
  constructor(private http: HttpClient) {
    super([]);
   
  }
  readonly BaseURI = 'https://localhost:44348';
  private data: any[] = [];
  action : string = '';

  public read() {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.fetch()
      .pipe(
        tap((data) => {
          this.data = data  as any;
        })
      )
      .subscribe(() => {
        super.next(this.data) ;
      });
  }

public addUser(user) {
     return this.http.post(this.BaseURI + '/Settings/AddUser', user ); 
}
public editUser(userId, user){
  return this.http.post(this.BaseURI + '/Settings/EditUser/'+userId,user);
}
public deleteUser(userId){
  console.log('**',userId);
  return this.http.delete(this.BaseURI+'/Settings/DeleteUser/'+userId);

}


public save(data : any , isNew?: boolean) {
     this.action = isNew ? CREATE_ACTION : UPDATE_ACTION;
     this.reset();
     
     if(this.action == CREATE_ACTION){
     
      this.addUser(data).subscribe(() => this.read(), () => this.read());
      
      console.log('formGroup',data);
     

     }
    
    else 
    if(this.action == UPDATE_ACTION){
      
      this.editUser(data.userId, data).subscribe(() => this.read(), () => this.read());
      console.log('id', data.userId);
      console.log('formGroup',data);
      
    }

    console.log('action',this.action)
       

    
}

public resetItem(dataItem: any) {
    if (!dataItem) {
      return;
    }

    // find orignal data item
    const originalDataItem = this.data.find(
      (item) => item.userId === dataItem.userId
    );

    // revert changes
    Object.assign(originalDataItem, dataItem);

    super.next(this.data);
  }

  private reset() {
    this.data = [];
  }

  private fetch(): Observable<Users[]> 
  {
    return this.http.get(this.BaseURI + `/Settings/GetUsers`)
            
            .pipe(map(res => <Users[]>res));
    }

    
}


    