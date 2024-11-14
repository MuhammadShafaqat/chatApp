import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Comment {
  user: string;
  content: string;
  createdAt: Date;
}

interface Post {
  id: number;
  title: string;
  content: string;
  user: string;
  createdAt: Date;
  commentCount: number;
  voteCount: number;
  comments: Comment[];
  newComment?: string;
  isCommenting?: boolean; // New property for toggling comment input
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn = true;
  posts: Post[] = [
    {
      id: 1,
      title: 'Exploring Angular',
      content: 'Diving deep into Angular components and services.',
      user: 'Alice',
      createdAt: new Date('2023-10-01T08:30:00'),
      commentCount: 4,
      voteCount: 10,
      comments: [],
      isCommenting: false // Initialize with false
  },
  {
      id: 2,
      title: 'Learning TypeScript',
      content: 'Understanding TypeScript types and interfaces.',
      user: 'Bob',
      createdAt: new Date('2023-10-05T15:00:00'),
      commentCount: 2,
      voteCount: 7,
      comments: [],
      isCommenting: false
  },
  {
      id: 3,
      title: 'Mastering React',
      content: 'Building dynamic user interfaces with React.',
      user: 'Charlie',
      createdAt: new Date('2023-10-10T09:15:00'),
      commentCount: 3,
      voteCount: 15,
      comments: [],
      isCommenting: false
  },
  {
      id: 4,
      title: 'JavaScript ES6 Features',
      content: 'Exploring the new features of JavaScript ES6.',
      user: 'Dana',
      createdAt: new Date('2023-10-12T11:00:00'),
      commentCount: 5,
      voteCount: 12,
      comments: [],
      isCommenting: false
  },
  {
      id: 5,
      title: 'Understanding Redux',
      content: 'Managing state in React applications using Redux.',
      user: 'Eve',
      createdAt: new Date('2023-10-15T14:00:00'),
      commentCount: 6,
      voteCount: 20,
      comments: [],
      isCommenting: false
  },
  {
      id: 6,
      title: 'Web Development Best Practices',
      content: 'Tips and tricks for effective web development.',
      user: 'Frank',
      createdAt: new Date('2023-10-20T13:30:00'),
      commentCount: 1,
      voteCount: 8,
      comments: [],
      isCommenting: false
  },
  {
      id: 7,
      title: 'CSS Grid vs. Flexbox',
      content: 'When to use Grid and when to use Flexbox.',
      user: 'Grace',
      createdAt: new Date('2023-10-22T10:45:00'),
      commentCount: 4,
      voteCount: 11,
      comments: [],
      isCommenting: false
  },
  {
      id: 8,
      title: 'Backend Development with Node.js',
      content: 'Creating a RESTful API using Node.js and Express.',
      user: 'Heidi',
      createdAt: new Date('2023-10-25T12:00:00'),
      commentCount: 2,
      voteCount: 9,
      comments: [],
      isCommenting: false
  },
  {
      id: 9,
      title: 'Database Management with MongoDB',
      content: 'Understanding NoSQL databases and MongoDB basics.',
      user: 'Ivan',
      createdAt: new Date('2023-10-28T16:00:00'),
      commentCount: 3,
      voteCount: 14,
      comments: [],
      isCommenting: false
  },
  {
      id: 10,
      title: 'Deploying Applications to the Cloud',
      content: 'Best practices for deploying web applications to the cloud.',
      user: 'Judy',
      createdAt: new Date('2023-10-30T09:00:00'),
      commentCount: 0,
      voteCount: 5,
      comments: [],
      isCommenting: false
  }
    // Additional posts can be added here
  ];

  constructor(private router: Router) {}

  toggleCommentInput(post: Post) {
    post.isCommenting = !post.isCommenting; // Toggle the commenting flag
  }

  addComment(post: Post) {
    if (post.newComment) {
      const comment: Comment = {
        user: 'Current User', // Replace with actual logged-in user
        content: post.newComment,
        createdAt: new Date()
      };
      post.comments.push(comment);
      post.commentCount++;
      post.newComment = ''; // Clear the input after posting
      post.isCommenting = false; // Hide the comment input after posting
    }
  }

  navigateToMyFeed() {
    this.router.navigate(['/my-feed']); // Adjust to your routing setup
  }
}
