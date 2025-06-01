import { inject, Injectable } from '@angular/core';
import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/direction';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private makers: Marker[] = [];
  private map?: Map;
  private directionsApi = inject(DirectionsApiClient);

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw new Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords,
      // essential: true,
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw new Error('El mapa no está inicializado');

    this.makers.forEach((marker) => marker.remove());

    const newMarkes = [];

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Popup().setHTML(
        `<h6>${place.text}</h6><span>${place.place_name}</span>`
      );

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkes.push(newMarker);
    }

    this.makers = newMarkes;

    if (places.length === 0) return;

    // Limites del mapa
    const bounds = new LngLatBounds();
    newMarkes.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200,
    });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    if (!this.map) throw new Error('El mapa no está inicializado');

    return this.directionsApi
      .get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`, {})
      .subscribe((response) => this.drawPolyline(response.routes[0]));
  }

  private drawPolyline(route: Route) {
    if (!this.map) throw new Error('El mapa no está inicializado');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds(bounds, {
      padding: 200,
    });

    //Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };
    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map?.addSource('RouteString', sourceData);
    this.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#3b9ddd',
        'line-width': 3,
      },
    });
  }
}
