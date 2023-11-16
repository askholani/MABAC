import express from 'express'
import { maxAndMin } from '../utils/helpers'
import { ControllerResult } from '../controllers/result'

const RouterResult = express.Router()

RouterResult.get('/', ControllerResult.hasil)

export default RouterResult
