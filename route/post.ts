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
   error instanceof Error && res.status(400).send(error.message)
  }
})

// update post
post.put('/update', (req, res) => {
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
  }catch (error){
     error instanceof Error && res.status(400).json(error?.message)
  }
})

post.delete ('/delete', async (req, res) => {
  const query:{id?:string} = req.query
  try {
  const post = await prisma.post.delete({
    where: {
      id: query.id
    }
  })
  res.status(200).json(post)  
  } catch ( error ){
    error instanceof Error && res.status(400).json(error.message)
  }
})

// find all post
post.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany()
    res.status(200).json(posts)
  } catch (error:any) {
    error instanceof Error &&  res.status(400).send(error.message)
  }
})