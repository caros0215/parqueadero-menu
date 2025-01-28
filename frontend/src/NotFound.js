import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className='Header'>
                <center> Aquí va el encabezado</center>
            </div>
            <section className="page_404">
                <div>
                    <div className="four_zero_four_bg">
                        <h1>404</h1>
                    </div>
                    <div className="box_404">
                        <h3>
                            <center>Página no encontrada</center>
                        </h3>
                    </div>
                    <center>
                        <button className='boton404'>
                            <NavLink to="/" style={{ textDecoration: 'none', color: '#ffffff' }}>
                                Ir al Inicio
                            </NavLink>
                        </button>
                    </center>
                </div>
            </section>
        </>
    );
}

export default NotFound;
