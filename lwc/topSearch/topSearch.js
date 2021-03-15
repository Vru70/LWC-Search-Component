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
import getServiceContract from '@salesforce/apex/returnAcc.getServiceContract';
import getAccList from '@salesforce/apex/returnAcc.getAccList';
import getCoverage from '@salesforce/apex/returnAcc.getCoverage';
import pubsub from 'c/pubsub';

export default class TopSearch extends LightningElement 
{
    inpVIN;
    inpAccount;
    result;
    error;
    result1;
    error1;
    resultCover;
    errorCover;
    @api accList;
    @api accError;
    @api accdata;
    @api serviceList;
    @api serviceError;
    @api servicedata;
    @api coverageList;
    @api coverageError;
    @api coveragedata;


    
    handleVIN(event)                                                    // getting VIN Number
    {
        this.inpVIN = event.target.value;
        
    }

    handleAcc(event)                                                    // getting Account name
    {
        this.inpAccount = event.target.value;
        
    }

    handleSearch()
    {
        // eslint-disable-next-line no-console
        // display both value after search button click

        console.log("this.inpVIN: ", this.inpVIN);
        console.log("this.inpAccount: ", this.inpAccount);
        // calling getAccList Apex method and collecting data in  accList
        getAccList({
            
            accName:this.inpAccount,
            vinNumb:this.inpVIN
            }).then(result =>{
                
            this.accdata = result;                              
            /* eslint-disable-next-line no-console */
            console.log('Account Result '+ JSON.stringify(result));
            this.accList= result;// contain list oof data
            window.console.log('Event Firing..... ');           
            pubsub.fire('simplevt', this.accList );
            // fire <- method which help to fire your event on 
            // simplevt -> is name of event that we need to fire and message is payload or data
            window.console.log('Event Fired '); 

            })
            .catch(error=>{
                this.accError = error;
                /* eslint-disable no-console */
                console.log('Account Error'+  this.accError);

            });

        getServiceContract({
                accName:this.inpAccount
            }).then(result1 =>{
                
                this.servicedata = result1;                              
                /* eslint-disable-next-line no-console */
                console.log('Service Result '+ JSON.stringify(result1));
                this.serviceList= result1;// contain list of data
                window.console.log('sevice_event Firing..... ');           
                pubsub.fire('sevice_event', this.serviceList );
                // fire <- method which help to fire your event on 
                // simplevt -> is name of event that we need to fire and message is payload or data
                window.console.log('sevice_event Fired '); 
    
                })
                .catch(error1=>{
                    this.serviceError = error1;
                    /* eslint-disable no-console */
                    console.log('sevice_event Error'+  this.serviceError);
    
                });
                    
        getCoverage({
            vinNumb:this.inpVIN
        }).then(resultCover =>{
                
            this.servicedata = resultCover;                              
            /* eslint-disable-next-line no-console */
            console.log('coverage_event Result '+ JSON.stringify(resultCover));
            this.coverageList= resultCover;// contain list of data
            window.console.log('coverage_event Firing..... ');           
            pubsub.fire('coverage_event', this.coverageList );
            // fire <- method which help to fire your event on 
            // simplevt -> is name of event that we need to fire and message is payload or data
            window.console.log('coverage_event Fired '); 

            })
            .catch(errorCover=>{
                this.coverageError = this.errorCover;
                /* eslint-disable no-console */
                console.log('coverage_event Error'+  this.coverageError);

            });

    }

    
    
}