/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import { FC, ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
/****************************************************/

/*****************************************COMPONENTS*/
import { Navbar } from './components/Navbar.tsx';
import { Projects } from './components/Projects.tsx';
/****************************************************/
/************************************************************************/


/****************************************************************HUB APP*/
export const App: FC = (): ReactElement => {
    /*****************************************RETURN*/
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route
                    path='/training'
                    element={
                        <Projects />
                    }
                />

                <Route
                    path='/projects'
                    element={
                        <Projects />
                    }
                />

                <Route
                    path='*'
                    element={
                        <Navigate replace to='/' />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
    /************************************************/
};
/************************************************************************/