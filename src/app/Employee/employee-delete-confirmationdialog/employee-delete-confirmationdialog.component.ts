import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-delete-confirmationdialog',
  templateUrl: './employee-delete-confirmationdialog.component.html',
  styleUrls: ['./employee-delete-confirmationdialog.component.css']
})
export class EmployeeDeleteConfirmationdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeDeleteConfirmationdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  name:string;
  ngOnInit() {
    this.name=this.data.employeeName
  }

  onCancelClick() {
    this.dialogRef.close();
  }
  
  delete(){
    this.dialogRef.close({message:"confirmed"});
  }

}
