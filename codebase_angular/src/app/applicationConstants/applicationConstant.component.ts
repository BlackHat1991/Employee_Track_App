import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { XLarge } from './x-large';
import { AppConstantService } from './applicationConstant.component.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'applicationConstants',
    templateUrl: './applicationConstant.component.html'
})

export class AppConstantComponent {
    appConstantFormFlag = true;
    allAppConstants = [];
    appConstantDetails = {};
    saveError = false;
    emptyRecords = false;
    busy: Subscription;
    error;
    constructor(public appState: AppState, public appConstantService: AppConstantService) {
    }

    /*
    * this method is called for listing the AppConstants
    */
    getAllAppConstantsList() {
      let currentState = this;
        this.busy = this.appConstantService.getAllAppConstantsList().subscribe(function(data) {
            currentState.allAppConstants = data;
            if (data.length === 0) {
                currentState.emptyRecords = true;
            } else {
                currentState.emptyRecords = false;
            }
        },(err => {
            this.saveError = true;
            this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
            if (this.error === undefined) {
                this.error = 'Backend Error Please Contact the Adminstrator';
            }
            setTimeout(() => {
                this.saveError = false;
            }, 3000);
        }));
    }
 
    /*
    * This method is called onclick Add/Edit Appconstant
    */
    showAppConstantForm(type, data) {
        window.scroll(0, 0);
        let currentState = this;
        if (type === 'add') {
            this.appConstantFormFlag = false;
            currentState.appConstantDetails = {};
        } else {
            currentState.appConstantDetails = data;
            this.appConstantFormFlag = false;
        }
    }
    
    /*
    * This method is called onclick "Back" button
    */
    cancel() {
        window.scroll(0, 0);
        this.appConstantFormFlag = true;
        this.getAllAppConstantsList();
    }
    
    /*
    * This method is called for save appConstant
    */
    saveAppConstant(appConstant) {
        let currentState = this;
        this.appConstantService.saveAppConstant(appConstant).subscribe(function(data) {
            currentState.appConstantFormFlag = true;
            currentState.appConstantDetails = {};
            currentState.getAllAppConstantsList();
            window.scroll(0, 0);
        },(err => {
            this.saveError = true;
            this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
            if (this.error === undefined) {
                this.error = 'Backend Error Please Contact the Adminstrator';
            }
            setTimeout(() => {           
                this.saveError = false;
            }, 3000);
        }));
    }
  
    ngOnInit() {
        this.getAllAppConstantsList();
      }
  }
