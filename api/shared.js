import express from 'express'

var fs = require("fs");

const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());

let cnt = {};

app.post('/', (req, res) => {
    let { target } = req.body
    if (!target) {
        console.log('Empty share target!')
        res.json({
            status: 'error'
        })
    }
    cnt.total = (cnt.total || 0) + 1
    cnt[target] = (cnt[target] || 0) + 1

    let shareString = ''
    Object.keys(cnt).forEach(t => {
        shareString += `${t} - ${cnt[t]};`
    })

    console.log(`Shared \n'${shareString}'\n time(s), this time to: '${target}' - Saving to file`)
    fs.writeFile('share.log', `,\n${target}`, { flag: 'a+' }, (e) => {
        if (e) {
            console.log(`Error occured: ${e}`)
            res.json({
                status: 'error'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    });
})

export default {
  path: '/api/shared',
  handler: app
}
