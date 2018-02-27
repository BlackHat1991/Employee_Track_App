import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppSettings} from '../reusableComponents/app.settings';

@Injectable()
export class LocationService {
  currentState = {};
  
  constructor(public http: Http) {
    
  }

  getLocation(): Observable<any> {
    return this.http.get(AppSettings.API_ENDPOINT + '/rest/location/getAllLocation')
                       .map(response => response.json())
	  				   .catch(this.handleError);
  }
  
  getAllLocation(): Observable<any> {
    return this.http.get(AppSettings.API_ENDPOINT + '/rest/location/getAllLocationList')
                       .map(response => response.json())
	  				   .catch(this.handleError);
  }
  
  saveLocation (data): Observable<any> {
      return this.http.post(AppSettings.API_ENDPOINT+ '/rest/location/save', data)
              .map(response => response.json())
	  	      .catch(this.handleError);
  }
  
  deleteLocation (id): Observable<any> {
      return this.http.post(AppSettings.API_ENDPOINT+ '/rest/location/delete/'+ id, "")
            .map(response => response.json())
	  	    .catch(this.handleError);
  }
  
  private extractData(res: Response) {
      let body = res;
      return body || { };
  }
  
  private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Promise.reject(errMsg);
  }    
  
}