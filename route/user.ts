import express from "express";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
export const user = express.Router()

interface User {
  id?: string | undefined
  name?: string | undefined
  email?: string | undefined
  age?: number | undefined
}

// add user
user.post('/', async (req, res) => {
  const body:{name: string, email: string, age: number} = req.body

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        age: body.age
      }
    })
    res.status(200).json(user)
  } catch (error:any) {
    res.status(400).send(error)
  }
})

//update user
user.post('/update', async (req, res) => {
  const body:User  = req.body
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
  } catch (error:any) {
    res.status(400).send(error.message)
  }
})

// delete user
user.post('/delete', async (req, res) => {
  try {
    const body:User = req.body
    console.log(`Deleting id ${body.id}`)
    const deletePost = prisma.post.deleteMany({where: {authorId: body.id}})
    const deleteUser = prisma.user.delete({where: {id: body.id}})
    const user = await prisma.$transaction([deletePost, deleteUser])
    res.status(200).json(user)
  } catch (error:any) {
    res.status(400).send(error.message)
  }
})

// find all users
user.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' }
    })
    res.status(200).json(users)
  } catch (error:any) {
    res.status(400).send(error.message)
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
  } catch (error:any) {
    res.status(400).send(error.message)
  }
})

// find user name contain any string
user.get('/name', async (req ,res) => {

  const query:{ name?: string } = req.query
  try {
    const users = await prisma.user.findMany({
      where: { name: { contains: query.name } }
    })
    res.status(200).json(users)
  } catch (error:any) {
    res.status(400).send(error.message)
  }
})