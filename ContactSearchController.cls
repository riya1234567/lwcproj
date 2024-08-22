public class ContactSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchKey) {
        if (String.isEmpty(searchKey)) {
            return new List<Contact>();
        }
        
        String searchPattern = '%' + searchKey + '%';
        return [SELECT Id, FirstName, LastName, Email FROM Contact WHERE (FirstName LIKE :searchPattern OR LastName LIKE :searchPattern)];
    }
}