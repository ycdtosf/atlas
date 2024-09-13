import { LightningElement, api } from 'lwc';
import getRecords from '@salesforce/apex/Junctioner.getRecords';

export default class Junctioner extends LightningElement {

    @api recordId;
    @api title;
    @api junctionObjectName;
    @api junctionPrimaryObjectFieldName;
    @api primaryRecordId;
    @api returnedFields;
    @api returnedFieldLabels;
    @api isSelectable;
    @api renderSelectionAs; // 'checkboxes', 'picklists'
    @api recordTitleField;
    records;

    // junctionObjectName = 'CompPositionCandidate__c'
    // primaryObjectName = 'Contact'
    // relatedObjectName = 'CompPositionAssignment__c'
    // junctionPrimaryObjectFieldName = 'Contact__c'
    // junctionRelatedObjectFieldName = 'CompPositionAssignment__c'
    // primaryRecordId = '003ABC'
    // junctionRelatedObjectReturnFields

    connectedCallback() {
        this.getRecords();
    }

    get recordsJson() {
        return JSON.stringify(this.records);
    }

    async getRecords() {
        this.records = await getRecords({
            junctionObjectName : this.junctionObjectName,
            junctionPrimaryObjectFieldName : this.junctionPrimaryObjectFieldName,
            primaryRecordId : this.recordId,
            returnedFields : this.returnedFields
        });
    }



}