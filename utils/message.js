const moment = require('moment')

let getMessage = (from,text) =>{
    return {
        from,
        text,
        createdAt : moment.valueOf()
    }
}

let getLocationMessage = (from, lat, lon)=>{
    return {
        from,
        url: `https://google.com/maps?q=${lat}, ${lon}`,
        createdAt: moment.valueOf()
    }
}
module.exports = {getMessage, getLocationMessage}