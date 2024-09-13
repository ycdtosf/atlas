import { LightningElement } from 'lwc';

export default class CountryStatePicklistsSample extends LightningElement {
    handleCountrySelected(e) {
        console.log(e);
    }
    handleStateSelected(e) {
        console.log(e);
    }
}