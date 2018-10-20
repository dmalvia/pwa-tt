import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BankService {

	constructor(private http: HttpClient) { }

	invokeBotMsgs(msg) {
		const uri = "https://bankconnect.herokuapp.com/bankservice";
		const obj = {
			query: msg
		};

		return this.http.post(uri, obj).map(res => { return res });
	}

}
