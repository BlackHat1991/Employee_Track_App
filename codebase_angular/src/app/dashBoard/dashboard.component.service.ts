import { Injectable } from '@angular/core';
import {Http, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../reusableComponents/app.settings';
import { CommonService } from '../reusableComponents/common.service';
import * as FileSaver from "file-saver";

@Injectable()
export class DashboardService {

constructor(public http: Http, public commonService: CommonService) {
}

    public getDeviceData (deviceId, unit, analogInputs): Observable<any> {
        let params = new URLSearchParams();
        params.set('deviceId', deviceId);
        params.set('unit', unit );
        params.set('analogInputs', analogInputs );
        return this.http.get(AppSettings.API_ENDPOINT + '/rest/deviceData/deviceDataByDeviceId',
                    { search: params }).map((response) => response.json())
                    .catch(this.handleError);
    }

    public generatePDF (script, deviceId, unit, id) {
        let params = new URLSearchParams();
        params.append('deviceId', deviceId);
        params.append('script', script);
        params.append('unit', unit);
        params.append('id', id);
        return this.http.post(AppSettings.API_ENDPOINT + '/rest/deviceData/generatePDF',
                    params, { responseType: ResponseContentType.Blob})
                        .subscribe((response) => {
                            var blob = new Blob([response['_body']], {type: 'application/pdf'});
                            FileSaver.saveAs(blob, 'dashboard.pdf');
        });
    }

    private extractData(res) {
        let body = res.json();
        return body || { };
    }

    private handleError (error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error) {
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
