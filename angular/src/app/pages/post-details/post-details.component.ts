import { Component } from '@angular/core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {

  post = { title: 'Sample Post', description: 'This is a sample post description', createdAt: new Date(), comments: [{ text: 'this is a new comment' }] };

}
