import {Pipe, PipeTransform} from '@angular/core';

import {Geo} from '../../models/geo';

@Pipe({name: 'geoHref'})
export class GeoHrefPipe implements PipeTransform {
  transform(geo: Geo): string {
    return `//maps.google.com/maps?ll=${geo.lat},${geo.lng}`;
  }
}
