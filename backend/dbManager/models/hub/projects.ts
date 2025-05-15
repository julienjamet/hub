/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import mongoose, { Schema, Model } from 'mongoose';
/****************************************************/

/****************************************CONNECTIONS*/
import { hubConnexion } from '../../connections/hub.js';
/****************************************************/

/*****************************************INTERFACES*/
import { IHubProject } from '../../../interfaces/interfaces.js';
/****************************************************/
/************************************************************************/


/*****************************************************HUB PROJECTS MODEL*/
/*********************************************SCHEMA*/
const hubProject: Object = {
    number: { type: Number, required: false },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    subject: { type: String, required: true },
    skills: { type: [Object], required: true },
    difficulty: { type: Number, required: true },
    startings: { type: [Object], required: false }
};

const hubSchema: Schema<IHubProject> = new mongoose.Schema(hubProject);
/****************************************************/

/**********************************************MODEL*/
export const Projects: Model<IHubProject> = hubConnexion.model('Projects', hubSchema);
/****************************************************/
/************************************************************************/