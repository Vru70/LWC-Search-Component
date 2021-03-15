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
import { LightningElement,api } from 'lwc';
import pubsub from 'c/pubsub'; 
import getRepair from '@salesforce/apex/returnAcc.getRepair';
export default class Coverage extends LightningElement 
{
    @api covdata;
    @api coverageName;
    @api resultRep;   
    @api result;
    @api repList;
    @api repairdata;
    @api error;
    @api repError;

    connectedCallback()
    {
        this.regiser();// here we are registering event 
    }

    regiser()
    {
        window.console.log('coverage_event registered ');
        pubsub.register('coverage_event', this.handleEvent.bind(this));
    }

    handleEvent(coveragedata)
    {
        window.console.log('coverage_event handled ',coveragedata);
        this.covdata = coveragedata;
    }
     
    handleContactClick(event)
    {
        // eslint-disable-next-line no-console
        this.coverageName =  event.currentTarget.id.slice(0, -4);
        console.log('Cuttent Target Name: '+  this.coverageName);

        getRepair({            
            coverageName:this.coverageName
            }).then(result =>{
                
            this.repairdata = result;                              
            /* eslint-disable-next-line no-console */
            console.log('Repair Result '+ JSON.stringify(result));
            this.repList= result;// contain list oof data
            window.console.log(' Repair Event Firing..... ');           
            pubsub.fire('repairevent', this.repList );
            // fire <- method which help to fire your event on 
            // simplevt -> is name of event that we need to fire and message is payload or data
            window.console.log('repairevent Fired '); 

            })
            .catch(error=>{
                this.repError = error;
                /* eslint-disable no-console */
                console.log('Repair Error'+  this.repError);

            });

    }
    
    
}