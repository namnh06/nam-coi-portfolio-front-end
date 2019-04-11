import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { GraphQLModule } from './graphql/graphql.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, WelcomeComponent],
  imports: [BrowserModule, HttpClientModule, GraphQLModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
