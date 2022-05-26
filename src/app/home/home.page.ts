import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  datas = [];
  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.dataService.getData().subscribe((data) => {
      this.datas = data;
    });
  }

  async openData(data) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: data.id },
      breakpoints: [0, 0.52, 0.8],
      initialBreakpoint: 0.52,
    });
    modal.present();
  }

  async addData() {
    const alert = await this.alertCtrl.create({
      header: 'Add Fun Faction',
      inputs: [
        { name: 'title', placeholder: 'Title', type: 'text' },
        { name: 'content', placeholder: 'Fun Fact', type: 'textarea' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: (data) => {
            this.dataService.addData({
              title: data.title,
              content: data.content,
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
