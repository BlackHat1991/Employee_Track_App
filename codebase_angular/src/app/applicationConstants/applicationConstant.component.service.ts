import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { AppSettings } from '../reusableComponents/app.settings';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AppConstantService {
    
    private subject: Subject<boolean> = new Subject<boolean>();
  private selectedLineItem:any;
  private deviceList:any;
  private sensorsList:any;
  private lineItemData:any;
        
  currentState = {};
  constructor(public http: Http) {
    
  }    
	  
  getAllAppConstantsList (): Observable<any> {
	  return this.http.get(AppSettings.API_ENDPOINT + '/rest/appConstant/list')
					   .map(response => response.json())
					   .catch(this.handleError);
  }	  
	  
   saveAppConstant (data): Observable<any> {
	  return this.http.post(AppSettings.API_ENDPOINT + '/rest/appConstant/save', data)
			 .map(response => response.json())
			 .catch(this.handleError);
	}

	saveOrderList (data): Observable<any> {
	  return this.http.post(AppSettings.API_ENDPOINT+ '/rest/order/orderedItems', data)
                       .map(response => response.json())
					   .catch(this.handleError);
	}
    
    getDeviceTypeAppConstantList (): Observable<any> {
	  return this.http.get(AppSettings.API_ENDPOINT + '/rest/appConstant/getDeviceTypeList')
					   .map(response => response.json())
					   .catch(this.handleError);
    }
    
    getSensorsTypeAppConstantList (): Observable<any> {
	  return this.http.get(AppSettings.API_ENDPOINT + '/rest/appConstant/getSensorsTypeList')
					   .map(response => response.json())
					   .catch(this.handleError);
    }

    getInstallRateTypeAppConstantList (): Observable<any> {
	  return this.http.get(AppSettings.API_ENDPOINT + '/rest/appConstant/getInstallRateTypeList')
					   .map(response => response.json())
					   .catch(this.handleError);
    }
    
    getTaxRate (): Observable<any> {
	  return this.http.get(AppSettings.API_ENDPOINT + '/rest/appConstant/getTaxRate')
					   .map(response => response.json())
					   .catch(this.handleError);
    }

	getPayUParams (): Observable<any> {
	  return this.http.get(AppSettings.API_ENDPOINT + '/rest/appConstant/getPaymentParams')
					   .map(response => response.json())
					   .catch(this.handleError);
    }
    
    //Following code is added to set lineitem info to push to table.
    setDeviceInfo(data:any){
       this.subject.next(data);
    }
    
    //Following code is added to get lineitem info to push to table.
    getDeviceInfo(): Observable<any> {
        return this.subject.asObservable();
    }
    
    setDeviceTypeList(data:any){
        this.deviceList = data;
    }
    
    getDeviceTypeList(): Observable<any> {
        return this.deviceList;
    }
    
    setSensorsTypList(data:any){
        this.sensorsList = data;
    }
    
    getSensorsTypList(): Observable<any> {
        return this.sensorsList
    }
    
    /*setDeviceInfo(data:any){
        this.lineItemData = data;
    }
    
    getDeviceInfo(): Observable<any> {
        return this.lineItemData;
    }*/
      
   private extractData(res: Response) {
	  let body = res;
	  return body || { };
  }

  private handleError (error: Response | any) {
	  console.error(error);
	  return Observable.throw(error.json().error || 'Server error');
  } 

}