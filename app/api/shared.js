import express from 'express'

var fs = require("fs");

const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());

let cnt = {};

app.post('/', (req, res) => {
    let { target } = req.body
    if (!target) {
        console.log(`Empty share target: ${target}`)
        res.json({
            status: 'error'
        })
    }

    if (target.endsWith('_visitor')) {
        let ip = '000.000.000'
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(',').pop()
        } else {
            try {
                ip =    (req.connection.remoteAddress ||
                         req.socket.remoteAddress ||
                         req.connection.socket.remoteAddress)
            } catch (e) {}
        }
        console.log(`${new Date()} Visitor ${ip}`)
    }

    res.json({
        status: 'success'
    })

    cnt.total = (cnt.total || 0) + 1
    if (target.endsWith('_share')) {
        cnt.totalShared = (cnt.totalShared || 0) + 1
    } else if (target.endsWith('_match')) {
        cnt[target] = (cnt[target] || 0) + 1
        cnt.totalMatched = (cnt.totalMatched || 0) + 1
    } else if (target.endsWith('_click')) {
        cnt.totalClicked = (cnt.totalClicked || 0) + 1
    } else if (target.endsWith('_visitor')) {
        cnt.totalVisitor = (cnt.totalVisitor || 0) + 1
    } else if (target.endsWith('_checked')) {
        cnt.totalChecked = (cnt.totalChecked || 0) + 1
    } else {
        console.log(`Unknown target: ${target}`)
        cnt.totalUnknown = (cnt.totalUnknown || 0) + 1
    }

    let curDate = new Date()
    fs.writeFile('share.log', `,\n${curDate} - ${target}`, { flag: 'a+' }, (e) => {
        if (e) {
            console.log(`Error occured: ${e}`)
        }
    })

    console.log(`${curDate} Share event ${target} logged.`)
})

module.exports = {
    getCount
}

export default {
  path: '/api/shared',
  handler: app,
}
