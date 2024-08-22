public class getPetRecords {
    @AuraEnabled(cacheable = true)
    public static list<pet__c> getAllPetRecords() {
      return[select Id,Name,Type__c,Birthday__c ,Color__c,Description__c,For_Adoption__c from pet__c ];
    }
    @AuraEnabled(cacheable = true)
    public static list<pet__c> getAvailablePetRecords() {
        return[select Id,Name,Type__c,Birthday__c ,Color__c,Description__c,For_Adoption__c from pet__c where For_Adoption__c = true  ];
      }
      @AuraEnabled(cacheable = true)
      public static list<pet__c> getSoldPetRecords() {
        return[select Id,Name,Type__c,Birthday__c ,Color__c,Description__c,For_Adoption__c from pet__c where For_Adoption__c = false ];
      }
}