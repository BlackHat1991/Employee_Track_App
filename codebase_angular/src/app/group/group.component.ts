import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from './group.component.service';
import { Subscription } from 'rxjs';
import { CustomerService } from '../customer/customer.component.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'group',
  templateUrl: './group.component.html'
})

export class GroupComponent {
    public localState: any;
    public customerList = [];
    public allCustomerList = [];
    public uploadSummeryFlag = false;
    public uploadSuccessFlag = false ;
    public loading: boolean;
    public customerEmptyRecords = false;
    public busy: Subscription;
    public errorMessage;
    public error;
    public saveError = false;
    public groupDetails;
    public deviceType;
    public associateType;
    public GroupFormFlag = false;
    public groupList= [];
    public validationFlag = true;
    public saveSuccess = false;
    public deleteSuccess = false;
    public deviceListSource: LocalDataSource;
    public settings = {};
    sub;
    groupId;
  
  constructor(public route: ActivatedRoute, public customerService: CustomerService, public groupService: GroupService) {
        this.deviceListSource = new LocalDataSource();
        this.settings = {
            edit: {
                editButtonContent: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;',
                confirmEdit: true,
                inputClass: 'form-control'
            },
            delete: {
                deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash"></i>',
                confirmDelete: true,
            },
            
            actions: {
                add: false,
                edit: true,
                delete: true,
                position: 'right'
            },
            mode: 'external',
            hideSubHeader : true,
            columns: {
                groupName: {
                    title: 'Group Name',
                },
                email: {
                    title: 'Email',
                },
                messageContent: {
                    title: 'Message'
                }
            }
        };
        this.deviceType = [
            {
                name: 'SMS',
				id: 1,
				value: 'sms'
			}, {
				name: 'Email',
				id: 2,
				value: 'email'
			}, {
				name: 'SMS & Email',
				id: 3,
				value: 'both'
			}];
        this.associateType = [
            {
				name: 'Customer',
				id: 1
			}, {
				name: 'Location',
				id: 2
			}];
  }
    
    /*
    * Method is used to fetch the customer dropdown values
    */
    getGroupList(): void {
            let currentState = this;
            this.groupService.getGroupList().subscribe(function(data){
                    currentState.groupList = data;
					currentState.groupList = currentState.groupList.filter(
						groupList => groupList.systemDelete != true);
                    currentState.deviceListSource.load(currentState.groupList);
                    if(currentState.groupId){
                        var tempgroup = currentState.groupList.filter(
                            groupDetailsList => groupDetailsList.id === currentState.groupId);
                        currentState.showGroupForm('Edit',tempgroup[0]);
                    }
            });
            
    }
  
    
  
  ngOnInit() {
      this.sub = this.route.queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.groupId= +params['groupId'] || 0;
      });
      this.getGroupList();
      this.getCustomers();
  }

    /*
    * This method calls when click ADD/EDIT the groupList records
    */
  showGroupForm(type, data){
        this.groupId = 0;
        window.location.href = '#/group';
            window.scroll(0, 0);
          let currentState = this;
          //currentState.index = 0;
	  
            if (type === 'add') {
                 this.GroupFormFlag = true; 
                currentState.groupDetails = {};
            } else {
                currentState.groupDetails = data;
                this.GroupFormFlag = true; 
            }     
  }
    
    /*
    * Method calls when onclick "Back" button
    */
    showImportForm() {
         this.uploadSummeryFlag = false;
         this.uploadSuccessFlag = false;
    }
  
    /*
    * This method is called on click of 'save'
    */
    saveGroup(){
        let currentState = this;
        currentState.loading = true;
        this.groupDetails.associated_type = 'customer';
        this.groupDetails.associated_key = JSON.parse(localStorage.getItem('dropDownCustomer'));
		if(this.formValidation(this.groupDetails)){ 
			this.busy = this.groupService.saveGroup(this.groupDetails).subscribe(function(data){
				currentState.getGroupList();
				currentState.GroupFormFlag = false;
                window.scroll(0, 0);
                currentState.saveSuccess = true;
                setTimeout(() => {              
                    currentState.saveSuccess = false;
                }, 3000);
			 });  
		} else {
			this.validationFlag = false;
                setTimeout(() => {              
                    this.validationFlag = true;
                }, 3000);
            }           
    }  

    /*
    * This method is called onclick "Back" button
    */
  cancel(){
      window.scroll(0, 0);
      this.GroupFormFlag = false;
      window.scroll(0, 0);
      this.getGroupList();
  }

  onChange(type) {     
            let currentState = this;
	  console.log(type);
	  if (type = 'Customer') {
		   this.customerEmptyRecords = true
		  }
    }

callMethod(){
        this.ngOnInit();
    }

formValidation(data) {
	this.errorMessage = '';
			this.validationFlag = true;
			if (data) {
                if(!data.groupName){
                    this.errorMessage += 'Please Enter Group Name <br/>';
					this.validationFlag = false;
                }
				if(!data.email){
                    this.errorMessage += 'Please Enter Group Email <br/>';
					this.validationFlag = false;
                }
				
			return this.validationFlag;
		};
	}

/*
* Method used to fecth the customer list
*/
 getCustomers(){
        let currentState = this;
        this.busy = this.customerService.getCustomers().subscribe(function(data){
            currentState.customerList = data;
            currentState.allCustomerList = currentState.customerList;
            if (data.length === 0){
                 currentState.customerEmptyRecords = true;
             }
        },
         (err => {
                this.saveError = true;
                this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
                if (this.error === undefined){
                    this.error = 'Backend Error Please Contact the Adminstrator';
                }
                setTimeout(() => {              
                    this.saveError = false;
                }, 3000);
            }));      
  }

  /*
  * this method is called Onclick of Delete     
  */
  deleteGroup(groupID) {
        document.getElementById('deleteGroup').style.display = 'none';
        let currentState = this;
        this.groupService.deleteGroup(groupID).subscribe(function(data){
            currentState.groupDetails = {};
            currentState.getGroupList();
            currentState.deleteSuccess = true;
                setTimeout(() => {              
                    currentState.deleteSuccess = false;
                }, 3000);
        }, (err) => {
              this.saveError = true;
              this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
              if (this.error === undefined) {
                  this.error = 'Backend Error Please Contact the Adminstrator';
              }
              setTimeout(() => {              
                  this.saveError = false;
              }, 3000);
          });
  }
    
    deleteConfirmation(group) {
       this.groupDetails =  group;
        document.getElementById('deleteGroup').style.display = 'block';
    }

    cancelDelete() {
       this.groupDetails =  {};
        document.getElementById('deleteGroup').style.display = 'none';
    }
      
}