import express from 'express'
import { getProfile, createProfile, updateProfile } from '../Controllers/ProfileController.js'

const profileRouter = express.Router()

profileRouter.post('/create-user', createProfile)
profileRouter.get('/get-user', getProfile)
profileRouter.put('/update-user', updateProfile)


export default profileRouter