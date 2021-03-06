import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { AppSettings } from '../reusableComponents/app.settings';
import { CommonService } from '../reusableComponents/common.service';

@Injectable()
export class GroupService {
    headers;

constructor(public http: Http, public commonService: CommonService) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
}

getGroupList (): Observable<any> {
    let params = new URLSearchParams();
    params.set('userEmail', this.commonService.getUserEmail());
    return this.http.get(AppSettings.API_ENDPOINT + '/rest/group/fetchGroup',
        { search: params })
                    .map((response) => response.json())
                    .catch(this.handleError);
}

saveGroup (data): Observable<any> {
    return this.http.post(AppSettings.API_ENDPOINT+ '/rest/group/saveGroup', data)
                    .map(response => response.json())
                    .catch(this.handleError);
}

deleteGroup (id): Observable<any> {
      return this.http.post(AppSettings.API_ENDPOINT+ '/rest/group/delete/'+ id, "")
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