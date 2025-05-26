import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  standalone: false,
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    if (!this.lngLat) throw 'Las coordenadas no fueron encontradas';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false,
      accessToken:
        'pk.eyJ1IjoiYW5nZWxzYW50MDQiLCJhIjoiY204ZGhpM3h3MjE3dzJscTFxdTI2c2pwYSJ9.urNVsrc_ZjhAKFxJ7ASRNg',
    });

    const marker = new Marker({
      color: 'red',
    })
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }
}
