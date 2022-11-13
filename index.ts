import express from 'express'

import { user } from './route/user'
import { post } from './route/post'
const app = express()

let x = 0

app.use((req, res, next)=> { console.log('Request count since server started:  ', x += 1  ), next()  })
app.use(express.json())
app.use(express.urlencoded({ extended: true} ))

app.use(express.static('public'))
app.use('/user', user)
app.use('/post', post)


app.listen( 3000, ()=> {
  console.log(`Listening on port 3000`)
})
