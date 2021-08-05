import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Apis } from './apis';
import { Loglevel } from './loglevel';

const CREATE_ACTION = "create";
const UPDATE_ACTION = "update";
const REMOVE_ACTION = "destroy";

@Injectable()
export class EditApiService extends BehaviorSubject<any[]> {
  userService: any;
  constructor(private http: HttpClient) {
    super([]);
   
  }
  readonly BaseURI = 'https://localhost:44321';
  private data: any[] = [];
  private datalog: any[]=[];
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
  
  

public addApi(api) {
  console.log("addedAPI:",api)
     return this.http.post(this.BaseURI + '/api/API/AddAPI',api ); 
}


public editApi(idapi, api){
  console.log('idservice',idapi)
  console.log('apiservice',api)
  return this.http.post(this.BaseURI + '/api/API/EditAPI/'+idapi,api);
}
public deleteApi(Idapi){
  console.log('**',Idapi);
  return this.http.delete(this.BaseURI+'/api/API?IDAPI='+Idapi);

}


public save(data : any , isNew?: boolean) {
     this.action = isNew ? CREATE_ACTION : UPDATE_ACTION;
     this.reset();
     
     if(this.action == CREATE_ACTION){
      console.log('formGroup',data);
     
      this.addApi(data).subscribe(() => this.read(), () => this.read());
      
      console.log('formGroup',data);
     

     }
    
    else 
    if(this.action == UPDATE_ACTION){
      
      this.editApi(data.idapi, data).subscribe(() => this.read(), () => this.read());
      console.log('id', data.idapi);
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
      (item) => item.idapi === dataItem.idapi
    );

    // revert changes
    Object.assign(originalDataItem, dataItem);

    super.next(this.data);
  }

  private reset() {
    this.data = [];
  }

  private fetch(): Observable<Apis[]> 
  {
    return this.http.get(this.BaseURI + `/api/API/GetAllAPIs`)
            
            .pipe(map(res => <Apis[]>res));
    }
public checkApi(idapi,currentid)
{
  return this.http.post(this.BaseURI + '/api/API/APIExistCheck?idapi= &currentid=' +idapi,+currentid ); 
}
    
}