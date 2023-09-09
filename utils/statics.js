
const express = require('express');
const path = require('path');

const app = express()

app.use(express.static(path.join(__dirname,"../public")))
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')))

module.exports = app