/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import { FC, ReactElement, ReactNode, useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
/****************************************************/

/*****************************************INTERFACES*/
import { IHubProject, ISkill } from '../interfaces/data/data.ts';
/****************************************************/
/************************************************************************/


/***************************************************************PROJECTS*/
export const Projects: FC = (): ReactElement => {
    /*****************************STATES & VARIABLES*/
    const location: string = useLocation().pathname.split('/')[1];

    const [projects, setProjects] = useState<IHubProject[]>([]);
    /************************************************/

    /******************************EFFECTS & METHODS*/
    // [ GET PROJECTS ] EFFECT
    useEffect((): void => {
        axios.get(`${import.meta.env.VITE_HUB_DEV_HOSTNAME}:${import.meta.env.VITE_HUB_DEV_PORT}/projects/${location}`)

            .then((response: AxiosResponse): void => setProjects(response.data))

            .catch((error: AxiosError): void => console.error(error));
    }, [location]);
    /************************************************/

    /*****************************************RETURN*/
    return (
        <>
            <div className='projects'>
                <div className='projects_presentation'>
                    <h2>
                        <NavLink
                            to='/'
                            className='clickable'
                        >
                            <i
                                className='fa-solid fa-chevron-left'
                                title='Retour'
                            />
                        </NavLink>

                        <span className='title'>
                            {location === 'training' ? 'Ma formation' : 'Mes projets'}
                        </span>
                    </h2>

                    <div className='text'>
                        {
                            location === 'training' ? (
                                <>
                                    <span>J'ai effectué ma formation de développeur sur la plateforme <strong>OpenClassrooms</strong>.</span>

                                    <span>Les six projets ci-dessous ont été réalisés au cours de ces huit mois de formation.</span>
                                </>
                            ) : (
                                <>
                                    <span>Les projets ci-dessous sont mes créations, bacs à sable et autres expérimentations.</span>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className='cards'>
                    {
                        projects.map((project: IHubProject, index: number): ReactNode =>
                            <div className={`clickable p${index}`}>
                                <div className='image'>
                                    <img src={`./training_page/p${index + 1}.png `} alt={`Projet ${project.name}`} />
                                </div>

                                <div className='skills'>
                                    {
                                        project.skills.map((skill: ISkill): ReactNode =>
                                            <i
                                                className={skill.icon}
                                                title={skill.name}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
    /************************************************/
};
/************************************************************************/