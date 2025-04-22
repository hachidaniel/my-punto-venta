import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
import Map from './Map ';
import 'leaflet/dist/leaflet.css';
import CrearPuntoVenta from './CrearPuntoVenta';
import GraficosPie from './GraficosPie';


const PuntoVenta = () => {
    
    var url = '';//'https://puntodeventatest.somee.com/api/PuntoVentas';
    // const url ='https://localhost:7058/api/PuntoVentas'
    const [puntoVenta, setPuntoVentas] = useState([]);
    const [title, setTitle] = useState('');
    const [objetoPuntoVenta, setObjetoPuntoVenta] = useState({});


    useEffect(() => {
           
        getPuntoVenta();

    }, []);

    const getPuntoVenta = async () => {
        url = 'https://puntodeventatest.somee.com/api/PuntoVentas';
        const respuesta = await axios.get(url);
        setPuntoVentas(respuesta.data);
    }



    const openModal = (op, idpuntoV, latitud, longitud, descripcion, venta, zona) => {
        setObjetoPuntoVenta({ idPuntoVenta: 0, latitudPuntoVenta: '', longitudPuntoVenta: '', descripcionPuntoVenta: '', ventaPuntoVenta: 0, ZonaPuntoVenta: '', operacion: op })
        if (op == 1) {
            setTitle('Registrar punto de venta');
        } else if (op == 2) {
            setObjetoPuntoVenta({ idPuntoVenta: idpuntoV, latitudPuntoVenta: latitud, longitudPuntoVenta: longitud, descripcionPuntoVenta: descripcion, ventaPuntoVenta: venta, ZonaPuntoVenta: zona, operacion: op })
            setTitle('Editar un punto de venta');
        }

    }

    const enviarSolitudAxiosEliminar = async (metodo, parametros) => {
        await axios({
            method: metodo, url: url, data: parametros
        }).then(function (respuesta) {

            if (respuesta.status == 204) {
                if (metodo == 'DELETE') {
                    show_alerta('Se elimino correctamente el libro ', 'success');
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
                url = 'https://puntodeventatest.somee.com/api/PuntoVentas';
                url = url + '/' + id
                console.log(url)
                enviarSolitudAxiosEliminar('DELETE', { id: id });
                url = 'https://puntodeventatest.somee.com/api/PuntoVentas';
            } else {
                show_alerta('El punto de venta  NO fue eliminado', 'info');
            }
        });

    }


    return (
        <>
            <div className='App'>
                <input id='inpValormap' type='hidden' value='0' />
                <div className='container-fluid'>

                    <div className='row mt-3'>
                        <div className='col-md-2 offset-md-2'>
                            <div className='d-grid mx-auto'>
                                <button id='btnAbrimodal' onClick={() => openModal(1)} type='button' className='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#modalPuntoVentas' >
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
                                                        }} className='btn btn-outline-warning' data-bs-toggle='modal' data-bs-target='#modalPuntoVentas'>
                                                            <i className='fa-solid fa-edit'></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => { eliminarPuntoVenta(puntoventa.id, puntoventa.descripcion) }} className='btn btn-outline-danger'>
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
                        <div className='col-12 col-lg-4 offset-0  offset-lg-2' >
                            <div className="card text-dark bg-light mb-3">
                            <div className="card-header">Mapa punto de venta</div>
                                <div className="card-body">
                                    <Map array={puntoVenta}></Map>
                                </div>
                            </div>


                        </div>
                        <div className='col-12 col-lg-6'>
                            <div className="card text-dark bg-light mb-3" >
                            <div className="card-header">Grafico punto de venta</div>
                                <div className="card-body">
                                    <GraficosPie
                                        puntoVenta={puntoVenta}
                                    />
                                </div>
                            </div>

                        </div>

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


                            <>
                                <CrearPuntoVenta objetoPuntoVenta={objetoPuntoVenta} />
                            </>
                        </div>
                        <div className='modal-footer'>
                            <button id='btnCerrar' className='btn btn-outline-secondary' type='button' data-bs-dismiss='modal' >Cerrar</button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default PuntoVenta