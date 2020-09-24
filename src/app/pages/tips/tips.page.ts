import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TipService } from 'src/app/services/tip.service';
import { TipFormComponent } from './tip-form/tip-form.component';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  constructor(private modalController: ModalController, private TipService : TipService) { }

  ngOnInit() {
    this.getAll();
  }

  async openDialogAddNew(data) {
    let modal = await this.modalController.create({
      component: TipFormComponent,
      componentProps: {
        data: data,
      }
    });
    modal.onDidDismiss().then(async res => {
      if (res.data) {

      }
    })
    await modal.present();
  }

  private getAll(){
    this.TipService.get().toPromise().then(res=>{
      console.log(res);
    })
  }
}
