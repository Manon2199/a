import { state } from '@angular/animations';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataResultIterator } from '@progress/kendo-angular-grid/dist/es2015/data/data.collection';
import { State, process} from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { EditApiService } from 'src/app/edit-api.service';
import { LogDetailsService } from 'src/app/log-details.service';
import { Loglevel } from 'src/app/loglevel';
import { StatisticsComponent } from '../statistics/statistics.component';

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.scss']
})
export class LogDetailsComponent implements OnInit {
  
  public opened = false;
  private logdetailsService: LogDetailsService;
  public currentItem=localStorage.getItem('idapichoosed1');
  public activeModal: NgbActiveModal;
  public viewlog: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  public gridView: any[];

  @Input() public idapi;
  
  constructor(@Inject(LogDetailsService) logDetailsService,private modalService: NgbModal,
  private router: Router) 
  { this.logdetailsService = logDetailsService;}
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  ngOnInit(): void {
    this.viewlog = this.logdetailsService.pipe(
      map((datalog) => process(datalog, this.gridState ))       
    );
    this.logdetailsService.readLog(this.currentItem,this.selectedLevel.Level);
    
    
  }
  public onFilter(inputValue: string): void {
    console.log(this.logdetailsService.datalog)
    console.log(this.dataBinding)
   this.gridView = process(this.logdetailsService.datalog, {
      filter: {
        logic: "or",
        filters: [
         
          {
            field: "thread",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "logger",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "system",
            operator: "contains",
            value: inputValue,
          },
          
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
   
  
  public defaultItemLevel: { Level : string} = {
    Level: "Select Level"
  };
  
  public dataLevel: Array<{ Level: string }> = [
    {Level: "ERROR" },
    {Level: "WARN" },
    {Level: "INFO"  },
    {Level : "DEBUG"},
    {Level : "DEBUG - LOW"},
    {Level : "DEBUG - MEDIUM"},
    {Level : "DEBUG - HIGH"},
    {Level : "FATAL"},
    {Level : "OFF"},
    {Level : "TRACE"}
    
  ];
  public selectedLevel: { Level: string };
  
  public handleLevelChange(value) {
    this.selectedLevel = value;
    console.log(this.logdetailsService)
    console.log("handleidapi",this.currentItem)
    console.log("handleselectedlevel",this.selectedLevel.Level)
    this.ngOnInit();
   
}
  public onStateChange(state: State) {
    this.gridState = state;
    console.log('*',this.selectedLevel)
    console.log('*',this.currentItem)
    this.logdetailsService.readLog(this.currentItem,this.selectedLevel.Level);
     
    
   }
   public open (){
    localStorage.setItem('idapichoosed2', this.currentItem);
    this.router.navigate(['/Dashboard/statistics']);
   }
}

      
  
 
 
  
  
 
 


