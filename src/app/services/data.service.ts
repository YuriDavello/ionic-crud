import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Data {
  id?: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getData(): Observable<Data[]> {
    const dataRef = collection(this.firestore, 'datas');
    return collectionData(dataRef, { idField: 'id' }) as Observable<Data[]>;
  }

  getDataById(id): Observable<Data> {
    const dataDocRef = doc(this.firestore, `datas/${id}`);
    return docData(dataDocRef, { idField: 'id' }) as Observable<Data>;
  }

  addData(data: Data) {
    const dataRef = collection(this.firestore, 'datas');
    return addDoc(dataRef, data);
  }

  deleteData(data: Data) {
    const dataDocRef = doc(this.firestore, `datas/${data.id}`);
    return deleteDoc(dataDocRef);
  }

  updateData(data: Data) {
    const dataDocRef = doc(this.firestore, `datas/${data.id}`);
    return updateDoc(dataDocRef, { title: data.title, content: data.content });
  }
}
