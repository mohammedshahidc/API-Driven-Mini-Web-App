import express from 'express'
import tryCatch from '../Utils/tryCatch.js'
import {  fetchAdnSaveRepo, getAllrepos } from '../Controllers/repoControllers.js'

const Route=express.Router()

Route
.post('/search',tryCatch(fetchAdnSaveRepo))
.get('/getAllRepo',tryCatch(getAllrepos))

export default Route