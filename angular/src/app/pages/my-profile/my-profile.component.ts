import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  loggedIn = true; // Assuming this value is dynamically set based on user authentication
  isPostsOpen = false;
  isFollowersOpen = false;

  // Corrected isLoggedIn method
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  togglePosts() {
    this.isPostsOpen = !this.isPostsOpen;
  }

  toggleFollowers() {
    this.isFollowersOpen = !this.isFollowersOpen;
  }
}
