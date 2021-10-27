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

  //TODO: Refactor by passing the dates
  getWeeklyControlList(date_start: string, date_end: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `/weekly-collection/${date_start}/${date_end}/`);
  }

  getWeeklyCollection(date_start: string, date_end: string, id: string): Observable<WeeklyCollection[]> {
    return this.http.get<WeeklyCollection[]>(this.apiUrl + `/weekly-collection-list/${date_start}/${date_end}/${id}`);
  }

  addWeeklyCollection(WeeklyCollection: WeeklyCollection) {
    return this.http.post(this.apiUrl + '/weekly-collection-form/', WeeklyCollection);
  }

  updateWeeklyCollection(WeeklyCollection: WeeklyCollection) {
    return this.http.put(this.apiUrl + '/weekly-collection-form/', WeeklyCollection);
  }

  //week service

  getWeek(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/week/${id}`);
  }

  addWeek(week: Week) {
    return this.http.post(this.apiUrl + '/week/', week)
  }

  updateWeek(week: Week) {
    return this.http.put(this.apiUrl + '/week/', week);
  }

  deleteWeek(week: Week) {
    return this.http.delete(this.apiUrl + '/week/' + week.id);
  }

  getWeekPurchase(purchase: number): Observable<Week> {
    return this.http.get<Week>(this.apiUrl + `/week-purchase/${purchase}`);
  }

  getLastWeek(): Observable<Week> {
    return this.http.get<Week>(this.apiUrl + `/last-week/`);
  }

  getWeeks(product: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/weeks/${product}`);
  }

}
