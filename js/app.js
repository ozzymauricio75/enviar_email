//Variables
const btnEnviar  = document.querySelector('#enviar');
const btnReset   = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const er         = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Variables para campos
const email   = document.querySelector('#email');
const asunto  = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

eventListeners();
function eventListeners(){
    //Cuando la App arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Enviar el email
    formulario.addEventListener('submit', enviarEmail);

    //Resetear formulario
    btnReset.addEventListener('click', resetearFormulario);
}


//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//Valida el formulario
function validarFormulario(e) {
    
    if(e.target.value.length > 0){
        
        //Elimina el mensaje de errores
        const error = document.querySelector('p.error');
        
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    } else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }
    
    //Valida la expresion regular para el email
    if(e.target.type == 'email'){
        if(er.test(e.target.value)){
            //Elimina el mensaje de errores
            const error = document.querySelector('p.error');
            
            if(error){
                error.remove();
            }
        
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('El Email no es vàlido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } 
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e) {
    e.preventDefault();
    
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de tres segundo ocultamos el spinner y mostramos mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje de envio satisfactorio
        const parrafo = document.createElement('p');
        parrafo.textContent = "Email Enviado Satisfactoriamente";
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'uppercase');
        
        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();//Eliminar el mensaje de exito
            resetearFormulario();
        }, 2000);

    }, 3000);
}

//Funcion para resetear el formulario
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}

