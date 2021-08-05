import { Component, ComponentFactoryResolver, Inject, Input, OnInit } from '@angular/core';
import { IntlService, numberSymbols } from '@progress/kendo-angular-intl';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
import { CsvFileTypes, IgxCsvExporterOptions,IgxCsvExporterService } from 'igniteui-angular';
import "hammerjs";
import { LogDetailsService } from 'src/app/log-details.service';
import { Subscription } from 'rxjs';
import { CompilePipeMetadata } from '@angular/compiler';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent  implements OnInit{
 /* @Input() public idapi;*/
 public idApi=localStorage.getItem('idapichoosed2');
 public occ : number;
 public error_value =-1 ;
 public info_value=-1 ;
 public pieData: any[] ;
 public data;
 
constructor(private service:LogDetailsService,private intl: IntlService,
  private csvExportService: IgxCsvExporterService) {
  
   this.labelContent = this.labelContent.bind(this);
   
    
   
}
  ngOnInit() {
    debugger;
   this.levelOccurrence('INFO') ;
   this.levelOccurrence('ERROR') ;

  }
public levelOccurrence(level :string) {
  
  console.log(this.idApi)
  this.service.occurrence(this.idApi,level).subscribe(
    res =>{
      this.occ = res;
      console.log(this.occ)
      if(level=='ERROR') this.error_value = res;
      if(level=='INFO') this.info_value = res;

      console.log('error2',this.error_value) ;
      console.log('info2',this.info_value) ;
      if(this.error_value>=0 && this.info_value>=0)
{
  debugger;
this.pieData = [
{ level: "ERROR", value: this.error_value },
{ level: "WARN", value: 0},
{ level: "INFO", value:this.info_value},
{ level: "DEBUG", value: 0 },
{ level: "DEBUG-LOW", value:0},
{ level: "DEBUG-MEDIUM", value:0},
{ level: "DEBUG-HIGH", value: 0 },
{ level: "FATAL", value: 0},
{ level: "OFF", value: 0 },
{ level: "TRACE", value: 0}
];
console.log('piedata',this.pieData)
}
 this.data = this.pieData;
});  
} 
  getChartDefinition() {
    sessionStorage.setItem('Chart', JSON.stringify(this.pieData));
    console.log('sessionStorage',sessionStorage.getItem('Chart'));
    return {
      content: sessionStorage.getItem('Chart')
    };
  }
  generatePdf(){
    const documentDefinition = this.getChartDefinition();
    pdfMake.createPdf(documentDefinition).download();
   }
   public exportCsvButtonHandler() {
    const opt: IgxCsvExporterOptions = new IgxCsvExporterOptions('CSVExportFileFromData', CsvFileTypes.CSV);
    this.csvExportService.exportData(this.pieData, opt);
  }
  
public labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.level} : ${this.intl.formatNumber(args.dataItem.value, 'p2')}`;
}

}



