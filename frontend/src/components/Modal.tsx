/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import { FC, ReactElement, ReactNode, useEffect } from 'react';
//import { NavLink } from 'react-router-dom';
/****************************************************/

/*****************************************INTERFACES*/
import { IModal } from '../interfaces/components/components.ts';
/****************************************************/

/**********************************************TOOLS*/
//import { controlHover } from '../tools/general_methods.ts';
import { IStarting } from '../interfaces/data/data.ts';
/****************************************************/
/************************************************************************/


/********************************************************MODAL COMPONENT*/
export const Modal: FC<IModal> = ({ project, setOpenModal }): ReactElement => {
    /*****************************STATES & VARIABLES*/
    //const [isButtonHovered, setIsButtonHovered] = useState<boolean | undefined>();
    /************************************************/

    /******************************EFFECTS & METHODS*/
    useEffect((): void => {

    })
    /************************************************/

    /*****************************************RETURN*/
    return (
        <div className='modalBlur'>
            <div className='modal'>
                <span
                    className='cross'
                    onClick={(): void => setOpenModal(false)}
                >
                    X
                </span>

                <h2>
                    <span>Projet n°{project.number}</span>

                    <img src={`./assets/training_page/p${project.number}.png`} alt={`Projet ${project.name}`} />
                </h2>

                <div className='project_information'>
                    <div>Sujet : {project.subject}</div>

                    <div className='difficulty'>
                        <span>Difficulté :</span>

                        <div className='stars'>
                            {
                                [1, 2, 3, 4, 5].map((index: number): ReactNode =>
                                    <i className={`fa-solid fa-star ${(index <= project.difficulty) ? 'bright' : ''}`} />
                                )
                            }
                        </div>
                    </div>

                    <div className='starting_materials'>
                        <span>Matériaux de départ :</span>

                        <ul>
                            {
                                project.startings?.map((starting: IStarting): ReactNode =>
                                    <li>
                                        <a
                                            href={starting.link}
                                            target='_blank'
                                        >
                                            {starting.name}
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

                {/* <NavLink
                    to='/training/booki'
                    className={`clickable ${controlHover(isButtonHovered)}`}
                    onMouseEnter={(): void => setIsButtonHovered(true)}
                    onMouseLeave={(): void => setIsButtonHovered(false)}
                >
                    Visiter le site
                </NavLink> */}
            </div>
        </div>
    );
    /************************************************/
};
/************************************************************************/