# Atlas

The last Country and State Picklists you'll ever need, hopefully.

## Components

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

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


## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
