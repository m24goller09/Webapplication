import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';

import { BaseService } from "../../shared/base.service";
import { ConfigService } from '../../shared/config.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService extends BaseService {

	// Observable navItem source
	private _authNavStatusSource = new BehaviorSubject<boolean>(false);
	// Observable navItem stream
	authNavStatus$ = this._authNavStatusSource.asObservable();

	private manager = new UserManager(getClientSettings());
	private user: User | null;

	constructor(private http: HttpClient, private configService: ConfigService) {
		super();

		this.manager.getUser().then(user => {
			this.user = user;
			this._authNavStatusSource.next(this.isAuthenticated());
		});
	}

	login() {
		return this.manager.signinRedirect();
	}

	async completeAuthentication() {
		this.user = await this.manager.signinRedirectCallback();
		this._authNavStatusSource.next(this.isAuthenticated());
	}

	register(userRegistration: any) {
		return this.http.post(this.configService.authApiURI + '/account', userRegistration).pipe(catchError(this.handleError));
	}

	isAuthenticated(): boolean {
		return this.user != null && !this.user.expired;
	}

	get authorizationHeaderValue(): string {
		return `${this.user.token_type} ${this.user.access_token}`;
	}

	get name(): string {
		return this.user != null ? this.user.profile.name : '';
	}

	get userName():string{
		return this.user != null ? this.user.profile.email : '';
	}

	async signout() {
		await this.manager.signoutRedirect();
	}

	fetchTopSecretData(token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};

		return this.http.get(this.configService.resourceApiURI + '/Project/ByUser/'+this.userName, httpOptions).pipe(catchError(this.handleError));
		//return this.http.get(this.configService.resourceApiURI + '/Sample', httpOptions).pipe(catchError(this.handleError));
	}
}

export function getClientSettings(): UserManagerSettings {
	return {
		authority: 'https://promasauthserver.herokuapp.com',
		//authority: 'https://localhost:5000',
		client_id: 'angular_spa',
		redirect_uri: 'http://localhost:4200/auth-callback',
		post_logout_redirect_uri: 'http://localhost:4200/',
		response_type: "id_token token",
		scope: "openid profile email api.read",
		filterProtocolClaims: true,
		loadUserInfo: true,
		automaticSilentRenew: true,
		silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
	};
}
