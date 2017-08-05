import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'phoneHref'})
export class PhoneHrefPipe implements PipeTransform {
  transform(phone: string): string {
    return "tel:" + phone.split(" ")[0].replace(/[^0-9]/ig, "");
  }
}
