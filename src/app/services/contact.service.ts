import { Contact } from '../models/Contact.model';
import { Subject } from 'rxjs/Subject';
export class ContactService {

  private _jsonURL = 'assets/SampleJson.json';
  private contacts: Contact[] = [
    new Contact(0,'Rateb', 'Kefi', 'ratebkefidev@gmail.com', ['coder', 'boire du café']),
    new Contact(1,'Rateb1', 'Kefi1', 'ratebkefidev@gmail.com', ['coder', 'boire du café']),
    new Contact(2,'Rateb2', 'Kefi2', 'ratebkefidev@gmail.com', ['coder', 'boire du café']),
    new Contact(3,'Rateb3', 'Kefi3', 'ratebkefidev@gmail.com', ['coder', 'boire du café'])
];
  contactSubject = new Subject<Contact[]>();

  emitContacts() {
    this.contactSubject.next(this.contacts.slice());
  }

  addContact(contact: Contact) {
    contact.id = this.contacts[(this.contacts.length - 1)].id + 1;
    this.contacts.push(contact);
    this.emitContacts();
  }

  EditContact(contact: Contact) {
    console.log(contact);
    this.contacts.splice(contact.id,(contact.id)+1);
    this.contacts.push(contact);
    this.emitContacts();
  }


  deleteContact(contact: Contact) {
    this.contacts.splice(contact.id,(contact.id)+1);
    this.emitContacts();
  }

  getContactById(id: number) {
    const contact = this.contacts.find(
      (s) => {
        return s.id === id;
      }
    );
    return contact;
  }

 





  
}