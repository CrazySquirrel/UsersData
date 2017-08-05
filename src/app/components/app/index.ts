import {Component} from '@angular/core';

import {MdIconRegistry} from '@angular/material';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})

export class AppComponent {
  constructor(public mdIconRegistry: MdIconRegistry,
              public snackBar: MdSnackBar) {
    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    if (!navigator.onLine) {
      this.snackBar.open('Offline mode');
    }
  }
}
