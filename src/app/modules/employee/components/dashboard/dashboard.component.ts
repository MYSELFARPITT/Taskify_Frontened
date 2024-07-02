import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listOfTask:any = [];
  constructor(private service:EmployeeService,
    private snackbar:MatSnackBar
  ){
    this.getTasks();
  }


  getTasks(){
    this.service.getEmployeeTaskNyId().subscribe((res)=>{
       console.log(res);
        this.listOfTask=res;
    })
  }

  updateStatus(id:number, status:string){
    this.service.updateStatus(id,status).subscribe((res)=>{
      if(res.id != null){
        this.snackbar.open("Task status updated", "Close",{duration:5000});
        this.getTasks();
      }
      else{
        this.snackbar.open("Getting Error while updating status", "Close",{duration:5000});
      }
    })
  }
}
