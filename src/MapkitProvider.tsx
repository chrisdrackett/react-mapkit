/* global mapkit */

import React from 'react'
import useScript from 'react-script-hook'

type MapkitContextType = {
  isInProvider: boolean
  mapkit: typeof mapkit | undefined
}

export const MapkitContext = React.createContext<MapkitContextType>({
  isInProvider: false,
  mapkit: undefined,
})

type ProviderProps = {
  // ⚠️ Pick between callbackUrl or token.
  // https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init
  tokenOrCallback: string
}

export const MapkitProvider: React.FC<ProviderProps> = ({
  tokenOrCallback,
  children,
}) => {
  const existingContext = React.useContext(MapkitContext)

  const [scriptLoading] = useScript({
    src: 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js',
  })

  const [context, setContext] = React.useState<MapkitContextType>({
    mapkit: existingContext.mapkit,
    isInProvider: true,
  })

  React.useEffect(() => {
    if (!existingContext.isInProvider) {
      if (!scriptLoading) {
        const isCallback = tokenOrCallback.includes('/')

        mapkit.init({
          authorizationCallback: (done) => {
            if (isCallback) {
              fetch(tokenOrCallback)
                .then((res) => res.text())
                .then(done)
            } else {
              done(tokenOrCallback)
            }
          },
        })

        setContext({ mapkit, isInProvider: true })
      }
    }
  }, [existingContext.isInProvider, scriptLoading, tokenOrCallback])

  return <MapkitContext.Provider value={context} children={children} />
}
