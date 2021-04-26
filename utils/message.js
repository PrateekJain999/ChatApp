const moment = require('moment')

let getMessage = (from,text) =>{
    return {
        from,
        text,
        createdAt : moment.valueOf()
    }
}

module.exports = {getMessage}