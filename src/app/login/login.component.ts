import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthenticatedResponse } from '../models/AuthenticatedResponse';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  invalidLogin: boolean = false;

  usernameTouched: boolean = false;
  passwordTouched: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { email: this.username, password: this.password };
  
    // Log the payload being sent for debugging purposes
  //  console.log('Payload being sent:', credentials);
  
    this.authService.login(credentials).subscribe({
      next: (response: AuthenticatedResponse) => {
        console.log('Login successful:', response); // Debug log
        localStorage.setItem('jwt', response.token);
  
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
  
        this.invalidLogin = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
      //  console.error('Request payload:', credentials);
        console.error('Headers:', headers);
        console.error('Login error:', err);
        this.invalidLogin = true;
        alert('Invalid login attempt. Please try again.');
      },
    });
  }
  
}