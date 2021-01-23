import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Evenement} from '../models/evenement.model';
import {Utils} from '../utils/utils';
import {Member} from "../models/memeber.model";
import {Tool} from '../models/tool.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Promise<Evenement[]> {
    return this.httpClient.get<Evenement[]>('http://localhost:9999/ms-evenement/evenements').toPromise();
  }

  getEventById(id: string): Promise<Evenement> {
     return this.httpClient.get<Evenement>(`http://localhost:9999/ms-evenement/evenements/${id}`).toPromise();

  }

  updateEvent(event: any): Promise<Evenement> {
    console.log(event);
    return this.httpClient.put<Evenement>(`http://localhost:9999/ms-evenement/evenements/${event.id}`, event,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();

  }

  createEvent(event: any): Promise<Evenement> {
    console.log(event);
    return this.httpClient.post<Evenement>(`http://localhost:9999/ms-evenement/evenements`, event,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();

  }

  removeEventById(id: string): Promise<void> {
     return this.httpClient.delete<void>(`http://localhost:9999/ms-evenement/evenements/${id}`,
       {headers: new HttpHeaders({
           Authorization: 'Bearer '+localStorage.getItem('token')
         })}).toPromise();
    // this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }

  getEventsMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:9999/ms-member/member/event/getOrgs/${id}`).toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  addParticipantToEvent(idparticipant: number, idevent: number): Promise<Member>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Member>(`http://localhost:9999/ms-member/member/event/add`, {evenement_id : idevent, organisateur_id: idparticipant},
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  removeParticipantFromEvent(idparticipant: number, idevent: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/ms-member/member/event/${idparticipant}/${idevent}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  deleteMembreEventOfEvent(idevent: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/ms-member/member/event/delete/${idevent}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  getAllEventsMembers(): Promise<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:9999/ms-member/member/event/all/`).toPromise();
  }

  getEventsByMemberId(id: string): Promise<Evenement[]> {
    return this.httpClient.get<Evenement[]>(`http://localhost:9999/ms-member/member/event/getEvent/${id}`).toPromise();
  }

}
