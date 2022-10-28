
import express from "express";
import {getSpeciesOne, createSpecies, deleteSpecies, getRecords, getRecord, getUser, deleteRecord, getUsers, deleteUser  } from './database.js'

import { getSpecies } from './controllers/species.js'

const app = express()

app.use(express.json())

//species

app.get("/species", async (req, res) => {
  const species = await getSpecies()
  res.send(species)
})

app.get("/species/:id", async (req, res) => {
  const id = req.params.id
  const species = await getSpeciesOne(id)
  res.send(species)
})

app.post("/species/add", async (req, res) => {
  const { title, contents } = req.body
  const record = await createSpecies()
  res.status(201).send(record)
})

app.delete("/species/:id", async (req, res) => {
  const id = req.params.id
  const deletedSpecies = await deleteSpecies(id)
  res.status(200).send(deletedSpecies)
})

//records

app.get("/records", async (req, res) => {
  const records = await getRecords(id)
  res.send(records)
})

app.get("/records/:id", async (req, res) => {
  const id = req.params.id
  const record = await getRecord(id)
  res.send(record)
})

app.post("/records/add", async (req, res) => {
  const { title, contents } = req.body
  const record = await createRecord()
  res.status(201).send(record)
})

app.delete("/records/:id", async (req, res) => {
  const id = req.params.id
  const deletedRecord = await deleteRecord(id)
  res.status(200).send(deletedRecord)
})

//users

app.post("/users/add", async (req, res) => {
  const { title, contents } = req.body
  const record = await createUser()
  res.status(201).send(record)
})

app.get("/users", async (req, res) => {
  const users = await getUsers()
  res.send(notes)
})

app.get("/users/:id", async (req, res) => {
  const id = req.params.id
  const users = await getUser(id)
  res.send(users)
})


app.delete("/users/:id", async (req, res) => {
  const id = req.params.id
  const deletedUser = await deleteUser(id)
  res.status(200).send(deletedUser)
})




app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})