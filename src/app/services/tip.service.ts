import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Tip } from '../models/tip.model';
@Injectable()
export class TipService {
  private tipCollection: AngularFirestoreCollection<Tip>;

  constructor(public afs: AngularFirestore) {
    this.tipCollection = this.afs.collection<Tip>('tip');
  }


  get() {
    return this.tipCollection.snapshotChanges().pipe(
      map((actions: any[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    )
  }

  add(tip: Tip) {
    return this.tipCollection.add(tip);
  }

  update(tip: Tip) {
    return this.tipCollection.doc<Tip>(tip.id).update(tip);
  }

  getById(id: string) {
    return this.tipCollection.doc<Tip>(id).valueChanges();
  }

  delete(id: string) {
    return this.tipCollection.doc(id).delete();
  }

}