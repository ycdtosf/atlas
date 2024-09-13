import { LightningElement, api } from 'lwc';

export default class JunctionerRecord extends LightningElement {

    @api fields;
    @api labels;
    @api record;
    @api recordTitleField;

    get displayData() {
        
        let data = [];

        let fieldsArray = this.fields.replace(/ /g, '').split(',');
        let labelsArray = this.labels.replace(/,\s+(?=\w)/g, ',').split(',');

        for(let x = 0; x < fieldsArray.length; x++) {
            let field = fieldsArray[x];
            let label = labelsArray[x];
            data.push({
                label : label,
                value : this.getFieldValue(this.record, field)
            });
        }

        return data;

    }

    get displayDataJson() {
        return JSON.stringify(this.displayData);
    }

    // locates a field on an object, traverse the relationship fields if needed 
    getFieldValue(o, field) {

        // easy mode: the object has the field, so just return it
        if(o.hasOwnProperty(field)) return o[field];

        // harder mode: check if the object has a property that is the first element in the relationship references
        let nextFieldCheck = field.split('.')[0];

        if(o.hasOwnProperty(nextFieldCheck)) {

            // Find the first instance of the period
            let firstPeriodIndex = field.indexOf(".");  

            if (firstPeriodIndex !== -1) {
                // Extract the substring after the first period
                let result = field.substring(firstPeriodIndex + 1);  
                // continue traversing
                return this.getFieldValue(o[nextFieldCheck], result)
            }
            
        }

        return null;

    }

}