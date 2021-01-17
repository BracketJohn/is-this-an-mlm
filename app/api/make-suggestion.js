import express from 'express'

var fs = require("fs");

const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());

let cnt = 0;

app.post('/', (req, res, next) => {
    console.log(req.body)
    let { name } = req.body
    if (!name) {
        console.log('Empty suggestion!')
        res.json({
            status: 'error'
        })
    } else {
        cnt += 1

        let curDate = new Date()
        console.log(`${curDate} Suggestion ${cnt}: '${name}' - Saving to file`)
        fs.writeFile('suggestions.log', `,\n${name}`, { flag: 'a+' }, (e) => {
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
    }
})

export default {
  path: '/api/make-suggestion',
  handler: app,
}
