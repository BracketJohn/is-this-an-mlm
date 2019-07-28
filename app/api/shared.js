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

    res.json({
        status: 'success'
    })

    cnt.total = (cnt.total || 0) + 1
    if (target.endsWith('_share')) {
        cnt.totalShared = (cnt.totalShared || 0) + 1
    } else if (target.endsWith('_match')) {
        cnt.totalMatched = (cnt.totalMatched || 0) + 1
    } else if (target.endsWith('_click')) {
        cnt.totalClicked = (cnt.totalClicked || 0) + 1
    } else {
        console.log(`Unknown target: ${target}`)
        cnt.totalUnknown = (cnt.totalUnknown || 0) + 1
    }

    cnt[target] = (cnt[target] || 0) + 1

    fs.writeFile('share.log', `,\n${target}`, { flag: 'a+' }, (e) => {
        if (e) {
            console.log(`Error occured: ${e}`)
        }
    })

    let shareString = ''
    Object.keys(cnt).forEach(t => {
        shareString += `${t}: ${cnt[t]}, `
    })
    console.log(`Event: '${target}': ${shareString}\n`)
})

export default {
  path: '/api/shared',
  handler: app
}
