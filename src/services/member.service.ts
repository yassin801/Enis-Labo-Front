import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from '../app/app-config';
import {Utils} from '../utils/utils';
import {Member} from '../models/memeber.model';
import {Evenement} from '../models/evenement.model';
import {Teacher} from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public placeholderMembers: Member[] = GLOBAL._DB.members;
  private headers  = new HttpHeaders({
    Authorization: 'Bearer '+localStorage.getItem('token')
  });

  constructor(
    private httpClient: HttpClient,
  ) {}


  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:9999/ms-member/membres',).toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getFullMemberById(id: string): Promise<Member> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return this.httpClient.get<Member>(`http://localhost:9999/ms-member/fullmember/${id}`).toPromise();
  }

  getMemberById(id: string): Promise<Member> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return this.httpClient.get<Member>(`http://localhost:9999/ms-member/fullmember/${id}`).toPromise();
  }

  getMemberbyCin(cin: string): Promise<Member> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return this.httpClient.get<Member>(`http://localhost:9999/ms-member/membre/search/cin/${cin}`).toPromise();
  }

  getMemberbyEMAIL(email: string): Promise<Member> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return this.httpClient.get<Member>(`http://localhost:9999/ms-member/membre/search/email/${email}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  createTeacher(member: any): Promise<Member> {
    console.log(this.headers);
    return this.httpClient.post<Member>(`http://localhost:9999/ms-member/membres/enseignant`, member,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}
        ).toPromise();

  }

  createStudent(member: any): Promise<Member> {
    console.log(member);
    return this.httpClient.post<Member>(`http://localhost:9999/ms-member/membres/etudiant`, member,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();

  }

  removeMemberById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    return this.httpClient.delete<void>(`http://localhost:9999/ms-member/membres/${id}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  getAllTeachers(): Promise<any[]> {
    return this.httpClient.get<any[]>('http://localhost:9999/ms-member/membres/teachers').toPromise();
  }

  getAllStudents(): Promise<any[]> {
    return this.httpClient.get<any[]>('http://localhost:9999/ms-member/membres/students').toPromise();
  }

  updateEtudiant(id: string, etudiant: any): Promise<Member>{
    return this.httpClient.put<Member>(`http://localhost:9999/ms-member/membres/etudiant/${id}`, etudiant,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}).toPromise();
  }

  updateTeacher(id: string, enseignant: any): Promise<Member>{
    return this.httpClient.put<Member>(`http://localhost:9999/ms-member/membres/enseignant/${id}`, enseignant,
      {headers: new HttpHeaders({
          Authorization: 'Bearer '+localStorage.getItem('token')
        })}
        ).toPromise();
  }

  getStudentByTeacher(id: string): Promise<any[]> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return this.httpClient.get<any[]>(`http://localhost:9999/ms-member/membre/studentbyteacher/${id}`).toPromise();
  }

}
