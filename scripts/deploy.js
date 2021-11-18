#!/usr/bin/env node

'use strict'

const here = (p) => path.join(__dirname, p)
const hereRelative = (p) => here(p).replace(process.cwd(), '.')

const spawn = require('cross-spawn')
const path = require('path')
const fs = require('fs')

let holdingToken = false

// if we have a devToken let save it for after the deploy
fs.rename(
  hereRelative('../devToken.ts'),
  hereRelative('../holdDevToken.ts'),
  (err) => {
    if (!err) {
      console.log('Found a devToken, saving it for after deploy.')
      holdingToken = true

      fs.copyFile(
        hereRelative('../devToken.ts.rename'),
        hereRelative('../devToken.ts'),
        (err) => {
          console.log('copied the template to devToken.ts')

          let result

          result = spawn.sync('storybook-to-ghpages', [], { stdio: 'inherit' })

          if (result) {
            if (holdingToken) {
              fs.copyFile(
                hereRelative('../holdDevToken.ts'),
                hereRelative('../devToken.ts'),
                (err) => {
                  console.log('Putting back the token we saved.')

                  fs.unlink(hereRelative('../holdDevToken.ts'), (err) => {
                    console.log('Removing the temp holding file.')
                    process.exit(result.status)
                  })
                },
              )
            }
          }
        },
      )
    }
  },
)

//
// result = spawn.sync(
//   'prettier',
//   [
//     '--config',
//     hereRelative('config/prettierrc.js'),
//     '--ignore-path',
//     hereRelative('config/prettierignore'),
//     '--write',
//     filesToPrettier,
//   ],
//   {
//     stdio: 'inherit',
//   },
// )
//
// if (result) {
//   process.exit(result.status)
// }
