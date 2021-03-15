/**
 * @description       : 
 * @author            : Vrushabh Uprikar
 * @group             : 
 * @last modified on  : 03-02-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log 
 * Ver   Date         Author             Modification
 * 1.0   03-01-2021   Vrushabh Uprikar   Initial Version
**/
import { api, LightningElement } from 'lwc';
import pubsub from 'c/pubsub'; 
export default class Repair extends LightningElement 
{
    @api reqdata;
  

    connectedCallback()
    {
        this.regiser();// here we are registering event 
    }

    regiser()
    {
        window.console.log('repairevent registered ');
        pubsub.register('repairevent', this.handleEvent.bind(this));
    }

    handleEvent(repaireventdata)
    {
        window.console.log('repairevent handled ',repaireventdata);
        this.reqdata = repaireventdata;
        var aa = JSON.stringify(this.reqdata);
         // eslint-disable-next-line no-console
         console.log('data'+ aa);
    }

    
}