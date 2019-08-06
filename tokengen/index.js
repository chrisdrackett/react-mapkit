const fs = require('fs')
const jwt = require('jsonwebtoken')
var prompt = require('prompt')
var colors = require('colors/safe')

const payload = {
  iat: Date.now() / 1000,
}

const authKey = fs.readFileSync('./tokengen/key.p8')

const header = {
  typ: 'JWT',
  alg: 'ES256',
}

var schema = {
  properties: {
    teamId: {
      description:
        colors.bold('Apple Developer Team ID?\n') +
        colors.gray.underline(
          '   (https://developer.apple.com/account/#/membership/)',
        ),
      type: 'string',
      message: 'Team ID is required.',
      required: true,
    },
    keyId: {
      description:
        colors.bold('Apple MapKit JS Key ID?\n') +
        colors.gray.underline(
          '   (https://developer.apple.com/account/ios/authkey/)',
        ),
      type: 'string',
      message: 'MapKit Key ID is required.',
      required: true,
    },
    domain: {
      description:
        colors.bold('Create a domain restriction?\n') +
        colors.gray('   (press return to skip)'),
      type: 'string',
    },
    expire: {
      description:
        colors.bold('Set an expiration for this token? (in minutes)\n') +
        colors.gray("   Tokens don't expire by default (just press return)."),
      type: 'number',
    },
  },
}
prompt.colors = false
prompt.message = colors.blue('🔑 ')

prompt.start()

prompt.get(schema, function(err, result) {
  payload.iss = result.teamId
  header.kid = result.keyId

  if (result.domain) {
    payload.origin = result.domain
  }

  if (result.expire) {
    payload.exp = Date.now() / 1000 + result.expire * 60
  }

  var token = jwt.sign(payload, authKey, { header: header })

  console.log(colors.blue.bold('🔑 Key:\n'))
  console.log(colors.green(token) + '\n')
})
