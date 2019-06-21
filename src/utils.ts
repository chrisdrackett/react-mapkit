/* global mapkit */

export type NumberTuple = [number, number]
export type Rect = [number, number, number, number]
export type PaddingType = number | mapkit.Padding
export type RegionType = {
  latitude: number
  longitude: number
  latitudeSpan: number
  longitudeSpan: number
}
export type ImageUrl = {
  '1': string
  '2'?: string
  '3'?: string
}

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N
type ConstructorParameters<T> = T extends new (...args: infer U) => any
  ? U
  : never

type MapConstructionOptions = NonNullable<
  ConstructorParameters<typeof mapkit.Map>[1]
>
export type MarkerConstructionOptions = NonNullable<
  ConstructorParameters<typeof mapkit.MarkerAnnotation>[1]
>

export const createPadding = (padding: PaddingType) => {
  return new mapkit.Padding(
    typeof padding === 'number'
      ? {
          top: padding,
          right: padding,
          bottom: padding,
          left: padding,
        }
      : padding,
  )
}

export const createCoordinate = (latitude: number, longitude: number) => {
  return new mapkit.Coordinate(latitude, longitude)
}

export const createCoordinateSpan = (
  latitudeDelta: number,
  longitudeDelta: number,
) => {
  return new mapkit.CoordinateSpan(latitudeDelta, longitudeDelta)
}

export const createCoordinateRegionFromValues = (region: RegionType) => {
  return createCoordinateRegion(
    createCoordinate(region.latitude, region.longitude),
    createCoordinateSpan(region.latitudeSpan, region.longitudeSpan),
  )
}

export const createCoordinateRegion = (
  center: mapkit.Coordinate,
  span: mapkit.CoordinateSpan,
) => {
  return new mapkit.CoordinateRegion(center, span)
}

export const createMapPoint = (x: number, y: number) => {
  return new mapkit.MapPoint(x, y)
}

export const createMapRect = (
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  return new mapkit.MapRect(x, y, width, height)
}

export type DefaultMapOptions = Merge<
  MapConstructionOptions,
  {
    visibleMapRect?: Rect
    region?: RegionType
    center?: NumberTuple
  }
>
