import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {

  }
  // registerForm!: Employee;
  registerForm = this.builder.group({

    userName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false, Validators.compose([Validators.required])),



  });

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.service.Proceedregistration(this.registerForm.value).subscribe(result => {
        this.toastr.success("please contact admin for enable access", "Register Successfully!");
        this.router.navigate(['/login']);
      });
    } else {
      this.toastr.warning("Please enter valid data");
    }
  }
}
