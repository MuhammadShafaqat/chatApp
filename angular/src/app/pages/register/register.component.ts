import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    // firstName: new FormControl(''),
    // lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')  
  });
  ngOnInit(): void {}

  constructor(private router: Router, private auth: AuthService ) {}

  register() {
    const { username, password, confirmPassword } = this.registerForm.value;

    // Basic password match validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user data in local storage
    const userData = {  username, password };
    // localStorage.setItem('user', JSON.stringify(userData));
    this.auth.register(userData).subscribe((res: any) => {
      console.log('Registration succcessful' + res);
      this.router.navigate(['/login']);
    }, (error: any) => {
      console.log(error)
      alert(error.error.errorMessage);
    })

    console.log(`Registered user:   with username ${username}`);
     
    // Simulate successful registration by navigating to the login page
    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 500);
  }
}
