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
public inherited sharing class returnAcc 
{  
    
     

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccList(String accName, String vinNumb)
    {
            List<Account> listAcc = new List<Account>() ;
            String str ='%'+accName+'%';
            String num ='%'+vinNumb+'%';
            listAcc = [Select Id, Name , Email__c, BillingAddress, Phone, VIN_Number__c from 
            Account where Name like : str AND VIN_Number__c like : num limit 1];
            return listAcc;        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Service_Contract__c> getServiceContract(String accName)
    {
        String acc ='%'+accName+'%';
        List<Service_Contract__c> listServiceContract = [Select Id, Name,VIN_Number__c, Dealer_Address__c, Current_Odometer__c , Customer_Account__r.name 
        from Service_Contract__c Where Customer_Account__r.name like :acc];
        return listServiceContract;
        
    }
    //SELECT Description__c, Name, Service_Contract__c FROM Coverage__c WHERE Service_Contract__r.Name LIKE '%Servicing %'

    @AuraEnabled(cacheable=true)
    public static List<Coverage__c> getCoverage(String vinNumb)
    {
        String str ='%'+vinNumb+'%';
        List<Coverage__c> listContracts=[SELECT Description__c, Name, Service_Contract__r.Name FROM 
        Coverage__c WHERE Service_Contract__r.VIN_Number__c like: str];        
        return listContracts;
        
    }

    // by coverage name
    @AuraEnabled(cacheable=true)
    public static List<Repair__c> getRepair(String coverageName)
    {
        List<Repair__c> listRepair=[SELECT Name, Service_Contract__r.Name, Customer__r.Name, Coverage__r.Name,
        Description__c, Status__c FROM  Repair__c Where Coverage__r.Name =: coverageName];        
        return listRepair;
        
    }
}