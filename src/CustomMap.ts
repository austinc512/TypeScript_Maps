import { Loader } from '@googlemaps/js-api-loader';

const mapId: string = process.env.mapId as string;

// instructions to every other class
// on how they can be an argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap!: google.maps.Map;
  private libraries: { [key: string]: any } = {}; // Cache for loaded libraries
  private apiKey = process.env.apiKey as string;

  constructor(mapDivId: string, center = { lat: 0, lng: 0 }, zoom = 2) {
    // const loader = new Loader({
    //   apiKey: this.apiKey,
    //   version: 'weekly',
    // });
    this.initMap(mapDivId, center, zoom);

    // loader.load().then(async () => {
    // });
  }

  private async initMap(
    mapDivId: string,
    center: google.maps.LatLngLiteral,
    zoom: number
  ): Promise<void> {
    try {
      const loader = new Loader({
        apiKey: this.apiKey,
        version: 'weekly',
      });

      loader.load().then(async () => {
        const { Map } = (await google.maps.importLibrary(
          'maps'
        )) as google.maps.MapsLibrary;
        const mapElement = document.getElementById(mapDivId) as HTMLElement;
        this.googleMap = new Map(mapElement, {
          center,
          zoom,
          mapId,
        });
      });
    } catch (error) {
      console.error('Error initializing Google Map:', error);
    }
  }
  // 'marker' library can be used more than once.
  private async importLibrary(libraryName: string) {
    // check if loaded
    if (!this.libraries[libraryName]) {
      // If not, load and cache it
      this.libraries[libraryName] = await google.maps.importLibrary(
        libraryName
      );
    }
    // then return the cached library
    return this.libraries[libraryName];
  }

  async addMarker(mappable: Mappable): Promise<void> {
    const { AdvancedMarkerElement } = (await this.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;
    const marker = new AdvancedMarkerElement({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat || 0,
        lng: mappable.location.lng || 0,
      },
    });
    // console.log(mappable.location.lat);
    // console.log(mappable.location.lng);
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
