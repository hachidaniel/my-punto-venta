import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import Map from './Map ';
import { Chart } from "react-google-charts";
import 'leaflet/dist/leaflet.css';


const PuntoVenta = () => {

    var url = 'https://puntodeventatest.somee.com/api/PuntoVentas';
    // const url ='https://localhost:7058/api/PuntoVentas'
    const [puntoVenta, setPuntoVentas] = useState([]);
    const [idPuntoVenta, setIdPuntoVenta] = useState(0)
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [venta, setVenta] = useState(0);
    const [zona, setZona] = useState('');
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(0);
    var datosPuntoVentaGrafico = [];
    const [showNavBar, setShowNavBar] = useState(false);
    const [showMap, setShowMap] = useState(false);
    useEffect(() => {

        getPuntoVenta();
    }, []);

    const getPuntoVenta = async () => {

        url = 'https://puntodeventatest.somee.com/api/PuntoVentas';
        const respuesta = await axios.get(url);
        setPuntoVentas(respuesta.data);
      
    }

    const openModal = (op, idpuntoV, latitud, longitud, descripcion, venta, zona) => {
        const elementLatitud = document.getElementById('floatLatitud');

        const elementLongitud = document.getElementById('floatLongitud');

        setIdPuntoVenta(0);
        setLatitud('');
        setLongitud('');
        setDescripcion('');
        setVenta();
        setZona('');
        setOperation(op);
        setVenta(0);

        if (op == 1) {
            const elementoimput = document.getElementById('inpValormap');
            if (elementoimput.value == '1') {
                setLatitud(elementLatitud.value);
                setLongitud(elementLongitud.value);
            } else {
                setLongitud('');
                setDescripcion('');
            }

            setShowMap(true)
            setTitle('Registrar punto de venta');
        } else if (op == 2) {
            setShowMap(false)
            setTitle('Editar un punto de venta');
            setIdPuntoVenta(idpuntoV);
            setLatitud(latitud);
            setLongitud(longitud);
            setDescripcion(descripcion);
            setVenta(venta);
            setZona(zona);
        }
        window.setTimeout(function () {
            //document.getElementById('floatLatitud').focus()
        })

    }

    const validarDatos = () => {
        url = 'https://puntodeventatest.somee.com/api/PuntoVentas';
        var parameters;
        var metodo;
        if (latitud.trim() === '') {
            show_alerta('Escribe una latitud', 'warning');
        }
        else if (longitud.trim() === '') {
            show_alerta('Escribe un longitud', 'warning');
        }
        else if (descripcion.trim() === '') {
            show_alerta('Escribe una descripcion', 'warning');
        }
        else if (venta == '') {
            show_alerta('Escribe una venta', 'warning');
        }
        else if (zona.trim() === '') {
            show_alerta('Escribe una zona', 'warning');
        } else {
            if (operation == 1) {
                parameters = { id: idPuntoVenta, latitud: latitud, longitud: longitud, descripcion: descripcion, venta: venta, zona: zona };
                metodo = 'POST';
            } else {
                parameters = { id: idPuntoVenta, latitud: latitud, longitud: longitud, descripcion: descripcion, venta: venta, zona: zona };
                metodo = 'PUT';
                url = url + '/' + idPuntoVenta

            }

            enviarSolitudAxios(metodo, parameters);
        }

    }

    const enviarSolitudAxios = async (metodo, parametros) => {
        await axios({
            method: metodo, url: url, data: parametros
        }).then(function (respuesta) {

            if (respuesta.status == 200 || respuesta.status == 201) {
                if (metodo == 'POST') {
                    show_alerta('Se agrego correctamente ', 'success');
                    document.getElementById('btnCerrar').click();
                    getPuntoVenta();
                }
            }
            if (respuesta.status == 204) {
                if (metodo == 'PUT') {

                    show_alerta('Se edito correctamente ', 'success');
                    document.getElementById('btnCerrar').click();
                    getPuntoVenta();

                }
                if (metodo == 'DELETE') {

                    show_alerta('Se elimino correctamente el libro ', 'success');
                    //document.getElementById('btnCerrar').click();
                    getPuntoVenta();

                }
            }

            const elementoimput = document.getElementById('inpValormap');
            elementoimput.value = '0'
        }).catch(function (error) {
            show_alerta('Error en la solicitud', 'error');
            console.log(error);
        });
    }
    const eliminarPuntoVenta = async (id, name) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Seguro de eliminar el punto de venta ' + name + ' ?',
            icon: 'question', text: 'No se podra dar marcha atras',
            showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                setIdPuntoVenta(id);
                url = url + '/' + id
                enviarSolitudAxios('DELETE', { id: id });
                url = 'https://puntodeventatest.somee.com/api/PuntoVentas';
            } else {
                show_alerta('El punto de venta  NO fue eliminado', 'info');
            }
        });

    }


    const options = {
        title: "Venta por zona",

        colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
    };
    datosPuntoVentaGrafico.push(["Task", "Hours per Day"]);
    for (let i = 0; i < puntoVenta.length; i++) {
        datosPuntoVentaGrafico.push([puntoVenta[i].zona, puntoVenta[i].venta]);
    }

    const onclikModalMapa = () => {
        document.getElementById('btnCerrar').click();
        setTimeout(() => {
            setShowNavBar(true);
        }, 500)
    }


    return (
        <>
            <div className='App'>
                        <input id='inpValormap' type='hidden' value='0' />
                        <div className='container-fluid'>
                            <h1>Punto de venta</h1>
                            <div className='row mt-3'>
                                <div className='col-md-4 offset-md-4'>
                                    <div className='d-grid mx-auto'>
                                        <button id='btnAbrimodal' onClick={() => openModal(1)} type='button' className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalPuntoVentas' >
                                            <i className='fa-solid fa-circle-plus'></i> Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12 col-lg-8 offset-0 offset-lg-2 '>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Latitud</th>
                                                    <th>Longitud</th>
                                                    <th>Descripcion</th>
                                                    <th>Venta</th>
                                                    <th>Zona</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    puntoVenta.map((puntoventa, i) => (
                                                        <tr key={puntoventa.id}>
                                                            <td>{i + 1}</td>
                                                            <td>{puntoventa.latitud}</td>
                                                            <td>{puntoventa.longitud}</td>
                                                            <td>{puntoventa.descripcion}</td>
                                                            <td>{puntoventa.venta}</td>
                                                            <td>{puntoventa.zona}</td>
                                                            <td>
                                                                <button onClick={() => {
                                                                    openModal(2, puntoventa.id, puntoventa.latitud, puntoventa.longitud,
                                                                        puntoventa.descripcion, puntoventa.venta, puntoventa.zona)
                                                                }} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalPuntoVentas'>
                                                                    <i className='fa-solid fa-edit'></i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => { eliminarPuntoVenta(puntoventa.id, puntoventa.descripcion) }} className='btn btn-danger'>
                                                                    <i className='fa-solid fa-trash'></i>
                                                                </button>
                                                            </td>

                                                        </tr>

                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                            <div className='row mt-3'>
                                <div className='col-6 col-lg-6 offset-0 offset-lg-1'>
                                    <Map array={puntoVenta}></Map>

                                </div>
                                <div className='col-4 col-lg-4'>
                                    <Chart
                                        chartType="PieChart"
                                        data={datosPuntoVentaGrafico}
                                        options={options}
                                        width={"100%"}
                                        height={"400px"}
                                    />
                                </div>

                            </div>
                        </div>
                        <div id='modalPuntoVentas' className='modal fade' aria-hidden='true' role='dialog' >
                            <div className='modal-dialog'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <label className='h5'>{title}</label>
                                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                                    </div>
                                    <div className='modal-body'>
                                        {
                                            showMap ? <button type='button' className='btn btn-secundary' data-bs-toggle='modal' data-bs-target='#modalMapaCordenadas' onClick={onclikModalMapa} >
                                                <i className='fa-solid fa-circle-plus'></i> Abrir mapa
                                            </button> : null
                                        }

                                        <>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatLatitud"
                                                    placeholder="Latitud"
                                                    value={latitud}
                                                    onChange={(e) => setLatitud(e.target.value)}
                                                />
                                                <label >Latitud</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatLongitud"
                                                    placeholder="Longitud"
                                                    value={longitud}
                                                    onChange={(e) => setLongitud(e.target.value)}
                                                />
                                                <label>Longitud</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatDescripcion"
                                                    placeholder="Descripcion..."
                                                    value={descripcion}
                                                    onChange={(e) => setDescripcion(e.target.value)}
                                                />
                                                <label >Descripcion</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="floatVenta"
                                                    placeholder="Venta"
                                                    value={venta}
                                                    onChange={(e) => setVenta(e.target.value)}
                                                />
                                                <label >Venta</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatZona"
                                                    placeholder="Zona"
                                                    value={zona}
                                                    onChange={(e) => setZona(e.target.value)}
                                                />
                                                <label >Zona</label>
                                            </div>
                                            <div className='d-grid col-6 mx-auto'>
                                                <button onClick={() => validarDatos()} className="btn btn-success">
                                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                                </button>
                                            </div>


                                        </>
                                    </div>
                                    <div className='modal-footer'>
                                        <button id='btnCerrar' className='btn btn-secondary' type='button' data-bs-dismiss='modal'>Cerrar</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div id='modalMapaCordenadas' className='modal fade' aria-hidden='true' role='dialog' >
                            <div className='modal-dialog modal-dialog modal-lg'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <label className='h5'>Agregar coordenadas</label>
                                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                                    </div>
                                    <div className='modal-body'>
                                        <div className='col-6 col-lg-6'>
                                            <div style={{ width: 700, height: 500, borderRadius: 8, overflow: "hidden" }}>
                                                {showNavBar ? <Map array={[]}></Map> : null}
                                            </div>

                                        </div>
                                    </div>
                                    <div className='modal-footer'>
                                        <button id='btnCerrarMap' className='btn btn-secondary' type='button' data-bs-dismiss='modal'  >Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

        </>
    )
}

export default PuntoVenta