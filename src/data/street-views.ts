// Google Street View camera for each building: a point on the street out front,
// aimed at the entrance. Checked by eye against the address and building.

export type StreetViewCamera = {
  lat: number;
  lng: number;
  /** Compass direction the camera faces, in degrees. */
  heading: number;
  /** Degrees to tilt up, so taller buildings stay in frame. */
  pitch?: number;
};

export const streetViews: Record<string, StreetViewCamera> = {
  "morgan-hall": { lat: 39.978529, lng: -75.157902, heading: 100, pitch: 20 },
  "1300-residence-hall": { lat: 39.978459, lng: -75.156244, heading: 190 },
  "johnson-hardwick": { lat: 39.984148, lng: -75.156673, heading: 120, pitch: 15 },
  "white-hall": { lat: 39.985482, lng: -75.156386, heading: 279 },
  "temple-towers": { lat: 39.978281, lng: -75.154894, heading: 190 },
  "1940-residence-hall": { lat: 39.982824, lng: -75.155636, heading: 265 },
  "the-edge": { lat: 39.97805, lng: -75.15945, heading: 330, pitch: 20 },
  "the-view-at-montgomery": { lat: 39.979724, lng: -75.15367, heading: 190, pitch: 35 },
  vantage: { lat: 39.978523, lng: -75.154078, heading: 100, pitch: 25 },
  "oxford-village": { lat: 39.978529, lng: -75.159635, heading: 279 },
  "university-village": { lat: 39.978857, lng: -75.150831, heading: 100 },
  "temple-crossing": { lat: 39.983847, lng: -75.150019, heading: 189 },
  "kardon-atlantic": { lat: 39.98037, lng: -75.150442, heading: 100, pitch: 25 },
  "beech-international": { lat: 39.979081, lng: -75.160604, heading: 190 },
  "university-apartments": { lat: 39.97625, lng: -75.16013, heading: 270, pitch: 25 },
};

export function streetViewEmbedUrl({ lat, lng, heading, pitch = 12 }: StreetViewCamera) {
  return `https://www.google.com/maps/embed?pb=!6m7!1m6!2m2!1d${lat}!2d${lng}!3f${heading}!4f${pitch}!5f0.8`;
}
