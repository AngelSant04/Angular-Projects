import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { Marker } from 'mapbox-gl';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private placesApi = inject(PlacesApiClient);
  private mapService = inject(MapService);
  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  public getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (error) => {
          console.error('Error getting user location:', error);
          reject(error);
        }
      );
    });
  }

  public getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if (!this.useLocation) throw new Error('User location is not ready');

    const url = `/${query}.json`;

    this.isLoadingPlaces = true;

    return this.placesApi
      .get<PlacesResponse>(url, {
        params: {
          proximity: this.useLocation.join(','),
        },
      })
      .subscribe((res) => {
        this.places = res.features;
        this.isLoadingPlaces = false;

        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }

  public deletePlaces() {
    this.places = [];
  }
}
