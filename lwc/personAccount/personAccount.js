/**
 * @description       : 
 * @author            : Vrushabh Uprikar
 * @group             : 
 * @last modified on  : 03-01-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log 
 * Ver   Date         Author             Modification
 * 1.0   03-01-2021   Vrushabh Uprikar   Initial Version
**/
import { api, LightningElement } from 'lwc';
import pubsub from 'c/pubsub';

export default class PersonAccount extends LightningElement 
{
    @api accdata;
    
    
    connectedCallback()
    {
        this.regiser();// here we are registering event 
    }

    regiser()
    {
        window.console.log('event registered ');
        pubsub.register('simplevt', this.handleEvent.bind(this));
    }

    handleEvent(messageFromEvt)
    {
        window.console.log('event handled ',messageFromEvt);
        this.accdata = messageFromEvt;

        // here accdata returning list hence we use for each loop
        var aa = JSON.stringify(this.accdata); 
        
    }
     
    
}