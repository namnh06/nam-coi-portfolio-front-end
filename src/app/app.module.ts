import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GraphQLModule } from './graphql/graphql.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { LoaderSpinnerInterceptor } from './interceptors/loader-spinner-interceptor';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, WelcomeComponent, LoaderSpinnerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GraphQLModule,
    AppRoutingModule,
    AngularMaterialModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderSpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
