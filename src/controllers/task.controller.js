import { request } from 'express';
import Task from '../models/Task'
import { getPagination } from '../libs/getPagination'

/*
Metodo Original

 export const findAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrogn retrieving the tasks'
        })
    }
}
 */

export const findAllTasks = async (req, res) => {
    try {
        const { size, page, title } = req.query;
        const condition = title
            ? {
                title: { $regex: new RegExp(title), $options: "i" },
              } 
              : {};
        const { limit, offset } = getPagination(page, size);
        const data = await Task.paginate(condition, { offset, limit });
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page-1

        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrogn retrieving the tasks'
        })
    }
}

export const createTask = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({ message: 'Content cannot be empty' })
    }
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        })
        const taskSaved = await newTask.save()

        res.json(taskSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrogn creating a task'
        })

    }
}

export const findOneTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);

        if (!task) return res
            .status(404)
            .json({
                message: `Task with id ${id} does not exists`
            });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({
            message: error.message || `Something goes wrogn retrieving the task with id: ${id}`
        })
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Task.findByIdAndDelete(id)

        res.json({
            message: 'Task were deleted successfull'
        })
        res.json(req.params.id);

    } catch (error) {
        res.status(500).json({
            message: `Cannot detele task whit id: ${id}`
        })

    }
}

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({ done: true });
    res.json(tasks);
}

export const UpdateTask = async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "Task was updated succefully!" });


}