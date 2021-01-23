import {Publication} from './publication.model';
import {Evenement} from './evenement.model';
import {Tool} from './tool.model';

export interface Teacher {
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
  grade: string;
  etablissement: string;
}
