import { Component } from '@angular/core';
import {StorageServiceService} from './services/storage-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularManualStorageChangeWatcher';
    constructor(private StorageService: StorageServiceService) {
    }

    ngOnInit(): void {
        localStorage.setItem('MyName', "Vetriselvan");
        console.log(localStorage.getItem('MyName'));
        localStorage.setItem('MyName', "Vetri");

    }
}
