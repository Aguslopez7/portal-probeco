import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Alert, Form } from 'react-bootstrap';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

import { IoIosWarning } from 'react-icons/io';
import { TbGpsFilled } from 'react-icons/tb';

// Fix icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const departamentos = {
    Montevideo: { nombre: 'Montevideo', lat: -34.9011, lng: -56.1645 },
    Canelones: { nombre: 'Canelones', lat: -34.530318, lng: -56.277466 },
    Maldonado: { nombre: 'Maldonado', lat: -34.9089, lng: -54.9589 },
    Rocha: { nombre: 'Rocha', lat: -34.4833, lng: -54.3333 },
    Colonia: { nombre: 'Colonia', lat: -34.451086, lng: -57.843876 },
    Salto: { nombre: 'Salto', lat: -31.391304, lng: -57.959404 },
    Paysandú: { nombre: 'Paysandú', lat: -32.3167, lng: -58.0833 },
    Tacuarembó: { nombre: 'Tacuarembó', lat: -31.7167, lng: -55.9833 },
    Rivera: { nombre: 'Rivera', lat: -30.899279, lng: -55.539665 },
    Artigas: { nombre: 'Artigas', lat: -30.4, lng: -56.4667 },
    Durazno: { nombre: 'Durazno', lat: -33.3833, lng: -56.5167 },
    Soriano: { nombre: 'Soriano', lat: -33.532237, lng: -58.218441 },
    Florida: { nombre: 'Florida', lat: -34.1, lng: -56.2167 },
    Lavalleja: { nombre: 'Lavalleja', lat: -34.368945, lng: -55.235653 },
    Flores: { nombre: 'Flores', lat: -33.5167, lng: -56.9 },
    CerroLargo: { nombre: 'Cerro Largo', lat: -32.371118, lng: -54.165344 },
    SanJose: { nombre: 'San José', lat: -34.341452, lng: -56.712112 },
    TreintaYTres: { nombre: 'Treinta y Tres', lat: -33.2333, lng: -54.3833 },
    RíoNegro: { nombre: 'Río Negro', lat: -33.123032, lng: -58.307018 }
};

const MapDebugLogger = () => {
    const map = useMap();

    useEffect(() => {
        const onMove = () => {
            const center = map.getCenter();
            console.log(`📍 lat=${center.lat.toFixed(6)}, lng=${center.lng.toFixed(6)}`);
        };

        map.on('moveend', onMove);
        return () => map.off('moveend', onMove);
    }, [map]);

    return null;
};

const CenterMapOnDepartamento = ({ departamento }) => {
    const map = useMap();

    useEffect(() => {
        const coords = departamentos[departamento];
        if (coords) {
            map.setView([coords.lat, coords.lng], 13, { animate: true });
        }
    }, [departamento, map]);

    return null;
};

const CenterMapOnMarker = ({ marcador }) => {
    const map = useMap();

    useEffect(() => {
        if (marcador) {
            map.setView([marcador.lat, marcador.lng], map.getZoom(), { animate: true });
        }
    }, [marcador, map]);

    return null;
};

const MapaSeleccion = ({ onDireccionSeleccionada, direccionInicial }) => {
    const [marcador, setMarcador] = useState(null);
    const [direccionPopup, setDireccionPopup] = useState('');
    const [advertencia, setAdvertencia] = useState(null);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('Montevideo');
    const [origenUsuario, setOrigenUsuario] = useState(null);

    const markerRef = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setOrigenUsuario({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            },
            (err) => {
                console.warn('No se pudo obtener la ubicación del usuario', err);
            }
        );
    }, []);

    useEffect(() => {
        const fetchCoords = async () => {
            if (!direccionInicial) return;

            try {
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: { q: direccionInicial, format: 'json', limit: 1 },
                    headers: { 'Accept-Language': 'es' }
                });

                const result = response.data[0];
                if (result) {
                    const lat = parseFloat(result.lat);
                    const lng = parseFloat(result.lon);
                    setMarcador({ lat, lng });
                    setDireccionPopup(direccionInicial);

                    setTimeout(() => {
                        markerRef.current?.openPopup();
                    }, 0);
                }
            } catch (error) {
                console.error('Error al obtener coordenadas desde dirección:', error);
            }
        };

        fetchCoords();
    }, [direccionInicial]);

    const obtenerDireccion = async (lat, lon) => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
                params: { lat, lon, format: 'json' },
                headers: { 'Accept-Language': 'es' }
            });

            const displayName = response.data.display_name;
            const houseNumber = response.data.address?.house_number;

            setDireccionPopup(displayName);
            onDireccionSeleccionada(displayName, { lat, lng: lon });

            if (houseNumber && houseNumber.includes(',')) {
                setAdvertencia(`La dirección incluye múltiples números (${houseNumber}). Verificá si es correcta, puedes editarla desde el campo de texto del formulario`);
            } else {
                setAdvertencia(null);
            }

            setTimeout(() => {
                markerRef.current?.openPopup();
            }, 0);
        } catch (error) {
            console.error('Error al obtener dirección:', error);
        }
    };

    const ClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setMarcador({ lat, lng });
                obtenerDireccion(lat, lng);
            }
        });
        return null;
    };

    return (
        <div
            style={{
                padding: '15px',
                borderRadius: '8px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Form.Group
                controlId="departamentoSelect"
                className="mb-3"
            >
                <Form.Label>Departamento</Form.Label>
                <Form.Select
                    value={departamentoSeleccionado}
                    onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
                >
                    {Object.entries(departamentos).map(([key, { nombre }]) => (
                        <option
                            key={key}
                            value={key}
                        >
                            {nombre}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {advertencia && (
                <Alert
                    variant="warning"
                    className="mt-2"
                >
                    <IoIosWarning
                        size={22}
                        className="icon-margin"
                    />
                    <strong>{advertencia}</strong>
                </Alert>
            )}

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <MapContainer
                    center={departamentos[departamentoSeleccionado]}
                    zoom={13}
                    style={{ height: '100%', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ClickHandler />
                    <MapDebugLogger />
                    <CenterMapOnDepartamento departamento={departamentoSeleccionado} />
                    {marcador && (
                        <>
                            <Marker
                                position={[marcador.lat, marcador.lng]}
                                ref={markerRef}
                            >
                                <Popup>
                                    <div style={{ maxWidth: 250 }}>
                                        <h6 className="mb-0">Dirección</h6>
                                        <br />
                                        {direccionPopup || 'Cargando...'}
                                        <br />
                                        {origenUsuario && (
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&origin=${origenUsuario.lat},${origenUsuario.lng}&destination=${marcador.lat},${marcador.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-sm btn-success mt-2"
                                            >
                                                <TbGpsFilled
                                                    size={22}
                                                    className="icon-margin"
                                                />
                                                Navegación Google Maps
                                            </a>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                            <CenterMapOnMarker marcador={marcador} />
                        </>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapaSeleccion;
