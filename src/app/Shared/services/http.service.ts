import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
import { Constants } from '../models/common/constants.model';
import { ResponseMessage } from '../models/common/response.model';

export type HttpOptions = {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  get<T>(apiBase: string, path: string, obj?: any): Promise<ResponseMessage<T>> {
    return this.httpClient<T>(apiBase, path, Constants.API_METHODS.Get, obj);
  }

  post<T>(apiBase: string, path: string, obj?: any, options?: HttpOptions): Promise<ResponseMessage<T>> {
    return this.httpClient<T>(apiBase, path, Constants.API_METHODS.Post, obj, options);
  }

  put<T>(apiBase: string, path: string, obj?: any, options?: HttpOptions): Promise<ResponseMessage<T>> {
    return this.httpClient<T>(apiBase, path, Constants.API_METHODS.Put, obj, options);
  }

  delete<T>(apiBase: string, path: string, obj?: any): Promise<ResponseMessage<T>> {
    return this.httpClient<T>(apiBase, path, Constants.API_METHODS.Delete, obj);
  }

  private httpClient<T>(apiBase: string, path: string, method: any, obj?: any, options?: HttpOptions): Promise<ResponseMessage<T>> {
    let resul: Observable<ResponseMessage<T>>;
    try {
      switch (method) {
        case Constants.API_METHODS.Get:
          resul = this.http.get<ResponseMessage<T>>(`${apiBase}${path}`, { params: obj })
            .pipe(catchError(e => this.catchErrorCustom<T>(e)));
          break;
        case Constants.API_METHODS.Post:
          resul = this.http.post<ResponseMessage<T>>(`${apiBase}${path}`, obj, options)
            .pipe(catchError(e => this.catchErrorCustom<T>(e)));
          break;
        case Constants.API_METHODS.Put:
          resul = this.http.put<ResponseMessage<T>>(`${apiBase}${path}`, obj, options)
            .pipe(catchError(e => this.catchErrorCustom<T>(e)));
          break;
        case Constants.API_METHODS.Delete:
          resul = this.http.delete<ResponseMessage<T>>(`${apiBase}${path}`, { params: obj })
            .pipe(catchError(e => this.catchErrorCustom<T>(e)));
          break;
      }
    } catch (error) {
      if (error === 'No current user') {
        console.log('catch error no current user');
      }
      resul = new Observable((observer) => {
        observer.error('Ocurrio un error, inténtelo nuevamente.');
      });
    }
    return firstValueFrom(resul);
    //return lastValueFrom(resul);
  }

  private catchErrorCustom<T>(e: any) {
    if (typeof (e.error) === 'string') {
      // return throwError(e);
      return of(new ResponseMessage<T>(Constants.STATUS.Error, e.error));
    }
    return of(new ResponseMessage<T>(Constants.STATUS.Error, `Ocurrio un error, inténtelo nuevamente.`));
  }

}
