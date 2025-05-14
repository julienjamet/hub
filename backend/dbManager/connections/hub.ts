/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import mongoose from 'mongoose';
/****************************************************/

/********************************************METHODS*/
import { connectToDatabase } from '../../methods/methods.js';
/****************************************************/
/************************************************************************/


/*******************************************************HUB DB CONNEXION*/
const userName: string = process.env.DB_USERNAME || '';
const password: string = process.env.DB_PASSWORD || '';
const dbName: string = process.env.DB_NAME_HUB || '';

const hubConnectionString: string = `mongodb+srv://${userName}:${password}@hub.msa2gtr.mongodb.net/${dbName}`;

export const hubConnexion: mongoose.Connection = connectToDatabase(hubConnectionString, dbName);
/************************************************************************/