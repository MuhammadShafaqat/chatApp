import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { MyFeedComponent } from './pages/my-feed/my-feed.component';
import { AuthGuard } from './auth.guard';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
 


const routes: Routes = [
 {path:'header', component:HeaderComponent},
 {path:'', component:HomeComponent},
 {path:'login', component:LoginComponent},
 {path: 'register', component:RegisterComponent},
 {path:'my-feed', component:MyFeedComponent, canActivate: [AuthGuard]},
//  { path: 'post/:id', component: PostDetailsComponent },
{ path: 'post-details', component: PostDetailsComponent },
{path:'my-profile', component:MyProfileComponent},
{path:'create-post', component:CreatePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
