# Atlas

The last Country and State Picklists you'll ever need, hopefully.

## Components

* Custom Metadata
    * Country.*.ms-meta.xml - Instances of Country__mdt (250+)
* Custom Objects
    * Country__mdt - stores country and related state/province details
        * Country__c - full name of Country
        * ISO2__c - ISO2 abbreviation of Country
        * ISO3__c - ISO3 abbreviation of Country
        * StatesJSON__c - JSON-formatted details of the related states / provinces
* Flows
    * Atlas : Get Countries - retrieves all Country metadata 
    * Atlas : Get States - retrieves State metadata for a Country
    * Country State Picklist Screen Flow Test - demo of countryStatePicklists in a Screen
* Flexipages
    * Country_State_Picklist_Test.flexipage-meta.xml - Two example instances of countryStatePicklists in a Lighting App Page 
* Layouts
    * Country__mdt-Country Layout.layout-meta.xml - Custom Metadata page layout.
* Lightning Web Components
    * countryStatePicklists - This is the component.
    * countryStatePicklistsSample - Demo of countryStatePicklists component.
* Permission Set Groups
    * Classes - Country Data - access to the CountryData data structure supporting the "Atlas Get Countries" flow.
    * Classes - FlowCallout - access to the FlowCallout apex class to dynamically call Flows.
* Permission Sets
    * Atlas User - all permission sets to use Country & States picklists.
* Tabs
    * Country_State_Picklist_Test.tab-meta.xml - tab for "Country State Picklist Test" flexipage
