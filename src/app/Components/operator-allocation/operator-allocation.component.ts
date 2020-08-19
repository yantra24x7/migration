import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormArray,FormControl,FormGroup, Validators } from '@angular/forms';
import { OperatorAllocationService } from 'src/app/Service/app/operator-allocation.service';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-operator-allocation',
  templateUrl: './operator-allocation.component.html',
  styleUrls: ['./operator-allocation.component.scss']
})
export class OperatorAllocationComponent implements OnInit {

  displayedColumns: string[] = ['position', 'operator_name', 'operator_id','machine_name','machine_id','shift','shifttime','description','date','created','action'];
  dataSource = new MatTableDataSource();
  allocation: any;
  public dongly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  dialogRef: any;
  get_report: any;
  IsVisible: boolean;
  subid: any;

  onNoClick(): void {
    this.dialogRef.close();
  }
  tenant: any;
  myLoader = false;
  statusColapse:any;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
      - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
      ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  constructor(private nav:NavbarService,public dialog: MatDialog,private service:OperatorAllocationService) {
    this.nav.show()
    this.tenant = localStorage.getItem('tenant_id')
   }
   user():void{

    const dialogRef = this.dialog.open(New, {
      width: '450px',
      height:'auto'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.ngOnInit();
    // });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  ngOnInit() {
    this.myLoader = true;
    this.service.list(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
    console.log(res);
this.get_report = res;
      this.allocation=res;
      this.myLoader = false;

      this.dataSource=new MatTableDataSource(this.allocation)

    })
  }
  allocate(res){

    if(this.statusColapse == res){
                                          this.IsVisible = this.IsVisible ? false : true;
                                          return;
                                       }else{
                                         this.IsVisible=true;
                                       }
                                       this.statusColapse= res;


                                       this.subid=res;
}
  operator_delete(id) {
    console.log(id)
    Swal.fire({
      title: 'Are you sure want to delete?',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Please Confirm'
        }).then((destroy) => {
          if (destroy.value) {
            this.service.delete_row(id).pipe(untilDestroyed(this)).subscribe(res => {
              console.log(res);
              if(res === true)
              {
                Swal.fire("Deleted Succesfully !")
              }
              else{
                Swal.fire("Delete Failed")
              }
              this.ngOnInit()
            })
          }
        })
      }
    })
  }
  ngOnDestroy(){

  }
}
// @Component({
//   selector: 'add-page',
//   templateUrl: 'add.html',
//   styleUrls: ['./operator-allocation.component.scss']


// })
// export class Add {
//   login:FormGroup;
//   tenant: any;
//   machine_response: any;
//   shift_response: any;
//   operator_response: any;
//   dialogRef: any;
//   constructor(private service:OperatorAllocationService, ) {
//     this.tenant=localStorage.getItem('tenant_id')
  
//   }

  // onNoClick() {
  //   this.dialogRef.close();
  // }
  // ngOnInit()
  // { 
    // this.login=this.fb.group({
    // machine_id:["",Validators.required],
    // operator_id:["",Validators.required],
    // shifttransaction_id:["",Validators.required],
    // description:["",Validators.required],
    // target:["",Validators.required],
    // date: ["",Validators.required]
    // })


    // this.service.machine().pipe(untilDestroyed(this)).subscribe(res => {
    //   console.log(res);
    //   this.machine_response=res;
    //   console.log(localStorage.getItem('token'));})
     
      // this.service.shift(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      //   console.log(res);
      //   this.shift_response=res;
      //   this.service.shifttransaction(this.shift_response.id).subscribe(res =>{
      //   })
    
      //   console.log(localStorage.getItem('token'));})

      //   this.service.operator().pipe(untilDestroyed(this)).subscribe(res => {
      //     console.log(res);
      //     this.operator_response=res;
      //     console.log(localStorage.getItem('token'));})
     
     
//   }
 
//   ngOnDestroy(){

//   }
// }

@Component({
  selector: 'new-page',
  templateUrl: 'new.html',
  styleUrls: ['./operator-allocation.component.scss']


})

export class New {
  machine_response: any;
  operator_response: any;
  shift_response: any;
  tenant: string;
  dialogRef: any;
  login: any;
  
  constructor(private service:OperatorAllocationService,private fb:FormBuilder) {
    this.tenant=localStorage.getItem('tenant_id')
  }

  onNoClick():void{
    this.dialogRef.close();
  }
  ngOnInit()
  { 
  

    this.login=this.fb.group({
      machine_id:["",Validators.required],
      operator_id:["",Validators.required],
      shifttransaction_id:["",Validators.required],
      description:["",Validators.required],
      target:["",Validators.required],
      date: ["",Validators.required]
      })

      
    this.service.machine().pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
    
  
    this.service.shift(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.shift_response=res;
      this.service.shifttransaction(this.shift_response.id).subscribe(res =>{
      })
  
      console.log(localStorage.getItem('token'));})

      this.service.operator().pipe(untilDestroyed(this)).subscribe(res => {
        console.log(res);
        this.operator_response=res;
        console.log(localStorage.getItem('token'));})
   
    
     
  })
}
 
logintest() {

  console.log(this.login.value);
  let register = this.login.value;
  register.from_date = this.login.value.date[0];
  register.to_date = this.login.value.date[1];
  register.tenant_id = this.tenant;
  console.log(register);
  this.service.operator_create(register).pipe(untilDestroyed(this)).subscribe(res=>{
    console.log(res);
    this.dialogRef.close();
  })

}

  ngOnDestroy(){

  }
}