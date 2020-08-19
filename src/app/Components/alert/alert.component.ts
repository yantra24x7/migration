import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { AlertService} from '../../Service/app/alert.service';
import { MatTableDataSource } from '@angular/material';
import { PageEvent, MatPaginator} from '@angular/material/paginator';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  message:any;
  displayedColumns: string[] = ['position','machine', 'message', 'date', 'time'];
  dataSource = new MatTableDataSource();
  pageNo: any;
  page_size= 10;
  myLoader = false;
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    // if(!this.dataSource.filter){
    //   this.message = "No results found"
    // }
  }
  http: any;
  test: any;
  alertreport: any;
  tenant: string;
  length: number;
  paginator: any;
  total_count: any;

  constructor(private nav:NavbarService,private service:AlertService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }

  ngOnInit() {
    this.myLoader=true;
    this.pageNo =1;
   this.service.alert(this.tenant,this.pageNo,).pipe(untilDestroyed(this)).subscribe(res => {
      
      this.myLoader=false;

      this.alertreport=res;
      for(let i=0;i<=this.alertreport.length;i++){
        
      }
      this.dataSource=new MatTableDataSource(this.alertreport)
      // this.length = 1;
      // this.dataSource.paginator = this.paginator;
      this.total_count =res.alertreport;


    })

  } 
  pageEvent(e){
 
    this.pageNo = e.pageIndex+1;
    this.service.alert(this.tenant,this.pageNo).pipe(untilDestroyed(this)).subscribe( res => {
   
     this.alertreport = res;
      this.dataSource = new MatTableDataSource(this.alertreport);
    })
  }

  ngOnDestroy(){

  }
}
