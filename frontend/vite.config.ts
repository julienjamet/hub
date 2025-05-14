/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import dotenv from 'dotenv';
import { UserConfig, defineConfig } from 'vite';
/****************************************************/

/*****************************************INTERFACES*/
import { IPreview, IViteConfigOptions } from './src/interfaces/config/config.ts';
/****************************************************/
/************************************************************************/


/************************************************************VITE CONFIG*/
dotenv.config();

/*************************************PREVIEW CONFIG*/
const preprodUrl: string = process.env.VITE_HUB_PREPROD_URL || '';

const preview: IPreview = {
    allowedHosts: [preprodUrl]
};
/****************************************************/

const viteConfigOptions: IViteConfigOptions = {
    preview: preview
};

const viteConfig: UserConfig = defineConfig(viteConfigOptions);

export default viteConfig;
/************************************************************************/