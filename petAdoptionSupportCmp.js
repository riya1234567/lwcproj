import { LightningElement,track,api ,wire} from 'lwc';


export default class PetAdoptionSupportCmp extends LightningElement {
   
    handleAllClick(){
        this.template.querySelector("c-pet-card-cmp").handleGetAllRecords();
    }
    handleAdoptedClick(){
        this.template.querySelector("c-pet-card-cmp").handleGetSoldRecords();
    }
    handleForAdoptedClick(){
        this.template.querySelector("c-pet-card-cmp").handleGetAvailRecords();
    }
   
    
    }