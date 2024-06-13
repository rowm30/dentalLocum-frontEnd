import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  roles = ['LOCUM', 'CLINIC', 'ADMIN'];

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    credentials: new FormControl(''),
    specialization: new FormControl(''),
    registrationNumber: new FormControl(''),
    registrationDate: new FormControl({value: new Date().toISOString().split('T')[0], disabled: true})
  });

  constructor(private http: HttpClient) {}

  formSubmit() {
    if (this.signupForm.valid) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/user/create', this.signupForm.value, { headers }).subscribe(
        response => {
          console.log(response);
          Swal.fire('Success', 'User created successfully', 'success');
        },
        error => {
          console.error(error);
          Swal.fire('Error', 'There was a problem creating the user', 'error');
        }
      );
    } else {
      this.displayErrors();
    }
  }

  displayErrors() {
    for (const name of Object.keys(this.signupForm.controls)) {
      const control = this.signupForm.get(name);
      if (control && control.errors) {
        const errors = control.errors;
        const firstKey = Object.keys(errors)[0];
        const message = this.getErrorMessage(name, firstKey as keyof typeof errors, errors[firstKey]);
        Swal.fire('Error', message, 'error');
        break; // Only show the first error
      }
    }
  }

  getErrorMessage(field: string, validatorName: keyof any, validatorValue?: any): string {
    const messages: { [key: string]: string } = {
      required: `${field} is required`,
      email: 'Please enter a valid email address',
      minlength: `${field} must be at least ${(validatorValue as any).requiredLength} characters long`
    };

    return  'Invalid field';
  }
}
