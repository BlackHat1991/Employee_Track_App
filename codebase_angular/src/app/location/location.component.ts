import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { XLarge } from './x-large';
import { LocationService } from './location.component.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { UserService } from '../user/user.component.service';
import { CustomerService } from '../customer/customer.component.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'location',  
  templateUrl: './location.component.html'
})
export class LocationComponent {
  locationFormFlag = true;
  locationDetails = {};   
  public selectedCustomer; 
  filterDetails = {};    
  customerSelectValues = {};    
  locationList = [];
  allLocationList = []; 
  allLocation;
  allUserList;
  index;
  userData;
  selectedUserList;
  selectedUserListOption;
  selectedUserList2;
  optionsModel: number[];
  optionsModel1: number[];
  allCustomerList;
  validationFlag = true;
  errorMessage;
  saveError = false;
  emptyRecords = false;
  busy: Subscription;
  error;
  customer;
  customerList;
  locationSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default form-control',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px'
  };
   loactionTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select..',
  };

  constructor(public appState: AppState, public locationService : LocationService, public userService: UserService,public customerService : CustomerService) {
  }

  private selectedOptions: number[];

  private myOptions;

  private myOptions2;


  /*
  * this method is called for listing the location  
  */ 
  getLocation(){
      let currentState = this;
      this.busy = this.locationService.getLocation().subscribe(function(data){
          currentState.locationList = data;
          currentState.allLocationList = currentState.locationList;
          if (data.length === 0){
              currentState.emptyRecords = true;
            } else {
                currentState.emptyRecords = false;
            }
      },
        (err=> {
          this.saveError = true;
          this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
          if(this.error === undefined){
              this.error = 'Backend Error Please Contact the Adminstrator';
          }
          setTimeout(() => {              
              this.saveError = false;
          }, 3000);
      }));            
   }

  /*
  * On click of save this method is called    
  */
  saveLocation(location){
        let currentState = this;
        currentState.selectedUserList = [];
        currentState.selectedUserListOption = [];
        location.customer = this.selectedCustomer;
      
        if(this.formValidation(location,currentState.optionsModel,currentState.optionsModel1)){
                if (currentState.optionsModel) {	
                        for (let entry of currentState.optionsModel ) {	
                                this.userData = this.myOptions.filter(userList => userList.id === entry); 
                                currentState.selectedUserListOption.push(this.userData[0]);
                        }	
                }
	
                if (currentState.optionsModel1) {	
                        for (let entry of currentState.optionsModel1 ) {
                                this.userData = this.myOptions2.filter(userList => userList.id === entry); 
                                currentState.selectedUserListOption.push(this.userData[0]);
                        }	
                }
            
                for (let entry of currentState.selectedUserListOption ) {
                        this.userData = this.allUserList.filter(userList => userList.id === entry.parentId); 
                        currentState.selectedUserList.push(this.userData[0]);
                }
                location.users = currentState.selectedUserList;
                this.locationService.saveLocation(location).subscribe(function(data){
                        currentState.locationFormFlag = true;
                        currentState.locationDetails = {};
                        currentState.getLocation();
                        window.scroll(0, 0);
                },
               (err=> {
                    this.saveError = true;
                    this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
                    if(this.error === undefined){
                            this.error = 'Backend Error Please Contact the Adminstrator';
                    }
                    setTimeout(() => {              
                          this.saveError = false;
                        }, 3000);
                }));
            }else{
                this.validationFlag = false;
                setTimeout(() => {              
                    this.validationFlag = true;
                }, 3000);
            }
    }
  
  formValidation(data,optionsModel,optionsModel1) {
	this.errorMessage = '';
			this.validationFlag = true;
			if (data) {
                if(!data.customer){
                    this.errorMessage += 'Please Select Customer <br/>';
					this.validationFlag = false;
                }
				if (optionsModel.length === 0) {
					this.errorMessage += 'Please Select Customer Role <br/>';
					this.validationFlag = false;
				}
                if (optionsModel1.length === 0) {
					this.errorMessage += 'Please Select CSR Role <br/>';
					this.validationFlag = false;
				}
			return this.validationFlag;
		};
	}

  /*
  * This method is called for Add/Edit Location
  */
  showLocationForm(type, data){
        window.scroll(0, 0);
        let currentState = this;
        currentState.myOptions = [];
        currentState.myOptions2 = [];
        currentState.optionsModel = [];
        currentState.optionsModel1 = [];
        currentState.index = 0;
      
        for (let entry of currentState.allUserList ) {
		      if (entry.role === "CUSTOMER") {
			         currentState.myOptions.push({id: currentState.index+1, name: entry.firstName+ " " + entry.lastName,
									 parentId: entry.id});
		      }
		      if (entry.role === "CSR") {
			         currentState.myOptions2.push({id: currentState.index+1, name: entry.firstName+ " " +entry.lastName,
									parentId: entry.id});
		      }
            currentState.index ++;
        }
	  
        if (type === 'add') {
                this.locationFormFlag = false; 
                currentState.locationDetails = {};
		          this.selectedCustomer = null;
        } else {
		      if (data.users.length > 0) {
			         for (let entry of data.users ) {
				            if (entry.role === "CUSTOMER") {
					               currentState.userData = this.myOptions.filter(userList => userList.parentId === entry.id); 
					               if(currentState.userData.length>0) {
                                    currentState.optionsModel.push(currentState.userData[0].id);
                                    }
                                      
				            }
				            if (entry.role === "CSR") {
					               currentState.userData = this.myOptions2.filter(userList => userList.parentId === entry.id); 
					               if(currentState.userData.length>0) {
                                       currentState.optionsModel1.push(currentState.userData[0].id);
                                   }
				            }
                     }
		      }
                this.selectByName(data.customer.name);
                currentState.locationDetails = data;
                this.locationFormFlag = false; 
        }    
    }

  public selectByName(name: string) {
        this.selectedCustomer = this.allCustomerList.find(customer => customer.name === name);
  }

  /*
  * On this method is called to return all location names    
  */
  getAllLocationList() {
        let currentState = this;
        this.locationService.getAllLocation().subscribe(function(data){
                currentState.allLocation = data;
        },
        (err=> {
            this.saveError = true;
            this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
            if(this.error === undefined){
                this.error = 'Backend Error Please Contact the Adminstrator';
            }
            setTimeout(() => {              
                this.saveError = false;
            }, 3000);
        }));
    }

 onChangeFunction(newValue, type) {
      console.log(this.customerSelectValues);
  }
  

  /*
  * this method is called Onclick of Delete     
  */
  deleteLocation(locationID) {
        document.getElementById("deleteLocation").style.display = "none";
        let currentState = this;
        this.locationService.deleteLocation(locationID).subscribe(function(data){
            currentState.locationFormFlag = true;
            currentState.locationDetails = {};
            currentState.getLocation();
        },
        (err=> {
              this.saveError = true;
              this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
              if(this.error === undefined){
                  this.error = 'Backend Error Please Contact the Adminstrator';
              }
              setTimeout(() => {              
                  this.saveError = false;
              }, 3000);
          }));
  }

  /*
  * This method is called onclick "Back" button
  */
  cancel(){
      this.locationFormFlag = true;
      window.scroll(0, 0);
      this.getLocation();
  }

/*
* Method is called onchange of dropdown values and filter the Location list
*/
  onChange(newValue, type) {
      if (newValue != "") {
          this.locationList = this.allLocationList.filter(
          locationlist => locationlist.locationName === newValue); 
      } else {
          this.locationList = this.allLocationList;
      }
       
    this.locationList;
  }

  onChangeSelect() {
	 let current = this;
	  console.log("OPtion"+current.optionsModel);  
	 
  } 

  ngOnInit() {
        this.getLocation();
        this.getAllLocationList();
        this.getUsers();
        this.getCustomers();
  } 

  /*
  * this method is called for listing the user  
  */ 
  getUsers(){
         let currentState = this;
         this.userService.getUsers().subscribe(function(data){
             currentState.allUserList = data;		 
         },
        (err=> {
              this.saveError = true;
              this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
              if(this.error === undefined){
                  this.error = 'Backend Error Please Contact the Adminstrator';
              }
              setTimeout(() => {              
                  this.saveError = false;
              }, 3000);
          }));  
  }
/*
  * this method is called for listing the customer  
  */ 
 getCustomers(){
        let currentState = this;
        this.customerService.getCustomers().subscribe(function(data){
            currentState.allCustomerList = data;
        },
        (err=> {
              this.saveError = true;
              this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
              if(this.error === undefined){
                  this.error = 'Backend Error Please Contact the Adminstrator';
              }
              setTimeout(() => {              
                  this.saveError = false;
              }, 3000);
          }));
  }
    
     deleteConfirmation(location) {
       this.locationDetails =  location;
        document.getElementById("deleteLocation").style.display = "block";
    }

    cancelDelete() {
       this.locationDetails =  {};
        document.getElementById("deleteLocation").style.display = "none";
    }
}
