import { Component, ErrorHandler } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotFoundError, from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {
    sessionStorage.clear();
  }
  userdata: any;
  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginForm.valid) {

      this.service.FindByUsername(this.loginForm.value.username).subscribe(
        (res) => {
          this.userdata = res;
          // Continue with your logic here, including the if condition
          if (this.userdata && this.userdata.password === this.loginForm.value.password) {
            if (this.userdata.isactive) {
              sessionStorage.setItem('username', this.userdata.id);
              sessionStorage.setItem('userrole', this.userdata.role);
              this.router.navigate(['']);
            } else {
              this.toastr.error("please contact admin for enable access", "Inactive User");
            }
          } else {
            this.toastr.error("Invalid credential");
          }
        },
        (error) => {
          this.toastr.error("Invalid credential");
        }
      );




      // this.service.Proceedregistration(this.registerForm.value).subscribe(result => {
      //   this.toastr.success("please contact admin for enable access","Register Successfully!");
      //   this.router.navigate(['/login']);
      // });
      // }else{
      //   this.toastr.warning("Please enter valid data");
      // }
      // try {
      //   this.service.Getbycode(this.loginForm.value.username).subscribe(res => {
      //     this.userdata = res;
      //   });
      // } catch (error) {
      //   this.toastr.error("Invalid credential");
      // }


      // asynchronously???????????????????????


      // if (this.userdata.password === this.loginForm.value.password) {
      //   if (this.userdata.isactive) {
      //     sessionStorage.setItem('username', this.userdata.id);
      //     sessionStorage.setItem('userrole', this.userdata.role);
      //     this.router.navigate(['']);
      //   } else {
      //     this.toastr.error("please contact admin for enable access", "Inactive User");
      //   }
      // } else {
      //   this.toastr.error("Invalid credential");
      // }
      // }else {
      //   this.toastr.error("Invalid credential");
      //  }

    }

  }
}
