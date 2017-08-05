import {Component, Inject} from '@angular/core';

import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'photo-preview',
  templateUrl: 'index.html'
})

export class PhotoPreviewDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
  }
}
