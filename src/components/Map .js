import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'leaflet/dist/leaflet.css';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = (array) => {

    const mapRef = useRef(null);
    const position = [19.544392512453317, -99.21342650112786];
    var cordenadas = [];
    var datosPuntoVenta = [];
    for (var i = 0; i < array.array.length; i++) {
        cordenadas.push([parseFloat(array.array[i].latitud), parseFloat(array.array[i].longitud)]);
        datosPuntoVenta.push({ id: array.array[i].id, descripcion: array.array[i].descripcion, venta: array.array[i].venta, zona: array.array[i].zona, latitud: array.array[i].latitud, longitud: array.array[i].longitud });
    }
        
    useEffect(() => {
        clearMap()
      }, []);
    
    console.log(cordenadas)
    const icon = L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    });

    const MapEvents = () => {
        useMapEvents({
          click(e) {
             // setState your coords here
            // coords exist in "e.latlng.lat" and "e.latlng.lng"
            console.log(e.latlng.lat);
            console.log(e.latlng.lng);
            
            if(array.array.length == 0){
           
            }
          },
        });
        return false;
    }
    console.log(datosPuntoVenta[0])
    function MultipleMarkers() {
        return datosPuntoVenta.map((coordinata, index) => {
           
            return (
                <Marker key={index} position={[coordinata.latitud, coordinata.longitud]} icon={icon} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
                    <Popup key={index}>
                        {"ID: " + coordinata.id}
                        {" Descripcion: " + coordinata.descripcion}
                        {" Venta: " + coordinata.venta}
                        {" Zona: " + coordinata.zona}
                    </Popup>
                </Marker>
            );
        });
    }
    function Multipopup() {
        return datosPuntoVenta.map((data, index) => {
            return <Popup key={index}>
                {"ID: " + data.id}
                {" Descripcion: " + data.descripcion}
                {" Venta: " + data.venta}
                {" Zona: " + data.zona}
            </Popup>;
        });
    }
    function clearMap() {
        
        

        
  
      }
    //
    return (
        <MapContainer center={position} zoom={3} style={{height: "43vh", width: "390"}}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MultipleMarkers />
           
           
       
        </MapContainer>
    );
};

export default Map;

