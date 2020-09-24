import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Tip } from '../models/tip.model';
import { map } from 'rxjs/operators';
@Injectable()
export class TipService {
  private tipCollection: AngularFirestoreCollection<Tip>;

  constructor(public afs: AngularFirestore) {
    this.tipCollection = this.afs.collection<Tip>('tip');
  }


  get() {
    return this.tipCollection.snapshotChanges().pipe(
      map(actions => {
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