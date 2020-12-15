import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../models/Contact.model';
import { Subscription } from 'rxjs/Subscription';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[];
  contactSubscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactSubscription = this.contactService.contactSubject.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    this.contactService.emitContacts();
  }

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact);
   }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

}