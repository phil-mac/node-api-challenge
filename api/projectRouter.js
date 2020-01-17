const express = require('express')

const projectModel = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', (req, res) => {
    projectModel.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(() => {
            res.status(500).json({error: "failed to get projects"})
        })
})

router.get('/:id', (req, res) => {
    projectModel.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({error: "failed to get project"})
        })
})

router.post('/', (req, res) => {
    projectModel.insert(req.body)
        .then(newProject => {
            res.status(200).json(newProject)
        })
        .catch(() => {
            res.status(500).json({error: "failed to add project"})
        })
})

router.put('/:id', (req, res) => {
    projectModel.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        })
        .catch(() => {
            res.status(500).json({error: "failed to update project"})
        })
})

router.delete('/:id', (req, res) => {
    projectModel.remove(req.params.id)
        .then(numRecsDeleted => {
            res.status(200).json(numRecsDeleted)
        })
        .catch(() => {
            res.status(500).json({error: "failed to delete project"})
        })
})

module.exports = router