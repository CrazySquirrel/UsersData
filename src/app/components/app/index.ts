import {Component} from '@angular/core';

import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})

export class AppComponent {
  constructor(public snackBar: MdSnackBar) {
    if (!navigator.onLine) {
      this.snackBar.open('Offline mode');
    }
  }
}
