import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Contact } from '../models/Contact.model';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private ContactService: ContactService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hobbies: this.formBuilder.array([])
    });
}

onSubmitForm() {
  const formValue = this.contactForm.value;
  const newContact = new Contact(
    formValue['firstName'],
    formValue['lastName'],
    formValue['email'],
    formValue['hobbies'] ? formValue['hobbies'] : []
  );
  this.ContactService.addContact(newContact);
  this.router.navigate(['/contacts']);
}

getHobbies(): FormArray {
  return this.contactForm.get('hobbies') as FormArray;
}
onAddHobby() {
  const newHobbyControl = this.formBuilder.control(null, Validators.required);
  this.getHobbies().push(newHobbyControl);
}

}