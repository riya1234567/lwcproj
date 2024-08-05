import { LightningElement,track, wire, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.MobilePhone';
import STREET_FIELD from '@salesforce/schema/Contact.MailingStreet';
import CODE_FIELD from '@salesforce/schema/Contact.MailingPostalCode';
import CITY_FIELD from '@salesforce/schema/Contact.MailingCity';
import searchContacts from '@salesforce/apex/ContactSearchController.searchContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PetAdoptionFormCmp extends LightningElement {

    @api petId; 
    @api showForm; 
    @track errorMessage;
    @track successMessage;
    @track contact = {
        FirstName: '',
        LastName: '',
        Email: '',
        Phone:'',
        Street:'',
        Code:'',
        City:''
    };

    handleInputChangeButton(event) {
        const field = event.target.dataset.id;
        this.contact[field] = event.target.value;
    }  

    handleButtonTest() {
       
        this.showForm = false;
        const fields = {};
        fields[FIRST_NAME_FIELD.fieldApiName] = this.contact.FirstName;
        fields[LAST_NAME_FIELD.fieldApiName] = this.contact.LastName;
        fields[EMAIL_FIELD.fieldApiName] = this.contact.Email;
        fields[PHONE_FIELD.fieldApiName] = this.contact.Phone;
        fields[STREET_FIELD.fieldApiName] = this.contact.Street;
        fields[CODE_FIELD.fieldApiName] = this.contact.Code;
        fields[CITY_FIELD.fieldApiName] = this.contact.City;
        console.log('fields==>'+JSON.stringify(fields));
        

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
        console.log('outside==>'+JSON.stringify(recordInput));
        createRecord(recordInput)
            .then(contact => {
                console.log('con succ==>'+JSON.stringify(recordInput));
                this.successMessage = 'Contact saved successfully with ID: ' + contact.id;
                window.alert(JSON.stringify(this.successMessage));
                this.errorMessage = null;
                this.contact = { FirstName: '', LastName: '', Phone:'',Email:'', Street:'', Code:'', City:'' };
            })
            .catch(error => {
                console.log('con fail==>'+JSON.stringify(recordInput));
                this.successMessage = null;
                this.errorMessage = 'CHKError saving contact: ' + error.body.message;
                window.alert(JSON.stringify(this.errorMessage));
            });
    }

}