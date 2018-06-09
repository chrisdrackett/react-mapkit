declare module 'little-loader' {
  declare export default function load(
    module: string,
    callBack: (err: string) => void,
    context: any,
  ): void
}
