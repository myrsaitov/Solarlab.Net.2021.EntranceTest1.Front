import {AuthService} from './services/auth.service';
import {MyEventComponent} from './pages/myevent/myevent.component';
import {MyEventCardComponent} from './components/myevent-card/myevent-card.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './pages/planner/planner.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from './guards/auth.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ApiInterceptor} from './interceptors/api-url.interceptor';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AuthHeadersInterceptor} from './interceptors/headers.interceptor';
import {CreateMyEventComponent} from './pages/create-myevent/create-myevent.component';
import {ToastsContainerComponent} from './components/toast-container/toast-container.component';
import {EditMyEventComponent} from './pages/edit-myevent/edit-myevent.component';
import { ConnectionpageComponent } from './components/connectionpage/connectionpage.component';

// export const createInterceptorProvider = (interceptor: any): Provider => {
//   return {
//     provide: HTTP_INTERCEPTORS,
//     useClass: interceptor,
//     multi: true
//   };
// };

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    MyEventCardComponent,
    MyEventComponent,
    CreateMyEventComponent,
    ToastsContainerComponent,
    EditMyEventComponent,
    ConnectionpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'BASE_API_URL',
      useValue: environment.baseApiUrl
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
