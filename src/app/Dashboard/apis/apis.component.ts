import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Inject, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apis } from 'src/app/apis';
import { EditApiService } from 'src/app/edit-api.service';
import { User } from 'src/app/user';
import { Users } from 'src/app/users';



@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.scss']
})
export class APIsComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  public formGroup: FormGroup;

  private editApiService: EditApiService;
  private editedRowIndex: number;
  public role = localStorage.getItem('userRole');
  public currentId = localStorage.getItem('userId');
  public currentIDAPI = localStorage.getItem('idapi');
  
  
  
  

  constructor(@Inject(EditApiService) editApiService) 
  { this.editApiService = editApiService;}

  public ngOnInit(): void {
    this.view = this.editApiService.pipe(
      map((data) => process(data, this.gridState ))       
    );

    this.editApiService.read();
    
    

  }
 
   public bool (idapi){ 
     this.editApiService.checkApi(idapi,this.currentId);
     console.log('bool',idapi)
    }
   
   
  

  public onStateChange(state: State) {
    this.gridState = state;

    this.editApiService.read();
   
  
  }
  
    
    

  public addHandler({ sender }) {

    this.formGroup = new FormGroup({
      idapi : new FormControl(),
      projectName: new FormControl("", Validators.required),
      serverName : new FormControl("",Validators.required),
      dataName: new FormControl("", Validators.required),
      userid: new FormControl("",Validators.required),
      password :new FormControl("",Validators.required)
      
    });
   
    sender.addRow(this.formGroup);  
  }

  

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
     
      idapi: new FormControl(dataItem.idapi),
      projectName: new FormControl(dataItem.projectName, Validators.required),
      serverName : new FormControl(dataItem.serverName, Validators.required),
      dataName: new FormControl(dataItem.dataName, Validators.required),
      userid: new FormControl(dataItem.userid,Validators.required),
      password: new FormControl(dataItem.password,Validators.required)
    });

    this.editedRowIndex = rowIndex;
    console.log('IDAPItoedit', dataItem.idapi)
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup,isNew}) {
    const api: Apis = formGroup.value;
    this.editApiService.save(api, isNew);
    console.log('api',api)
    sender.closeRow(rowIndex);
  }

  public removeHandler({dataItem}) {
  

    this.editApiService.deleteApi(dataItem.idapi).subscribe((data)=>{
      console.log("success");
 });
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}