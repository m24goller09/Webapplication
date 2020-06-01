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
		//Creating generic User-Object from manager-class
		this.manager.getUser().then(user => {
			this.user = user;
			this._authNavStatusSource.next(this.isAuthenticated());
		});
	}

	/**
	 * Redirects to the SignIn-Url stored in the User-Settings
	 */
	login() {
		return this.manager.signinRedirect();
	}

	/**
	 * function waiting for Signin-Response and updating Authentificationstatus of current User
	 */
	completeAuthentication() {
		return this.manager.signinRedirectCallback().then(user =>{
			this.user = user;
			this._authNavStatusSource.next(this.isAuthenticated());
		}).catch(error =>{
			this._authNavStatusSource.next(this.isAuthenticated());
			console.error(error);
		});
	}

	/**
	 * Sends POST-Request to authetification-server to create new Account.
	 * Contains Account-Data in Body
	 * @param userRegistration is a imported class that contains username/mail/password
	 */
	register(userRegistration: any) {
		return this.http.post(this.configService.authApiURI + '/account', userRegistration).pipe(catchError(this.handleError));
	}

	/**
	 * Outputs state-of-authentification for current User
	 * @return true when there is a user who has an accepted token
	 * @return false when there is no user or user has no token/ expired token
	 */
	isAuthenticated(): boolean {
		return this.user != null && !this.user.expired;
	}

	/**
	 * Get-function to access authorization-token
	 * @return token-type + token if available
	 * else redirect to login
	 */
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

	async signOut() {
		await this.manager.signoutRedirect();
	}

	/**
	 * Handels all GET-Requests beeing send to the Api-Url that require the access-token-validation
	 * The Access-Token is placed in the Request-Header
	 * @param call contains the specific url extention to perform the wanted GET-Request
	 */
	getFromApiWithToken(call: string) {
		const token: string = this.authorizationHeaderValue;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};
		return this.http.get(this.configService.resourceApiURI + call, httpOptions).pipe(catchError(this.handleError));
	}


	/**
	 * Handels all POST-Requests beeing send to the Api-Url that require the access-token-validation
	 * The Access-Token is placed in the Request-Header
	 * @param call  contains the specific url extention to perform the wanted POST-Request
	 * @param bodyData conatins Data that needs to be stored in the DB (optional)
	 */
	postToApiWithToken(call: string, bodyData?: any) {
		const token: string = this.authorizationHeaderValue;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
			body: bodyData
		};
		return this.http.post(this.configService.resourceApiURI + call,bodyData,httpOptions).pipe(catchError(this.handleError));
	}

	/**
	 * Handels all POST-Requests (without Body-Data to Post) beeing send to the Api-Url that require the access-token-validation
	 * The Access-Token is placed in the Request-Header
	 * @param call contains the specific url  extention to perfom the wanted POST-Request
	 */
	postToApiWithTokenNoBody(call: string) {
		const token: string = this.authorizationHeaderValue;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			})
		};
		return this.http.post(this.configService.resourceApiURI + call,null, httpOptions).pipe(catchError(this.handleError));
	}


	/**
	 * Handels all PUT-Requests beeing send to the Api-Url that require the access-token-validation
	 * The Acces-Token is placed in the Request-Header
	 * @param call contains the specific url extension to perfom the wanted POST-Request
	 * @param bodyData contains modified Data that needs to be edited in the DB
	 */
	putToApiWithToken(call:string, bodyData:any){
		const token: string = this.authorizationHeaderValue;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
			body: bodyData
		};
		return this.http.put(this.configService.resourceApiURI + call, bodyData, httpOptions).pipe(catchError(this.handleError));
	}

	/**
	 * @return Profile Data of current user, such as name/username
	 */
	getClaims(): any{
		return this.user != null ? this.user.profile : '';
	}
}

/**
 * Client-Settings to initialize new manager-object from wich current user gets generated.
 * @authority contains Authentification-Server Url
 * @redirect_uri manages which Route-Path gets called after finished Authority-Server-Redirect
 */
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
