import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WeeklyControlService {
  readonly apiUrl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  //TODO: Refatorar passando as datas
  getWeeklyControlList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/weekly-collection-list/2021-09-27/2021-10-03/');
  }

}
