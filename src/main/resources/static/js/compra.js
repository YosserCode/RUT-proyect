const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito2 = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito2.addEventListener('click', (e)=>{compra.eliminarProducto(e)});
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function procesarCompra(e){
    //e.preventDefault();
    if(compra.obtenerProductosLocalStorage().length === 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2500,
            showConfirmButton: false
          }).then(function(){
              window.location = "productos";
          })
    }
    else if(cliente.value === '' || correo.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 2500,
            showConfirmButton: false
          })
    }
    else{
        if (typeof config === 'undefined') {
            console.error("El archivo de configuración no se cargó correctamente.");
        } else {
            // Inicializa EmailJS con la API key
            emailjs.init(config.apiKey);
        }

        const btn = document.getElementById('procesar-compra');

        document.getElementById('procesar-pago')
        .addEventListener('submit', function(event) {
        event.preventDefault();

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display='block';

            const enviado = document.createElement('img');
            enviado.src = 'images/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

        const serviceID = 'default_service';
        const templateID = config.templateBuyKey;

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
            
                    cargandoGif.style.display = 'none';
                    document.querySelector('#loaders').appendChild(enviado);
                    setTimeout(() => {
                        enviado.remove();
                        compra.vaciarLocalStorage();
                        window.location = "productos";
                    }, 2500);

            }, (err) => {
            btn.value = 'Send Email';
            alert(JSON.stringify(err));
            });
        });

    }
}
