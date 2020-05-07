import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';

import { BaseService } from "../../shared/base.service";
import { ConfigService } from '../../shared/config.service';
import {environment} from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService extends BaseService {

	// Observable navItem source
	private _authNavStatusSource = new BehaviorSubject<boolean>(false);
	// Observable navItem stream
	authNavStatus$ = this._authNavStatusSource.asObservable();

	private manager = new UserManager(getClientSettings());
	private user: User = null;

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

	completeAuthentication() {
		return this.manager.signinRedirectCallback().then(user =>{
			this.user = user;
			this._authNavStatusSource.next(this.isAuthenticated());
		}).catch(error =>{
			this._authNavStatusSource.next(this.isAuthenticated());
			console.error(error);
		});
	}

	register(userRegistration: any) {
		return this.http.post(this.configService.authApiURI + '/account', userRegistration).pipe(catchError(this.handleError));
	}

	isAuthenticated(): boolean {
		return this.user != null && !this.user.expired;
	}

	get authorizationHeaderValue(): string {
		if (this.user != null){
			return `${this.user.token_type} ${this.user.access_token}`;
		}
		// User is not logged in and tries to access to something => redirect to login
		this.login();
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

	getFromApiWithToken(call: string) {
		const token: string = this.authorizationHeaderValue;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};
		return this.http.get(this.configService.resourceApiURI + call, httpOptions).pipe(catchError(this.handleError));
		//return this.http.get(this.configService.resourceApiURI + '/Sample', httpOptions).pipe(catchError(this.handleError));
	}
	
	getClaims(): any{
		return this.user.profile;
	}
}

export function getClientSettings(): { showDebugInformation: boolean; loadUserInfo: boolean; metadata: { jwks_uri: string; end_session_endpoint: string; issuer: string; authorization_endpoint: string; userinfo_endpoint: string }; automaticSilentRenew: boolean; authority: string; scope: string; response_type: string; redirect_uri: string; post_logout_redirect_uri: string; silent_redirect_uri: string; client_id: string; filterProtocolClaims: boolean } {
	return {
		authority: 'https://promasauthserver.herokuapp.com/',
		client_id: 'angular_spa',
		redirect_uri: environment.home+'auth-callback/',
		post_logout_redirect_uri: environment.home,
		response_type: "id_token token",
		showDebugInformation: true,
		filterProtocolClaims: true,
		loadUserInfo: true,
		scope: "openid profile email api.read",
		automaticSilentRenew: true,
		silent_redirect_uri: environment.home+'silent-refresh.html',
		metadata: {
			issuer: 'https://promasauthserver.herokuapp.com/',
			jwks_uri: 'https://promasauthserver.herokuapp.com' + "/.well-known/openid-configuration/jwks",
			end_session_endpoint: 'https://promasauthserver.herokuapp.com' + "/connect/endsession",
			authorization_endpoint: 'https://promasauthserver.herokuapp.com' + "/connect/authorize",
			userinfo_endpoint: 'https://promasauthserver.herokuapp.com' + "/connect/userinfo",
		}
	};
}
