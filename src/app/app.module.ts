import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactService } from './services/contact.service';
import { NewContactComponent } from './new-contact/new-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';


const appRoutes: Routes = [

  { path: 'contacts', component: ContactListComponent },
  { path: 'new-contact', component: NewContactComponent },
  { path: 'contacts/:id', component: EditContactComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    NewContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [ ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
