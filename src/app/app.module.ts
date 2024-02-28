import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { HomeComponent } from './home/home.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
// import { AuthGuard } from "./auth.guard";
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserListingComponent,
    HomeComponent,
    UpdatepopupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
