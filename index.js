const express = require('express')
const { PrismaClient } = require('@prisma/client')
const app = express()
const prisma = new PrismaClient()
app.use(express.json())

// Create User
app.post('/users', async (req, res) => {
    const { firstName, lastName, email, age } = req.body
    try {
        const user = await prisma.user.create({ 
            data: { firstName, lastName, age, email } 
        })
        res.status(201).json(user)
    } catch (e) {
        res.status(400).json({ error: 'User creation failed', details: e.message })
    }
})

// Read all users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

// Read one user by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id } })
    user ? res.json(user) : res.status(404).json({ error: 'User not found' })
})

// Update a user
app.put('/users/:id', async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, age } = req.body
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { firstName, lastName, email, age }
        })
        res.json(updatedUser)
    } catch (e) {
        res.status(404).json({ error: 'User not found' })
    }
})

// Delete a user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        await prisma.user.delete({ where: { id } })
        res.status(204).send()
    } catch (e) {
        res.status(404).json({ error: 'User not found' })
    }
})

app.listen(1234, () => {
    console.log('Server running at http://localhost:1234')
})
