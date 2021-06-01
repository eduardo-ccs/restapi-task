import { Router } from 'express'
import * as tasksController from '../controllers/task.controller'

const router = Router()

router.get('/',tasksController.findAllTasks)

router.post('/', tasksController.createTask)

router.get('/done',tasksController.findAllDoneTasks)

router.get('/:id',tasksController.findOneTask)

router.delete('/:id',tasksController.deleteTask)

router.put('/:id',tasksController.UpdateTask)

export default router;