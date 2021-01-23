import {Publication} from './publication.model';
import {Evenement} from './evenement.model';
import {Tool} from './tool.model';
import {Teacher} from './teacher.model';

export interface Member {
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  date: string;
  photo: any;
  cv: string;
  email: string;
  password: string;
  pubs: Publication[];
  evnts: Evenement[];
  outils: Tool[];
  dateInscription: string;
  diplôme: string;
  encadrant: Teacher;
  grade: string;
  etablissement: string;
}
