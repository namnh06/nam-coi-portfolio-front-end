import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotAuthGuardService } from './services/not-auth-guard.service';
const rootRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService]
  },
  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    canActivate: [NotAuthGuardService],
    canLoad: [NotAuthGuardService]
  },
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
