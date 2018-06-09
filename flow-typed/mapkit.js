declare module 'mapkit' {
  declare export type MapKitFeatureVisibility =
    | 'adaptive'
    | 'hidden'
    | 'visible'
  declare export type MapKitMapType = 'hybrid' | 'satellite' | 'standard'

  declare type Padding = {
    //todo
  }
  declare type CoordinateRegion = {
    //todo
  }
  declare type MapRect = {
    //todo
  }
  declare type Annotation = {
    //todo
  }
  declare type ClusterAnnnotation = {
    //todo
  }
  declare type Overlay = {}

  declare type MapKitInitOptions = {
    language: string,
    authorizationCallback: (done: () => void) => void,
  }

  declare type MapConstructorOptions = {
    visibleMapRect?: MapRect,
    region?: CoordinateRegion,
    center?: CoordinateObject,
    rotation?: number,
    tintColor?: string,
    mapType?: MapKitMapType,
    padding?: Padding,
    showsMapTypeControl?: boolean,
    isRotationEnabled?: boolean,
    showsCompass?: MapKitFeatureVisibility,
    isZoomEnabled?: boolean,
    showsZoomControl?: boolean,
    isScrollEnabled?: boolean,
    showsScale?: MapKitFeatureVisibility,

    annotations?: Array<?Annotation>,
    annotationForCluster?: (ClusterAnnnotation) =>
      | ClusterAnnnotation
      | Annotation
      | void,
    selectedAnnotation?: ?Annotation,

    overlays?: Array<?Overlay>,
    selectedOverlay?: ?Overlay,
    showsPointsOfInterest?: boolean,

    showsUserLocation?: boolean,
    tracksUserLocation?: boolean,
    userLocationAnnotation?: ?Annotation,
    showsUserLocationControl?: boolean,

    element: HTMLElement,
  }

  declare type MapPoint = {
    x: number,
    y: number,

    copy: () => MapPoint,
    equals: (MapPoint) => boolean,
    toCoordinate: () => CoordinateObject,
  }

  declare type CoordinateObject = {
    latitude: number,
    longitude: number,

    copy: () => CoordinateObject,
    equals: (CoordinateObject) => boolean,
    toMapPoint: () => MapPoint,
    toUnwrappedMapPoint: () => MapPoint,
  }

  declare function Coordinate(
    latitude: number,
    longitude: number,
  ): CoordinateObject

  declare class Map {
    isRotationAvailable: boolean;
    isRotationEnabled: boolean;
    isScrollEnabled: boolean;
    isZoomEnabled: boolean;

    center: Coordinate;
  }

  declare class MapKit {
    init(MapKitInitOptions): void;
    Map(domId?: string, ?MapConstructorOptions): Map;
  }

  declare export default typeof MapKit
}
