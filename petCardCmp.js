import { LightningElement,wire,track,api } from 'lwc';
import getallrecords from '@salesforce/apex/getPetRecords.getAllPetRecords';
import getavailrecords from '@salesforce/apex/getPetRecords.getAvailablePetRecords';
import getsoldrecords from '@salesforce/apex/getPetRecords.getSoldPetRecords';

export default class PetCardCmp extends LightningElement {
    @track pets;
    @track error;
    @track selectedPetId; 
    @track showAdoptionForm = false; 



    @api handleGetAllRecords(){
        getallrecords()   
        .then(result => {
                this.pets = result;
                this.error = undefined;
            })
            .catch(error => {
                this.pets = undefined;
                this.error = error.body.message;
            });
    }

    @api handleGetAvailRecords(){
        getavailrecords()   
        .then(result => {
                this.pets = result;
                this.error = undefined;
            })
            .catch(error => {
                this.pets = undefined;
                this.error = error.body.message;
            });

            
    }

    handleClickBUTTON(event){
        this.selectedPetId = event.target.dataset.id;
        this.showAdoptionForm = true;
    }
       

    @api handleGetSoldRecords(){
        getsoldrecords()
           .then(result => {
                this.pets = result;
                this.error = undefined;
            })
            .catch(error => {
                this.pets = undefined;
                this.error = error.body.message;
            });
    }




    

}