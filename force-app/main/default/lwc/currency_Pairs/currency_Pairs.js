import { LightningElement, api, track} from 'lwc';
import getCurrencies from '@salesforce/apex/API_Call.getCurrencies';

export default class Currency_Pairs extends LightningElement {
    @api base
    @track ratesData = [];
    ratesDataRow = [];
    error

    perform () {
        getCurrencies ()
            .then(result => {
                const parsedResult = JSON.parse(result);
                this.base = parsedResult.base;
                var rates = parsedResult.rates;
                var i = 0;
                for(var key in rates){                   
                    this.ratesDataRow.push({value:rates[key], key:key});
                    i++;
                    if (i % 8 == 0) {
                        this.ratesData.push({value: this.ratesDataRow, key: i % 8 - 1});
                        this.ratesDataRow = [];
                    }
                }
            })
            .catch(error => {
                this.error = error;
            });
        this.ratesDataRow = [];
        this.ratesData = [];
    }

    connectedCallback () {
        this.perform();   
    }

    refresh () {
        this.perform();  
    }
}