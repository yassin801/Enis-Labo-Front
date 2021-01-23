import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Publication} from '../models/publication.model';
import {Tool} from '../models/tool.model';
import {Member} from '../models/memeber.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient: HttpClient) { }

  getAllPublications(): Promise<Publication[]> {
    return this.httpClient.get<Publication[]>('http://localhost:9999/ms-publication/publications').toPromise();
  }

  getPublicationById(id: string): Promise<Publication> {
    return this.httpClient.get<Publication>(`http://localhost:9999/ms-publication/publications/${id}`).toPromise();

  }

  updatePublication(publication: any): Promise<Publication> {
    console.log(publication);
    return this.httpClient.put<Publication>(`http://localhost:9999/ms-publication/publications/${publication.id}`, publication,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();

  }

  createPublication(publication: any): Promise<Publication> {
    console.log(publication);
    return this.httpClient.post<Publication>(`http://localhost:9999/ms-publication/publications`, publication,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();

  }

  removePublicationById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/ms-publication/publications/${id}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  getPublicationsMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:9999/ms-member/member/publication/getAuteurs/${id}`).toPromise();
  }

  addAuthorToPublication(idAuteur: number, idPublication: number): Promise<Member>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Member>(`http://localhost:9999/ms-member/member/publication/add`, {publication_id : idPublication, auteur_id: idAuteur},
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  removeAuthorFromPublication(idAuteur: number, idPublication: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/ms-member/member/publication/${idAuteur}/${idPublication}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  deleteMembrePublicationOfPublication(idPublication: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/ms-member/member/publication/delete/${idPublication}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  getAllPublicationsMembers(): Promise<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:9999/ms-member/member/publication/all/`).toPromise();
  }

  getPublicationsByMemberId(id: string): Promise<Publication[]> {
    return this.httpClient.get<Publication[]>(`http://localhost:9999/ms-member/member/publication/getPublication/${id}`).toPromise();
  }

}
