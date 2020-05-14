import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConfigService {

	constructor() { }

	get authApiURI() {
		return 'https://promasauthserver.herokuapp.com/api';
		//return 'https://localhost:5000/api';
	}

	get resourceApiURI() {
		return environment.server;
	}
}
