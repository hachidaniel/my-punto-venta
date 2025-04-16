import React, { useState } from 'react'

const Create = () => {
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [venta, setVenta] = useState(0);
    const [zona, setZona] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ddd")
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


        </>
    )
}

export default Create