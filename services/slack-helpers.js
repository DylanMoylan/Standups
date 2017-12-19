require('isomorphic-fetch')
require('dotenv').config()

const SLACK_OAUTH_ACCESS_TOKEN = process.env.SLACK_OAUTH_ACCESS_TOKEN
const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN
const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET

function callSlack(req, res, next) {
  console.log(req.query.code)
  fetch(`https://slack.com/api/oauth.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${encodeURIComponent(req.query.code)}`)
  .then(response => response.json())
  .then(response => {
    if(response.ok === true) {
      res.locals.slack = {
        access_token: response.access_token,
        scope: response.scope,
        team_id: response.team_id
      }
    }else{
      console.log(response)
    }
  }).catch(next)
  next()
}

module.exports = {
  callSlack: callSlack,
}
