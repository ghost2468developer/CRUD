const express = require('express')
const { Prisma } = require('@prisma/client')
const app = express()
const prisma = new Prisma()
app.use(express.json())

// Create User
app.post('/users', async (requestAnimationFrame, res) => {
    const { firstName, lastName, email, age } = req.body
    try {
        const user = await prisma.user.create({ data: { firstName, lastName, age, email } })
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

// Read one user
app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    user ? res.json(user) : res.status(404).json({ error: 'User not found' })
})

// Update a user
app.put('/users/:id', async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, age } = req.body
    try {
        const updateUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { firstName, lastName, email, age }
        })
        res.json(updateUser)
    } catch (e) {
        res.status(404).json({ error: 'User not found' })
    }
})

app.listen(1234, () => {
    console.log('Server running at http://localhost::1234}')
})