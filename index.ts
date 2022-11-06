import express from 'express'

import { user } from './route/user'
import { post } from './route/post'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true} ))

app.use('/user', user)
app.use('/post', post)


app.get('/', (req, res) => {
  res.sendFile( __dirname +  "/public/index.html")
}) 

app.get('/error', (req, res) => {
  res.sendFile(__dirname + '/public/error.html')
})

app.listen( 3000, ()=> {
  console.log(`Listening on port 3000`)
})