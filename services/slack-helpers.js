require('isomorphic-fetch')
require('dotenv').config()

const SLACK_OAUTH_ACCESS_TOKEN = process.env.SLACK_OAUTH_ACCESS_TOKEN
const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN
const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET

function callSlack(req, res, next) {
  console.log(req.query)
  next()
}

module.exports = {
  callSlack: callSlack,
}
