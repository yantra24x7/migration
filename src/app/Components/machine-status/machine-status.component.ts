import { Component, OnInit } from '@angular/core';
import { MachineStatusService } from '../../Service/app/machine-status.service';
@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss']
})
export class MachineStatusComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
  ];
  
  constructor(private service:MachineStatusService) { }

  ngOnInit() {
    // this.service.first_api().subscribe(res =>{
    //   console.log(res);
    // })
    this.service.firstapi().subscribe(res =>{
         console.log(res);
    })
  }

}
