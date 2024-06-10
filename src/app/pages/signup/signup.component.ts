import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http'; // Import HttpClientModule here too
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, // Make sure to include HttpClientModule here
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  roles = ['LOCUM', 'CLINIC', 'ADMIN'];
  selectedRole: string | undefined;
  currentDate: Date = new Date();

  public user = {
    email: '',
    password: '',
    name: '',
    role: '',
    credentials: '',
    specialization: '',
    registrationNumber: '',
    registrationDate: this.currentDate.toISOString().split('T')[0]
  }

  constructor(private http: HttpClient) {} // HttpClient should now be available

  // Function to submit the form
  formSubmit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      name: this.user.name,
      password: this.user.password,
      email: this.user.email,
      role: this.user.role,
      credentials: this.user.credentials,
      specialization: this.user.specialization,
      registrationNumber: this.user.registrationNumber
    };

    this.http.post('http://localhost:8080/user/create', body, { headers })
      .subscribe(
        response => console.log(response),
        error => console.error(error)
      );
  }
}
