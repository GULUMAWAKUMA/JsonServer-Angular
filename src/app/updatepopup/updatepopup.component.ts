import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrl: './updatepopup.component.css'
})
export class UpdatepopupComponent implements OnInit {

  constructor(public builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialogRef<UpdatepopupComponent>) { }
  rolelist: any;
  registerForm = this.builder.group({

    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)



  });

  editdata: any;
  ngOnInit(): void {
    try {
      this.service.GetAllRole().subscribe(res => this.rolelist = res);

      if (this.data.usercode != null && this.data.usercode != '') {
        this.service.Getbycode(this.data.usercode).subscribe(res => {
          this.editdata = res;
          if (this.editdata) {
            this.registerForm.setValue({
              id: this.editdata.id,
              name: this.editdata.name,
              email: this.editdata.email,
              password: this.editdata.password,
              role: this.editdata.role,
              gender: this.editdata.gender,
              isactive: this.editdata.isactive
            });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }


  updateuser() {
    if (this.registerForm.valid) {
      this.service.Updateuser(this.registerForm.value.id, this.registerForm.value).subscribe(data => {
        this.toastr.success("Updated user successfully");
        this.dialog.close();
      })
    } else {
      this.toastr.warning("Please select Role");
    }
  }

}
