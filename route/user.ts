import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const user = express.Router()

interface IUser {
  id: string 
  name: string 
  email: string 
  age: number 
}

// add user
user.post('/', async (req, res) => {
  const body:IUser = req.body
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        age: body.age
      }
    })
    res.status(200).json(user)
  } catch (error) {
    error instanceof Error &&  res.status(400).json({msg: error.message})
  }
})

//update user
user.put('/update', async (req, res) => {
  const body:IUser  = req.body
  try {
    const updatedUser = await prisma.user.update({
      where: {id: body.id},
      data: {
        name: body?.name,
        email: body?.email,
        age: body?.age
      }
    })
    res.status(200).json( updatedUser )
  } catch (error) {
    error instanceof Error &&  res.status(400).json({msg: error.message})
  }
})

// delete user
user.delete('/delete', async (req, res) => {
  try {
    const body:IUser = req.body
    const deletePost = prisma.post.deleteMany({where: {authorId: body.id}})
    const deleteUser = prisma.user.delete({where: {id: body.id}})
    const user = await prisma.$transaction([deletePost, deleteUser])
    res.status(200).json(user) 
  }
  catch (error) {
      error instanceof Error &&  res.status(400).json({msg: error.message})
  }
})

// find all users
user.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' }
    })
    res.status(200).json(users)
  } catch (error) {
    error instanceof Error && res.status(400).json({msg: error.message})
  }
})

// find user by id
user.get('/id', async (req, res) => {
  try {
    const query:{ id?:string } = req.query
    const user = await prisma.user.findUnique({  
      where: { id: query.id },
      include: { post: true}
    })
    res.status(200).json(user)
  } catch (error) {
    error instanceof Error &&  res.status(400).json({msg: error.message})
  }
})

// find user name contain any string
user.get('/name', async (req ,res) => {

  const query:{ name?: string } = req.query
  try {
    const users = await prisma.user.findMany({
      where: { 
        name: { contains: query.name, mode: 'insensitive' }
      }
    })
    res.status(200).json(users)
  } catch (error) {
    error instanceof Error &&  res.status(400).json({msg: error.message})
  }
})