import React, { useState } from 'react';
import { show_alerta } from '../functions';
import axios from 'axios';
import {  Formik } from 'formik';
const CrearPuntoVenta = ({ objetoPuntoVenta }) => {
    
    return (
        <>
            <Formik
                enableReinitialize={true}
                //initialTouched={true}
                initialValues={
                    {
                        idPuntoVenta: objetoPuntoVenta.idPuntoVenta,
                        floatLatitud: objetoPuntoVenta.latitudPuntoVenta,
                        floatLongitud: objetoPuntoVenta.longitudPuntoVenta,
                        descripcion: objetoPuntoVenta.descripcionPuntoVenta,
                        venta: objetoPuntoVenta.ventaPuntoVenta,
                        zona: objetoPuntoVenta.ZonaPuntoVenta,
                        operacion: objetoPuntoVenta.operacion
                    }}

                validate={(valores) => {
                    let errores = {}
                    if (!valores.floatLatitud) {
                        errores.floatLatitud = 'Ingresar un valor'
                    }
                    if (!valores.floatLongitud) {
                        errores.floatLongitud = 'Ingresar un valor'
                    }
                    if (!valores.descripcion) {
                        errores.descripcion = 'Ingresar un valor'
                    }
                    if (!valores.venta) {
                        errores.venta = 'Ingresar un valor'
                    }
                    if (!valores.zona) {
                        errores.zona = 'Ingresar un valor'
                    }
                    return errores;

                }}
                onSubmit={(values, { resetForm }) => {
                     console.log(values)
                    var url = '';//'https://puntodeventatest.somee.com/api/PuntoVentas';
                    var params = {
                        id: values.idPuntoVenta,
                        latitud: String(values.floatLatitud),
                        longitud: String(values.floatLongitud),
                        descripcion: values.descripcion,
                        venta: values.venta,
                        zona: values.zona
                    };
                    
                    let metodo = values.operacion === 1 ? "POST" : "PUT";
                    url = values.operacion === 1 ? 'https://puntodeventatest.somee.com/api/PuntoVentas':'https://puntodeventatest.somee.com/api/PuntoVentas/' + values.idPuntoVenta
                    
                    //enviarDatos(metodo,params,url);
                    axios({
                        method: metodo, url: url, data: params
                    }).then(function (respuesta) {
            
                        if (respuesta.status == 200 || respuesta.status == 201) {
                            if (metodo == 'POST') {
                                show_alerta('Se agrego correctamente ', 'success');
                            }
                            resetForm();
                            window.location.reload(false)
                        }
                        if (respuesta.status == 204) {
                            if (metodo == 'PUT') {
                                show_alerta('Se edito correctamente ', 'success');         
                            }
                            resetForm();
                            window.location.reload(false)
                        }
                    }).catch(function (error) {
                        show_alerta('Error en la solicitud', 'error');
                        console.log(error);
                    });

                }}
            >
                {(props) => (
                    <>
                        <form onSubmit={props.handleSubmit}>

                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    id="floatLatitud"
                                    name='floatLatitud'
                                    placeholder="Latitud"
                                    value={props.values.floatLatitud}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                <label>Latitud</label>
                                {
                                    props.touched.floatLatitud && props.errors.floatLatitud && <span className="badge bg-danger">{props.errors.floatLatitud}</span>
                                }
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    id="floatLongitud"
                                    placeholder="Longitud"
                                    value={props.values.floatLongitud}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                <label>Longitud</label>
                                {
                                    props.touched.floatLongitud && props.errors.floatLongitud && <span className="badge bg-danger">{props.errors.floatLongitud}</span>
                                }
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descripcion"
                                    placeholder="Descripcion..."
                                    value={props.values.descripcion}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                <label >Descripcion</label>
                                {
                                    props.touched.descripcion && props.errors.descripcion && <span className="badge bg-danger">{props.errors.descripcion}</span>
                                }
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="venta"
                                    placeholder="Venta"
                                    value={props.values.venta}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                <label >Venta</label>
                                {
                                    props.touched.venta && props.errors.venta && <span className="badge bg-danger">{props.errors.venta}</span>
                                }
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zona"
                                    placeholder="Zona"
                                    value={props.values.zona}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                <label >Zona</label>
                                {
                                    props.touched.zona && props.errors.zona && <span className="badge bg-danger">{props.errors.zona}</span>
                                }
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button className="btn btn-outline-success">
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>

                        </form>

                        {/*JSON.stringify(props, null, 2)*/}

                    </>


                )}

            </Formik>



        </>
    )
}

export default CrearPuntoVenta