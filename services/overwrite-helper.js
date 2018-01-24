const Standup = require('../models/Standup')

function getCurrentDate() {
  let x = new Date(Date.now())
  let month = x.getMonth()+1;
  if(month.toString().length < 2){
    month = '0' + month
  }
  let date = x.getDate()
  if(date.toString().length < 2){
    date = '0' + date
  }
  let currentDate = `%${x.getFullYear()}-${month}-${date}%`
  return currentDate
}

const dailyOverWrite = (req, res, next) => {
  if(req.body.dailyOverWrite) {
    console.log('firing dailyOverWrite')
    Standup.dailyReset(`%${getCurrentDate()}%`, req.user.id)
    .then(data => {
      next()
    })
  }else {
    next()
  }
}

module.exports = {
  dailyOverWrite: dailyOverWrite
}
