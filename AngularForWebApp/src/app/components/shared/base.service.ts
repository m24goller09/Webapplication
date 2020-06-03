import { throwError } from 'rxjs';

export abstract class BaseService {
	protected handleError(error: any) {
		//return throwError(error);
		/**
		 * TODO implement an actual error handler
		var applicationError = error.headers.get('Application-Error');

		// either application-error in header or model error in body
		if (applicationError) {
			return throwError(applicationError);
		}

		var modelStateErrors: string = '';

		// for now just concatenate the error descriptions, alternative we could simply pass the entire error response upstream
		for (var key in error.error) {
			if (error.error[key]) modelStateErrors += error.error[key].description + '\n';
		}

		modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
		return throwError(modelStateErrors || 'Server error');
		 **/

		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An client-error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError(
			'Something bad happened; please try again later.');
	};

}
