import {Component} from '@angular/core';

import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class AppComponent {
  constructor(public mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
