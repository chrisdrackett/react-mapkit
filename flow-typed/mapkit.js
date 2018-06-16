declare module 'mapkit' {
  declare type FeatureVisibilityAdaptive = 'adaptive'
  declare type FeatureVisibilityHidden = 'hidden'
  declare type FeatureVisibilityVisible = 'adaptive'

  declare export type FeatureVisibility =
    | FeatureVisibilityAdaptive
    | FeatureVisibilityHidden
    | FeatureVisibilityVisible
  declare export type MapType = 'hybrid' | 'satellite' | 'standard'
  declare export type PaddingOptions = {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,
  }
  declare export type MapShowItemsOptions = {
    animate?: boolean,
    padding?: Padding,
    minimumSpan?: CoordinateSpan,
  }

  declare type CollisionModeCircle = 'circle'
  declare type CollisionModeRectangle = 'rectangle'
  declare type CollisionMode = CollisionModeCircle | CollisionModeRectangle

  declare type Callout = (annotation: Annotation) => HTMLElement

  declare type ImageUrl = {
    '1': string,
    '2'?: string,
    '3'?: string,
  }

  declare type ClusterAnnnotation = {
    //todo
  }
  declare type Overlay = {
    //todo
  }
  declare type TileOverlay = {
    //todo
  }
  declare type BoundingRegion = {
    //todo
  }

  declare type MapKitInitOptions = {
    language?: string,
    authorizationCallback: (done: (token: string) => void) => void,
  }

  declare type AnnotationForCluster = (
    ClusterAnnnotation,
  ) => ClusterAnnnotation | Annotation | void

  declare type AnnotationArray = Array<?Annotation>
  declare type OverlayArray = Array<?Overlay>
  declare type TileOverlayArray = Array<?TileOverlay>

  declare export type MapConstructorOptions = {
    visibleMapRect?: MapRect,
    region?: CoordinateRegion,
    center?: Coordinate,
    rotation?: number,
    tintColor?: string,
    mapType?: MapType,
    padding?: Padding,
    showsMapTypeControl?: boolean,
    isRotationEnabled?: boolean,
    showsCompass?: FeatureVisibility,
    isZoomEnabled?: boolean,
    showsZoomControl?: boolean,
    isScrollEnabled?: boolean,
    showsScale?: FeatureVisibility,

    annotations?: AnnotationArray,
    annotationForCluster?: AnnotationForCluster,
    selectedAnnotation?: ?Annotation,

    overlays?: OverlayArray,
    selectedOverlay?: ?Overlay,
    showsPointsOfInterest?: boolean,

    showsUserLocation?: boolean,
    tracksUserLocation?: boolean,
    userLocationAnnotation?: ?Annotation,
    showsUserLocationControl?: boolean,

    element?: HTMLElement,
  }

  declare export type AnnotationConstructorOptions = {
    data?: {},
    title?: string,
    subtitle?: string,
    anchorOffset?: DOMPoint,
    appearanceAnimation?: string,
    displayPriority?: number,
    size?: { width: number, height: number },
    visible?: boolean,

    animates?: boolean,
    draggable?: boolean,
    enabled?: boolean,
    selected?: boolean,

    callout?: (annotation: Annotation) => HTMLElement,
    calloutEnabled?: boolean,
    calloutOffset?: DOMPoint,

    clusteringIdentifier?: string,
    collisionMode?: CollisionMode,

    accessibilityLabel?: string,
  }

  declare export type ImageAnnotationConstructorOptions = AnnotationConstructorOptions & {
    url: ImageUrl,
  }

  declare export type MarkerAnnotationConstructorOptions = AnnotationConstructorOptions & {
    color?: string,
    glyphColor?: string,
    glyphImage?: ImageUrl,
    glyphText?: string,
    selectedGlyphImage?: ImageUrl,
    subtitleVisibility?: FeatureVisibility,
    titleVisibility?: FeatureVisibility,
  }

  declare export class MapPoint {
    x: number;
    y: number;

    copy: () => MapPoint;
    equals: (MapPoint) => boolean;
    toCoordinate: () => Coordinate;
  }

  declare export class MapSize {
    width: number;
    height: number;

    copy: () => MapSize;
    equals: (MapSize) => boolean;
  }

  declare export class MapRect {
    origin: MapPoint;
    size: MapSize;

    maxX: () => number;
    maxY: () => number;

    midX: () => number;
    midY: () => number;

    minX: () => number;
    minY: () => number;

    copy: () => MapRect;
    equals: (MapRect) => boolean;

    scale: (scaleFactor: number, scaleCenter: MapPoint) => MapRect;
    toCoordinateRegion: () => CoordinateRegion;
  }

  declare export class Coordinate {
    latitude: number;
    longitude: number;

    copy: () => Coordinate;
    equals: (Coordinate) => boolean;
    toMapPoint: () => MapPoint;
    toUnwrappedMapPoint: () => MapPoint;
  }

  declare export class CoordinateSpan {
    latitudeDelta: number;
    longitudeDelta: number;

    copy: () => CoordinateSpan;
    equals: (CoordinateSpan) => boolean;
  }

  declare export class CoordinateRegion {
    center: Coordinate;
    span: CoordinateSpan;

    copy: () => CoordinateRegion;
    equals: (CoordinateRegion) => boolean;
    toBoundingRegion: () => BoundingRegion;
    toMapRect: () => MapRect;
  }

  declare class Padding {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }

  declare class DOMPoint {
    x: number;
    y: number;
  }

  declare export class Annotation {
    coordinate: Coordinate;

    data: {};
    title: ?string;
    subtitle: ?string;

    anchorOffset: DOMPoint;
    appearanceAnimation: ?string;
    displayPriority: number;
    size: MapSize;
    visible: boolean;

    animates: boolean;
    draggable: boolean;
    selected: boolean;
    enabled: boolean;

    map: Map;
    element: HTMLElement;

    callout: Callout;
    calloutEnabled: boolean;
    calloutOffset: DOMPoint;

    memberAnnotations: Array<?Annotation>;
    clusteringIdentifier: string;
    collisionMode: CollisionMode;

    accessibilityLabel: string;

    DisplayPriority: {
      High: 750,
      Low: 250,
      Required: 1000,
    };
    CollisionMode: {
      Circle: CollisionModeCircle,
      Rectangle: CollisionModeRectangle,
    };
  }

  declare export class Map {
    isRotationAvailable: boolean;
    isRotationEnabled: boolean;
    isScrollEnabled: boolean;
    isZoomEnabled: boolean;

    center: Coordinate;
    setCenterAnimated: (Coordinate, ?boolean) => void;

    region: CoordinateRegion;
    setRegionAnimated: (CoordinateRegion, ?boolean) => void;

    rotation: number;
    setRotationAnimated: (number, ?boolean) => void;

    visibleMapRect: MapRect;
    setVisibleMapRectAnimated: (MapRect, boolean) => void;

    mapType: MapType;
    padding: Padding;

    showsCompass: FeatureVisibility;
    showsMapTypeControl: boolean;
    showsZoomControl: boolean;
    showsUserLocationControl: boolean;
    showsPointsOfInterest: boolean;
    showsScale: FeatureVisibility;
    tintColor: ?string;

    showItems: (
      Array<Annotation | Overlay>,
      MapShowItemsOptions,
    ) => Array<Annotation | Overlay>;

    annotations: AnnotationArray;
    selectedAnnotation: ?Annotation;

    annotationForCluster: AnnotationForCluster;
    annotationsInMapRect: (MapRect) => AnnotationArray;

    addAnnotation: (Annotation) => Annotation;
    addAnnotations: (AnnotationArray) => AnnotationArray;

    removeAnnotation: (Annotation) => Annotation;
    removeAnnotations: (AnnotationArray) => AnnotationArray;

    overlays: OverlayArray;
    selectedOverlay: ?Overlay;

    overlaysAtPoint: (DOMPoint) => OverlayArray;

    addOverlay: (Overlay) => Overlay;
    addOverlays: (OverlayArray) => OverlayArray;

    removeOverlay: (Overlay) => Overlay;
    removeOverlays: (OverlayArray) => OverlayArray;

    topOverlayAtPoint: (DOMPoint) => ?Overlay;

    tileOverlays: TileOverlayArray;

    addTileOverlay: (TileOverlay) => TileOverlay;
    addTileOverlays: (TileOverlayArray) => TileOverlayArray;

    removeTileOverlay: (TileOverlay) => TileOverlay;
    removeTileOverlays: (TileOverlayArray) => TileOverlayArray;

    showsUserLocation: boolean;
    tracksUserLocation: boolean;

    userLocationAnnotation: ?Annotation;

    convertCoordinateToPointOnPage: (Coordinate) => DOMPoint;
    convertPointOnPageToCoordinate: (DOMPoint) => Coordinate;

    destroy: () => void;

    element: HTMLElement;
  }

  declare export default class MapKit {
    build: string;
    language: string;
    version: string;
    FeatureVisibility: {
      Adaptive: FeatureVisibilityAdaptive,
      Hidden: FeatureVisibilityHidden,
      Visible: FeatureVisibilityVisible,
    };

    init(MapKitInitOptions): void;
    Map(domId?: string, ?MapConstructorOptions): Map;
    Padding(PaddingOptions): Padding;
    Coordinate(latitude: number, longitude: number): Coordinate;
    CoordinateSpan(
      latitudeDelta: number,
      longitudeDelta: number,
    ): CoordinateSpan;
    CoordinateRegion(
      center: Coordinate,
      span: CoordinateSpan,
    ): CoordinateRegion;
    MapPoint(x: number, y: number): MapPoint;
    MapRect(x: number, y: number, width: number, height: number): MapRect;
    MapSize(width: number, height: number): MapSize;
    Annotation(
      coordinate: Coordinate,
      factory: (
        coordinate: Coordinate,
        options: AnnotationConstructorOptions,
      ) => HTMLElement,
      options: AnnotationConstructorOptions,
    ): Annotation;
    ImageAnnotation(
      coordinate: Coordinate,
      options: ImageAnnotationConstructorOptions,
    ): Annotation;
    MarkerAnnotation(
      coordinate: Coordinate,
      options?: MarkerAnnotationConstructorOptions,
    ): Annotation;
  }
}
