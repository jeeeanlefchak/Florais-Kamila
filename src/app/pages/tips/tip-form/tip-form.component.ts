import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Tip } from 'src/app/models/tip.model';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-tip-form',
  templateUrl: './tip-form.component.html',
  styleUrls: ['./tip-form.component.scss'],
})
export class TipFormComponent implements OnInit {
  @Input() data: Tip = new Tip();
  form: FormGroup;

  private loading: any;
  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private tipService: TipService) {
    this.form = this.formBuilder.group({
      id: [0],
      title: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      description: [null, Validators.compose([Validators.maxLength(1000)])],
      picture: [null],
      modifiedOn: [new Date()],
      createdOn: [new Date()],
    })
  }

  ngOnInit() {
    if (this.data) this.setValuesInForm(this.data);
  }

  async onSubmit() {
    await this.presentLoading();
    const value: Tip = this.form.value;
    if (value.id) {
      try {
        await this.tipService.update(value);
        await this.loading.dismiss();
      } catch {
        this.presentToast('Error ao salvar');
        await this.loading.dismiss();
      }
    } else {
      try {
        console.log("1")
        await this.tipService.add(value);
        console.log("2")
        await this.loading.dismiss();
        console.log("3")
      } catch {
        this.presentToast('Error ao salvar');
        await this.loading.dismiss();
      }
    }

  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  private setValuesInForm(item: Tip) {
    this.form.get('id').setValue(item.id);
    this.form.get('title').setValue(item.title);
    this.form.get('description').setValue(item.description);
    this.form.get('picture').setValue(item.picture);
    this.form.get('modifiedOn').setValue(item.modifiedOn);
    this.form.get('createdOn').setValue(item.createdOn);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
