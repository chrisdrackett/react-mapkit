declare module 'mapkit' {
  declare type MapKitInitOptions = {
    language: string,
    authorizationCallback: (done: () => void) => void,
  }

  declare type MapConstructorOptions = {
    tintColor: string,
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
    center: Coordinate;
  }

  declare class MapKit {
    init(MapKitInitOptions): void;
    Map(domId?: string, ?MapConstructorOptions): Map;
  }

  declare export default typeof MapKit
}
