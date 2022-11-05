import express from 'express'
import { Post, PrismaClient  } from '@prisma/client'
import { user } from './user'

const prisma = new PrismaClient()
export const post = express.Router()

//add post
post.post('/', async (req, res) => {
  console.log('post')
  try {
    const { title, body, authorId } = req.body
    const post = await prisma.post.create({
      data: {
        title,
        body,
        authorId
      }
    })
    res.status(200).json(post)
  } catch (error:any) {
    res.status(400).send(error.message)
  }
})

// update post
post.post('/update', (req, res) => {
  const body:Post = req.body
  try {
    prisma.post.update({
      where: {
        id: body.id
      }, 
      data: {
        title: body.title,
        body: body.body,
        authorId: body.authorId
      }
    })
  }catch (error:any){
    res.status(400).json(error?.message)
  }
})

// find all post
post.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany()
    res.status(200).json(posts)
  } catch (error:any) {
    res.status(400).send(error.message)
  }
})