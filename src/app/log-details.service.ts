import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Loglevel } from './loglevel';

@Injectable({
  providedIn: 'root'
})
export class LogDetailsService  extends BehaviorSubject<any[]> {
  readonly BaseURI = 'https://localhost:44321';
  
  public datalog: any[]=[];
  
 
  constructor(private http: HttpClient) { super([]);}
 
  public readLog(id,level) {
    console.log('idApiService',id)
    console.log('levelService', level)
    if (this.datalog.length) {
      return super.next(this.datalog);
    }
    
    
   var datalogs = this.fetchLog(id,level);
   console.log('datalogs', datalogs)
   
      datalogs.pipe(
        tap((datalog) => {
          this.datalog = datalog  as any;
        })
      )
      .subscribe(() => {
        super.next(this.datalog) ;
        console.log("this.viewlog",this.datalog)
        console.log('idApiService2',id)
        console.log('levelService2',level)
      });
      console.log('datalogservice',this.datalog)
      
  }

  public fetchLog(id,level): Observable<Loglevel[]> 
  {
   
    return this.http.get(this.BaseURI + '/api/API/GetLogByLevelAndId/'+ id + '?level=' +level )
            
            .pipe(map(res => <Loglevel[]>res));
    }
    public occurrence(id,level) {
      return this.http.get<number>(this.BaseURI + '/api/API/GetOccurenceByLevel?id='+id+'&level='+level);
      
    }
    
    
}
