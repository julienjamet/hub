/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import dotenv from 'dotenv';
import mongoose from 'mongoose';
/****************************************************/

/**********************************************ENUMS*/
import { ansi } from '../enums/enums.js';
/****************************************************/
/************************************************************************/


/****************************************************************METHODS*/
dotenv.config();

const environment: string = process.env.NODE_ENV || '';

/*****************[ SET CORS ALLOWED ORIGIN ] METHOD*/
export const setCorsAllowedOrigin: () => string = (): string => {
    switch (environment) {
        case 'production':
            return process.env.HUB_PROD_URL || '';

        case 'preproduction':
            return process.env.HUB_PREPROD_URL || '';

        case 'development':
            return '*';

        default:
            return '';
    }
};
/****************************************************/


/***********************[ SET HELMET CONFIG ] METHOD*/
export const setHelmetConfig: () => object = (): object => {
    switch (environment) {
        case 'production':
        case 'preproduction':
        default:
            return {
                contentSecurityPolicy: {
                    directives: {
                        // -- restrict the loading of resources to the same origin ( self )
                        defaultSrc: ["'self'"],
                        // -- allow only scripts from the same origin ( self )
                        scriptSrc: ["'self'"],
                        // -- allow only styles from the same origin ( self )
                        styleSrc: ["'self'"],
                        // -- allow only fonts from the same origin ( self )
                        fontSrc: ["'self'"],
                        // -- allow images from the same origin ( self ) and data URIs ( e.g., inline images )
                        imgSrc: ["'self'", 'data:'],
                        // -- allow connections ( e.g., AJAX, WebSockets ) only to the same origin ( self )
                        connectSrc: ["'self'"],
                        // -- prevent usage of <object>, <embed>, <applet> elements to load resources from any origin
                        objectSrc: ["'none'"],
                        // -- enforce the upgrade of insecure HTTP requests to HTTPS
                        upgradeInsecureRequests: []
                    },
                },
                // -- specifies the referrer policy for the document. 'no-referrer' means no referrer information will be sent
                referrerPolicy: { policy: 'no-referrer' },
                // -- enforces Cross-Origin Embedder Policy ( COEP ), blocking cross-origin resources from being loaded by the page unless they explicitly allow it
                crossOriginEmbedderPolicy: true
            };

        case 'development':
            return {};
    }
};
/****************************************************/


/****************************[ DB CONNEXION ] METHOD*/
export const connectToDatabase: (connectingString: string, dbName: string) => mongoose.Connection = (connectingString: string, dbName: string): mongoose.Connection => {
    const connection: mongoose.Connection = mongoose.createConnection(connectingString);

    connection.on('connected', (): void => {
        console.log(`${ansi.green}Connected to [ ${ansi.yellow}${dbName}${ansi.green} ] database`);
    });

    connection.on('error', (): void => {
        console.error(`${ansi.red}Connection to [ ${ansi.yellow}${dbName}${ansi.red} ] database has failed`);
    });

    return connection;
};
/****************************************************/
/************************************************************************/