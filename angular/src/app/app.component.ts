import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from './pages/create-post/create-post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  posts: any[] = []; // existing posts

  constructor(private dialog: MatDialog) {}

  openCreatePostDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '400px',
      panelClass: 'centered-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPost = {
          id: this.posts.length + 1,
          title: result.title,
          content: result.description,
          user: 'Current User',
          createdAt: new Date(),
          commentCount: 0,
          voteCount: 0,
          comments: []
        };
        this.posts.unshift(newPost); // Add the new post to the top of the posts array
      }
    });
  }
}
