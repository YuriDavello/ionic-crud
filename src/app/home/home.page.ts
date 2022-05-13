import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((data) => {
      console.log('DATA:', data);
    });
  }
}
