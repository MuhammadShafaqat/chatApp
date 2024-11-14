import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private auth:AuthService) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  
  ngOnInit(): void {}


  login() {
    const { username, password } = this.loginForm.value;
  
    // Retrieve stored user data
    const userData =  {username, password};
  

    this.auth.logIn(userData).subscribe((res:any) => {
      console.log('Login succcessful' + JSON.stringify(res));
      if (res.token) {
        localStorage.setItem('authToken', res.token)
         // Check if res includes a username property
         if (res.username) {
          localStorage.setItem('currentUser', JSON.stringify({ username: res.username }));
        } else {
          console.error('Username not found in response');
        }
      
        this.auth.setLoginStatus(true);
        this.router.navigate(['/my-feed']);       
      }
    }, (error: any) => {
      console.log(error)
      alert(error.error.errorMessage);
    })
    }
    // Check if credentials match
  
}

