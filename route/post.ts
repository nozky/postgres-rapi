import express from 'express'
import { Post, PrismaClient  } from '@prisma/client'

const prisma = new PrismaClient()
export const post = express.Router()

interface IPost {
  id: string
  title: string,
  body: string,
  authorId: string
}

//add post
post.post('/', async (req, res) => {
  try {
    const { title, body, authorId }:IPost= req.body
    const post = await prisma.post.create({
      data: {
        title,
        body,
        authorId
      }
    })
    res.status(200).json(post)
  } catch (error:any) {
   error instanceof Error && res.status(400).json({msg: error.message})
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
      }
    })
  }catch (error){
     error instanceof Error && res.status(400).json({msg: error.message})
  }
})

// delete single post
post.delete ('/delete', async (req, res) => {
  const body:IPost = req.body
  try {
  const post = await prisma.post.delete({
    where: {
      id: body.id
  }
  })
  res.status(200).json(post)  
  } catch ( error ){
    error instanceof Error && res.status(400).json({msg: error.message})
  }
})

// Delete all post with authorId
post.delete('/deleteall', async (req, res) => {
  const body:IPost = req.body
  try {
    const post = await prisma.post.deleteMany({
      where: {
        authorId: { equals: body.authorId }
      }
    })
    res.status(200).json(post)
  }catch( error ) {
    error instanceof Error && res.status(400).json({msg: error.message})
  }
})

// find post 
post.get('/id', async (req, res) => {
  try {
    const body:IPost = req.body
    const post = await prisma.post.findUnique({
      where: {
        id: body.id
      }
    })
    res.status(200).json(post)
  } catch (error) {
    error instanceof Error && res.status(400).json({msg: error.message})
  }
})

// find all post from author
post.get('/author', async (req, res) => {
  try {
    const body:IPost = req.body
    const posts = await prisma.post.findMany({
      where:{
        authorId: { contains: body.authorId, mode: 'insensitive'}
      }
    })
    res.status(200).json(posts)
  } catch (error) {
    error instanceof Error && res.status(400).json({msg: error.message})
  }
} )

// find all post
post.get('/all', async (req, res) => {
  try {
    const posts = await prisma.post.findMany()
    res.status(200).json(posts)
  } catch (error:any) {
    error instanceof Error &&  res.status(400).json({msg: error.message})
  }
})