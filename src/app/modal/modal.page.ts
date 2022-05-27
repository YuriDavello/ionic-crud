import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Data, DataService } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  data: Data = null;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getDataById(this.id).subscribe((res) => {
      this.data = res;
    });
  }

  async updateData() {
    this.dataService.updateData(this.data);
    const toast = await this.toastCtrl.create({
      message: 'Data updated!',
      duration: 3000,
    });
    toast.present();
  }

  async deleteData() {
    await this.dataService.deleteData(this.data);
    this.modalCtrl.dismiss();
  }
}
