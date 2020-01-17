const express = require('express')

const projectModel = require('../data/helpers/projectModel')
const actionModel = require('../data/helpers/actionModel')

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

router.get('/:id', validateProjectId, (req, res) => {
    projectModel.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({error: "failed to get project"})
        })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    projectModel.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({error: "failed to get actions"})
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

router.post('/:id/actions', validateProjectId, (req, res) => {
    actionModel.insert({...req.body, project_id: req.params.id})
        .then(newAction => {
            res.status(200).json(newAction)
        })
        .catch(() => {
            res.status(500).json({error: "failed to add action"})
        })
})

router.put('/:id', validateProjectId, (req, res) => {
    projectModel.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        })
        .catch(() => {
            res.status(500).json({error: "failed to update project"})
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    projectModel.remove(req.params.id)
        .then(numRecsDeleted => {
            res.status(200).json(numRecsDeleted)
        })
        .catch(() => {
            res.status(500).json({error: "failed to delete project"})
        })
})

function validateProjectId(req, res, next){
    projectModel.get(req.params.id)
        .then(project => {
            if (project){
                next()
            }else{
                res.status(500).json({error: "failed to find project with that ID"})
            }
        })
        .catch(err => {
            res.status(500).json({error: "failed to get project with that ID"})
        })
}

module.exports = router