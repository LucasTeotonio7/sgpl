import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Week, WeeklyCollection } from '../weekly-control-form/week.model';



@Injectable({
  providedIn: 'root'
})
export class WeeklyControlService {
  readonly apiUrl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  //TODO: Refatorar passando as datas
  getWeeklyControlList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/weekly-collection/2021-09-27/2021-10-03/');
  }

  getWeeklyCollection(id: string): Observable<WeeklyCollection[]> {
    return this.http.get<WeeklyCollection[]>(this.apiUrl + `/weekly-collection-list/${'2021-09-27'}/${'2021-10-03'}/${id}`);
  }

  addWeeklyCollection(WeeklyCollection: WeeklyCollection) {
    return this.http.post(this.apiUrl + '/weekly-collection-form/', WeeklyCollection);
  }

  updateWeeklyCollection(WeeklyCollection: WeeklyCollection) {
    return this.http.put(this.apiUrl + '/weekly-collection-form/', WeeklyCollection);
  }

  getWeek(purchase: number): Observable<Week> {
    return this.http.get<Week>(this.apiUrl + `/week/${purchase}`);
  }

  getLastWeek(): Observable<Week> {
    return this.http.get<Week>(this.apiUrl + `/last-week/`);
  }

}
