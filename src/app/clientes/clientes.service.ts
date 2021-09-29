import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption} from '../shared/request-util';
import {ICliente} from './clientes.models';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public resourceUrl = SERVER_API_URL + 'api/clientes';

  constructor(private http: HttpClient) { }

  findAll(filter: any): Observable<HttpResponse<any>> {
    filter['order'] = filter['order'] ? filter['order'] : ['nombre', 'ASC'];
    const options = createRequestOption(filter);
    return this.http.get<any>(`${this.resourceUrl}`, {params: options, observe: 'response'});

  }
}
