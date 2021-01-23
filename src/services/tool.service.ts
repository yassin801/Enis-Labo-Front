import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tool} from '../models/tool.model';
import {Evenement} from '../models/evenement.model';
import {Member} from '../models/memeber.model';


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private httpClient: HttpClient) { }

  getAllTools(): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>('http://localhost:9999/ms-outil/outils').toPromise();
  }

  getToolById(id: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`http://localhost:9999/ms-outil/outils/${id}`).toPromise();

  }

  updateTool(tool: any): Promise<Tool> {
    console.log(tool);
    return this.httpClient.put<Tool>(`http://localhost:9999/ms-outil/outils/${tool.id}`, tool,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();

  }

  createTool(tool: any): Promise<Tool> {
    console.log(tool);
    return this.httpClient.post<Tool>(`http://localhost:9999/ms-outil/outils`, tool,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();

  }

  removeToolById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/ms-outil/outils/${id}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  getToolsMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8081/member/outil/getUtilisateur/${id}`).toPromise();
  }

  addUserToTool(idUtilisateur: number, idOutil: number): Promise<Member>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Member>(`http://localhost:9999/ms-member/member/outil/add`, {outil_id : idOutil, utilisateur_id: idUtilisateur},
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  removeUserFromTool(idUtilisateur: number, idOutil: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/ms-member/member/outil/${idUtilisateur}/${idOutil}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  deleteMembreToolOfTool(idOutil: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/ms-member/member/outil/delete/${idOutil}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  getAllToolsMembers(): Promise<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8081//member/outil/all/`).toPromise();
  }

  getToolsByMemberId(id: string): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>(`http://localhost:8081//member/outil/getOutil/${id}`).toPromise();
  }

}
