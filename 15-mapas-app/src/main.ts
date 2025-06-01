import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5nZWxzYW50MDQiLCJhIjoiY204ZGg5dzRoMTJldzJscHZwZzgzbWVzeSJ9.3ZloBNBxAslrjlx85NQaqA';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by this browser.');
  throw new Error('Geolocation is not supported by this browser.');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));
