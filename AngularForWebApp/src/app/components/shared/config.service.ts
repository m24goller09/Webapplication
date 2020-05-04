import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

	constructor() { }

	get authApiURI() {
		return 'https://promasauthserver.herokuapp.com/api';
		//return 'https://localhost:5000/api';
	}

	get resourceApiURI() {
		return 'http://localhost:5050';
	}
}
