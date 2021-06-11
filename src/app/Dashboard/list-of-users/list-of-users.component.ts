import { Inject, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditApiService } from 'src/app/edit-api.service';
import { EditService } from 'src/app/edit-service.service';
import{UserService} from 'src/app/shared/user.service';
import { User } from 'src/app/user';

import { Users } from 'src/app/users';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  
  
  public formGroup: FormGroup;
  currentrole :string;

  private editService: EditService;
  private editedRowIndex: number;
  public role = localStorage.getItem('userRole');
  
  

  constructor(@Inject(EditService) editServiceFactory: any) {
    this.editService = editServiceFactory();
  }

  public ngOnInit(): void {
    this.view = this.editService.pipe(
      map((data) => process(data, this.gridState ))       
    );

    this.editService.read();
    console.log('currentrole:',this.role);
    
    
  }

  public onStateChange(state: State) {
    this.gridState = state;

    this.editService.read();
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      userId : new FormControl(),
      userName: new FormControl("", Validators.required),
      userEmail: new FormControl("", Validators.required),
      idr: new FormControl("",Validators.required)
      
    });
    sender.addRow(this.formGroup);  
  }

  

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
     
      userId: new FormControl(dataItem.userId),
      userName: new FormControl(dataItem.userName, Validators.required),
      userEmail: new FormControl(dataItem.userEmail, Validators.required),
      idr: new FormControl(dataItem.idr,Validators.required)
    });

    this.editedRowIndex = rowIndex;
    console.log('userIdtoedit', dataItem.userId)
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup,isNew}) {
    const user: Users = formGroup.value;
    this.editService.save(user, isNew);
    console.log('user',user)
    sender.closeRow(rowIndex);
  }

  public removeHandler({dataItem}) {
    this.editService.deleteUser(dataItem.userId).subscribe((data)=>{
      console.log("success");
 });
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}

  