/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import { Application, Request, Response } from 'express';
/****************************************************/

/************************************MONGOOSE MODELS*/
import { Projects } from '../../../dbManager/models/hub/projects.js';
/****************************************************/

/*****************************************INTERFACES*/
import { IHubProject } from '../../../interfaces/interfaces.js';
/****************************************************/
/************************************************************************/


/*************************************************************GET ROUTES*/
export default (app: Application): void => {
    // GET ALL PROJECTS (c-[R]-u-d)
    app.get('/projects/training', (req: Request, res: Response): void => {
        Projects.find()

            .then((projects: IHubProject[]): Response => res.status(200).send(projects))

            .catch((error: Error): Response => res.status(500).send(error));
    });
};
/************************************************************************/