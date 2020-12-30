import {MyEventComponent} from './pages/myevent/myevent.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/planner/planner.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {CreateMyEventComponent} from './pages/create-myevent/create-myevent.component';
import {EditMyEventComponent} from './pages/edit-myevent/edit-myevent.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'create',
    component: CreateMyEventComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'edit/:id',
    component: EditMyEventComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: ':id',
    component: MyEventComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
