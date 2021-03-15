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
import { LightningElement , api} from 'lwc';
import pubsub from 'c/pubsub';
export default class Servicecontract extends LightningElement 
{
    @api serdata;
    
    
    connectedCallback()
    {
        this.regiser();// here we are registering event 
    }

    regiser()
    {
        window.console.log('service data event registered ');
        pubsub.register('sevice_event', this.handleEvent.bind(this));
    }

    handleEvent(servicedata)
    {
        window.console.log('Service Evengt handled ',servicedata);
        this.serdata = servicedata;
        // here accdata returning list hence we use for each loop
        var i;
        for(i in this.serdata)
        {
            window.console.log('key in obj : '+ this.serdata[i].Name );
            
        }
        
        
    }
     
    
}