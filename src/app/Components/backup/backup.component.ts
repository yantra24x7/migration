import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavbarService} from '../../Nav/navbar.service';
import { BackupService} from '../../Service/app/backup.service';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  test:FormGroup;
  machine_response: any;
  tenant: any;
  reason_response: any;
  backup: any;
  machine_id:any;
  myLoader = false;
  constructor(public dialog: MatDialog,private fb :FormBuilder,private nav:NavbarService,private service :BackupService) { 
    this.tenant=localStorage.getItem('tenant_id')

    this.nav.show();
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = new MatTableDataSource();
  openDialog(): void {
    const dialogRef = this.dialog.open(Backup, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  
    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
      // this.service.filelist( this.machine_response.id).subscribe(res =>{
        console.log(res);
        this.machine_id = this.machine_response[0].id;
        console.log(this.machine_id)
        this.getmachine(this.machine_response[0].id)
      });
   
  }
  
  getmachine(id) {
    this.myLoader = true;
     this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res)
      this.myLoader = false;

      this.backup=res;
      this.dataSource=new MatTableDataSource(this.backup)
     
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
    })  
  }




  testform(val)
  {
    console.log(this.test.value)
  }
  ngOnDestroy(){

  }
}
@Component({
  selector: 'backup-page',
  templateUrl: 'backup.html',
})
export class Backup {
  test:FormGroup;
  machine_response:any;
  baclog:any;
  tenant: any;
  user_id:any;
  file2:any;
  machine_id:any;
  constructor(public dialogRef: MatDialogRef<Backup>,@Inject(MAT_DIALOG_DATA) public data: string,private fb:FormBuilder,private service :BackupService) {
     this.tenant = localStorage.getItem('tenant_id')  
     this.user_id = localStorage.getItem('user_id')
     console.log(this.user_id)
  
  }

  fileUpload1(event){
    this.file2 = event.target.files[0];
    console.log(this.file2);
   
    
}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    this.test=this.fb.group ({
      machine_id:[""],
      reason:[""],

    })

    this.service.machine_lock( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
      
    });
  }
  testform(val)
  { 
    console.log(val);
    var fd = new FormData();
    fd.append('machine_id', this.test.value.machine_id);
    fd.append('reason', this.test.value.reason);
    fd.append('user_id',  this.user_id);
    fd.append('file', this.file2);
    console.log(fd)
    fd.forEach((value, key) => {
       console.log(key + value)
      });

      this.service.backup_folder(fd).pipe(untilDestroyed(this)).subscribe(res => {
        console.log(res);
    
  })
}

  
   ngOnDestroy(){

  }
}
