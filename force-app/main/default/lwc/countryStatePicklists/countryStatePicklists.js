import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import callout from '@salesforce/apex/FlowCallout.callout'

export default class CountryStatePicklists extends LightningElement {
    
    /* TODOS

    - excluded countries (by name or iso)
    - deactivate states (aka countries only)


    */

    countryData = [];
    stateData = [];
    isCountriesLoading = false;
    isStatesLoading = false;

    @api selectedCountry;
    @api selectedCountryIso2;
    @api selectedCountryIso3;
    @api selectedState;
    @api selectedStateCode;
    @api countryPicklistLabel = 'Country';
    @api statePicklistLabel = 'State / Province';
    @api isCountryPicklistRequired = false; // true | false
    
    _layout = 1;
    get layout() {
        if(this._layout == 'One Column') return 1;
        else if(this._layout == 'Two Columns') return 2;
        return 1;
    }
    @api set layout(value) {
        if(value == null) return;
        this._layout = value;
    }

    _isStatePicklistRequired = false; // true | false
    get isStatePicklistRequired() {
        if(this.stateData.length === 0) return false;
        return this._isStatePicklistRequired;
    }
    @api set isStatePicklistRequired(value) {
        if(value == null) return;
        this._isStatePicklistRequired = value;
    }

    _countryLabelFormat = 'Name'; // "name", "iso2", "iso3"
    get countryLabelFormat() { 
        return this._countryLabelFormat.toLowerCase();
    }
    @api set countryLabelFormat(value) {
        if(value == null) return;
        this._countryLabelFormat = value;
    }

    _countryValueFormat = 'Name'; // "name", "iso2", "iso3"
    get countryValueFormat() { 
        return this._countryValueFormat.toLowerCase();
    }
    @api set countryValueFormat(value) {
        if(value == null) return;
        this._countryValueFormat = value;
    }

    _stateLabelFormat = 'Name'; // "name", "iso2", "iso3"
    get stateLabelFormat() { 
        if(this._stateLabelFormat === 'State Code') return 'code';
        return this._stateLabelFormat.toLowerCase();
    }
    @api set stateLabelFormat(value) {
        if(value == null) return;
        this._stateLabelFormat = value;
    }

    _stateValueFormat = 'Name'; // "name", "iso2", "iso3"
    get stateValueFormat() { 
        if(this._stateValueFormat === 'State Code') return 'code';
        return this._stateValueFormat.toLowerCase();
    }
    @api set stateValueFormat(value) {
        if(value == null) return;
        this._stateValueFormat = value;
    }

    get countryPicklistPlaceholder() {
        if(this.isCountriesLoading) return 'Loading Countries...';
        return 'Select a Country...';
    }
    
    get statePicklistPlaceholder() {        
        if(this.isCountriesLoading) return 'Loading Countries...';
        else if(this.selectedCountry == null) return 'Select a Country...';
        else if(this.isStatesLoading) return 'Loading States...';
        else if(this.stateData.length === 0) return 'No States in ' + this.selectedCountry + '...';
        else return 'Select a State...';
    }

    get columnCssClasses() {
        return 'slds-col slds-size_1-of-' + this.layout;
    }
    
    get countryOptions() {
        let options = [];
        this.countryData.forEach((country) => {
            options.push( { label : country[this.countryLabelFormat], value : country[this.countryValueFormat] } );
        });
        return options;
    }

    get isStatePicklistDisabled() {
        return this.selectedCountry == null || this.isStatesLoading || this.stateData.length === 0;
    }

    get isCountryPicklistDisabled() {
        return this.isCountriesLoading === true || this.countryData.length === 0;
    }

    get stateOptions() {

        let options = [];

        if(this.isCountriesLoading) {
            options.push( { label : 'Loading Countries...', value : '' } );
        }
        else if(this.isStatesLoading) {
            options.push( { label : 'Loading States...', value : '' } );
        }
        else if(this.selectedCountry == null) {
            options.push( { label : 'Select a Country...', value : '' } );
        }
        else {
            this.stateData.forEach((state) => {
                options.push( { label : state[this.stateLabelFormat], value : state[this.stateValueFormat] } );
            });
        }

        return options;
    }

    async getCountries() {

        this.isCountriesLoading = true;

        let output = await callout({
            namespace : null,
            flowName : 'Atlas_Get_Countries',
            inputVariables : null,
            outputVariableNames : 'countryData'
        });

        this.isCountriesLoading = false;

        this.countryData = output.countryData;

        // TODO: exclude countries filter....

        console.log(output);

        if(this.selectedCountry != null) this.onCountrySelected({
            detail : {
                value : this.selectedCountry
            }
        });

    }

    async getStates() {

        this.stateData = [];

        this.isStatesLoading = true;

        let output = await callout({
            namespace : null,
            flowName : 'Atlas_Get_States',
            inputVariables : {
                'country' : this.selectedCountry
            },
            outputVariableNames : 'statesJSON'
        });

        if(output.statesJSON != null) this.stateData = JSON.parse(output.statesJSON);

        this.isStatesLoading = false;

        console.log(output);
    }

    connectedCallback() {
        this.getCountries();
    }

    onCountrySelected(event) {
        this.selectedCountry = event.detail.value;
        this.selectedCountryIso2 = (this.countryData.find((country) => country.name === this.selectedCountry)).iso2;
        this.selectedCountryIso3 = (this.countryData.find((country) => country.name === this.selectedCountry)).iso3;
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedCountry', this.selectedCountry));
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedCountryIso2', this.selectedCountryIso2));
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedCountryIso3', this.selectedCountryIso3));
        this.selectedState = null;
        this.selectedStateCode = null;
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedState', this.selectedState));
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedStateCode', this.selectedStateCode));
        this.dispatchEvent(new CustomEvent("countryselected", { 
            detail: {
                name : this.selectedCountry,
                iso2 : this.selectedCountryIso2,
                iso3 : this.selectedCountryIso3,
            }
        }));

        // TODO: states deactivated check...

        this.getStates();
    }

    onStateSelected(event) {
        this.selectedState = event.detail.value;
        this.selectedStateCode = (this.stateData.find((state) => state.name === this.selectedState)).code;
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedState', this.selectedState));
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedStateCode', this.selectedStateCode));
        this.dispatchEvent(new CustomEvent("stateselected", { 
            detail: {
                name : this.selectedState,
                code : this.selectedStateCode
            }
        }));
    }

}