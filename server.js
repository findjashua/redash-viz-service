const express = require('express')
const request = require('request').defaults({ jar: true })

const app = express()

const baseUrl = 'http://redash-server-production-vpc-01.socialcodedev.com:5000'

const loginUrl = `${baseUrl}/login`
const apiUrl = `${baseUrl}/api`

const credentials = {
  email: 'admin',
  password: 'admin'
}

const login = (url, credentials) => {
  request.post(url, {
    form: credentials
  }, (err, resp, body) => {
    if (err) return console.log(err)
  })
}

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/:entity/:id', (req, res) => {
  var url = `${apiUrl}/${req.params.entity}/${req.params.id}`
  request.get(url, (err, resp, body) => {
    if (err) return console.log(err)
    res.send(body)
  })
})

login(loginUrl, credentials)

const server = app.listen(3000, () => {
  console.log('server running')
})
