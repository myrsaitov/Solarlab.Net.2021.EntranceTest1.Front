import {AdvertisementComponent} from './pages/advertisement/advertisement.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {CreateAdvertisementComponent} from './pages/create-advertisement/create-advertisement.component';
import {EditAdvertisementComponent} from './pages/edit-advertisement/edit-advertisement.component';


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
    component: CreateAdvertisementComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'edit/:id',
    component: EditAdvertisementComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: ':id',
    component: AdvertisementComponent,
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
