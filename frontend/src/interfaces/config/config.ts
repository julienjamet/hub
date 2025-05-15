/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import { ProxyOptions } from 'vite';
/****************************************************/
/************************************************************************/


/*************************************************VITE CONFIG INTERFACES*/
export interface IServer {
    proxy: Record<string, string | ProxyOptions>
};

export interface IPreview {
    allowedHosts: string[]
};

export interface IViteConfigOptions {
    preview: IPreview
};
/************************************************************************/