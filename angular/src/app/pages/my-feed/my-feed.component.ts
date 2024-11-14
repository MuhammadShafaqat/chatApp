import { Component } from '@angular/core';

interface Post {
  id: number;
  title: string;
  content: string;
  user: string;
  createdAt: Date;
  commentCount: number;
  voteCount: number;
}

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.css']
})
export class MyFeedComponent {
  posts: Post[] = [
    { id: 1, title: 'Exploring New Frameworks', content: 'Sharing insights on various web frameworks.', user: 'Alice', createdAt: new Date('2023-10-01T08:00:00'), commentCount: 8, voteCount: 15 },
    { id: 2, title: 'Weekend Getaway Plans', content: 'Ideas for a relaxing weekend getaway.', user: 'Bob', createdAt: new Date('2023-10-02T12:30:00'), commentCount: 2, voteCount: 6 },
    { id: 3, title: 'Mastering Angular Components', content: 'A guide on creating reusable Angular components.', user: 'Charlie', createdAt: new Date('2023-10-03T09:45:00'), commentCount: 5, voteCount: 12 },
    { id: 4, title: 'Healthy Meal Prep Ideas', content: 'Quick and easy meal prep tips for a healthy diet.', user: 'Dana', createdAt: new Date('2023-10-04T15:20:00'), commentCount: 3, voteCount: 8 },
    { id: 5, title: 'Top JavaScript ES6 Tips', content: 'Discussing some of the best ES6 features.', user: 'Eve', createdAt: new Date('2023-10-05T11:10:00'), commentCount: 6, voteCount: 14 },
    { id: 6, title: 'Fitness Routine for Beginners', content: 'How to start a fitness routine for beginners.', user: 'Frank', createdAt: new Date('2023-10-06T13:50:00'), commentCount: 2, voteCount: 5 },
    { id: 7, title: 'Exploring the Outdoors', content: 'Planning a nature hike for the weekend.', user: 'Grace', createdAt: new Date('2023-10-07T17:00:00'), commentCount: 4, voteCount: 9 },
    { id: 8, title: 'How to Start a Blog', content: 'Tips on starting your own blog.', user: 'Hank', createdAt: new Date('2023-10-08T07:30:00'), commentCount: 5, voteCount: 13 },
    { id: 9, title: 'Mindful Morning Routines', content: 'Ideas to start your day with mindfulness.', user: 'Isla', createdAt: new Date('2023-10-09T10:15:00'), commentCount: 7, voteCount: 11 },
    { id: 10, title: 'Personal Finance Basics', content: 'Understanding budgeting and saving.', user: 'Jack', createdAt: new Date('2023-10-10T14:40:00'), commentCount: 9, voteCount: 16 }
  ];
  

  sortOption: string = 'mostUpvoted';

  toggleSort() {
    this.sortOption = this.sortOption === 'mostUpvoted' ? 'mostRecent' : 'mostUpvoted';
    // Sorting logic can be added here based on the selected option
  }

  get sortedPosts() {
    if (this.sortOption === 'mostUpvoted') {
      return this.posts.sort((a, b) => b.voteCount - a.voteCount);
    } else {
      return this.posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
  }
}

