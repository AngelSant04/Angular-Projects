import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  standalone: false,
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
      accessToken:
        'pk.eyJ1IjoiYW5nZWxzYW50MDQiLCJhIjoiY204ZGhpM3h3MjE3dzJscTFxdTI2c2pwYSJ9.urNVsrc_ZjhAKFxJ7ASRNg',
    });
  }
}
