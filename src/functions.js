import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function show_alerta(mensaje, icono, focus ='') {
    onfocus(focus);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        timer: mensaje,
        icon: icono
    });
}

function onfocus(focu) {
    if (focu !== '') {
        document.getElementById(focu).focus();
    }

} 
