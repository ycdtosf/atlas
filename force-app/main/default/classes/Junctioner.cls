public with sharing class Junctioner {
    
    @AuraEnabled

    // junctionObjectName = 'CompPositionCandidate__c'
    // primaryObjectName = 'Contact'
    // relatedObjectName = 'CompPositionAssignment__c'
    // junctionPrimaryObjectFieldName = 'Contact__c'
    // junctionRelatedObjectFieldName = 'CompPositionAssignment__c'
    // primaryRecordId = '003ABC'
    // returnFields = 'CompPositionAssignment__r.Something__c'

    public static List<sObject> getRecords(
        String junctionObjectName, 
        String junctionPrimaryObjectFieldName,
        String primaryRecordId,
        String returnedFields
        ) {

        try {
            String soql = 'select Id, ' + returnedFields + ' from ' + junctionObjectName + ' where ' + junctionPrimaryObjectFieldName + ' = \'' + primaryRecordId + '\'';
            List<sObject> records = Database.query(soql);
            return records;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    public Junctioner() {

    }
}