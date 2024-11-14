import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isDropdownOpen: boolean = false;
  isLoginStatus: boolean = false
  currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  constructor(private router: Router, private auth:AuthService) {}

      ngOnInit(): void {
        this.auth.isLoginStatus.subscribe((isLoggedIn )=>{
         this.isLoginStatus = isLoggedIn ;
         if(isLoggedIn){
          this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
         this.isDropdownOpen = false;
         } else{
          this.currentUser = null;
         }
        })
      }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  clickOutside():void{
    this.isDropdownOpen = false;
  }

  logout() {
    // Clear login info and navigate to the login page
    this.auth.logOut();   
      
    this.router.navigate(['/login']);
  }
}
