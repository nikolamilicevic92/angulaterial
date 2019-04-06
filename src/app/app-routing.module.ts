import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersIndexComponent } from './content/pages/users/users-index/users-index.component';
import { UsersCreateComponent } from './content/pages/users/users-create/users-create.component';
import { UsersShowComponent } from './content/pages/users/users-show/users-show.component';
import { UsersEditComponent } from './content/pages/users/users-edit/users-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './content/pages/login/login.component';
import { HomeComponent } from './content/pages/home/home.component';

const routes: Routes = [
  /**
   * This is how we can protect certian routes. For path we use something that all
   * routes we want to protect start with, in this case it's just an empty string.
   * 'canActivate' property takes an array with a guard class. Guard class can be
   * made with 'ng g g guard-name' and its method canActivate() will be called
   * whenever we try to access this route. To define child routes we use
   * 'children' property that takes an array of routes. Route is just an object
   * having path and component properties.
   */
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // Home
      {
        path: '', component: HomeComponent,
      },
      // Users
      {
        path: 'users', component: UsersIndexComponent,
      },
      {
        path: 'users/create', component: UsersCreateComponent,
      },
      /**
       * This is how we define route parameters so that we have one page for urls
       * like /users/1, /users/2, etc. We can then retreive these parameters in the
       * component by injecting ActivatedRoute instance and subscribing to its
       * params observable (route.params.subscribe(params => params.get('id'))). 
       * There can be any number of parameters, for example: /users/:user/posts/:post.
       */
      {
        path: 'users/:id', component: UsersShowComponent,
      },
      {
        path: 'users/:id/edit', component: UsersEditComponent,
      },
    ]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
