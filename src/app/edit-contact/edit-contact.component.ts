import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Contact } from '../models/Contact.model';
import { Subscription } from 'rxjs/Subscription';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private ContactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) { }
    
    
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    hobbies: string[] = [];
    


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.firstName = this.ContactService.getContactById(+id).firstName;
    this.lastName = this.ContactService.getContactById(+id).lastName;
    this.email = this.ContactService.getContactById(+id).email;
    this.hobbies = this.ContactService.getContactById(+id).hobbies;

    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName , Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      hobbies: this.formBuilder.array(this.hobbies)
    });
  }


  onSubmitForm() {
    const formValue = this.contactForm.value;
    const newContact = new Contact(
      this.route.snapshot.params['id'],
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['hobbies'] ? formValue['hobbies'] : []
    );
    this.ContactService.EditContact(newContact);
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
