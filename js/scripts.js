jQuery('document').ready(function($){

    var menuBtn = $('.btn'),
        menu = $('.navigation ul');

    menuBtn.click(function(){

        if(menu.hasClass('show')){
            menu.removeClass('show');
        } else {
            menu.addClass('show');
        }
        
    });

    window.addEventListener("scroll",function(){
        var header = document.querySelector("header");
        header.classList.toggle("abajo",window.scrollY>0);
    })

});

//VALIDACIONES
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const msg = document.querySelectorAll('#formulario textarea');
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	celular: /^\d{9}$/, // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    email: false,
    celular: false,
    asunto: false,
    mensaje: false
}
const validarFormulario = (e) => {
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre,e.target,'nombre')
        break;
        case "email":
            validarCampo(expresiones.email,e.target,'email')
        break;
        case "celular":
            validarCampo(expresiones.celular,e.target,'celular')
        break;
        case "asunto":
            if($.trim($("#asunto").val())) {
                document.getElementById('grupo-asunto').classList.remove('formulario-grupo-incorrecto')
                document.getElementById('grupo-asunto').classList.add('formulario-grupo-correcto')
                document.querySelector('#grupo-asunto i').classList.remove('fa-times-circle')
                document.querySelector('#grupo-asunto i').classList.add('fa-check-circle')
                document.querySelector('#grupo-asunto .input-error').classList.remove('input-error-activo')
                campos['asunto'] = true
            }else{
                document.getElementById('grupo-asunto').classList.add('formulario-grupo-incorrecto')
                document.getElementById('grupo-asunto').classList.remove('formulario-grupo-correcto')
                document.querySelector('#grupo-asunto i').classList.add('fa-times-circle')
                document.querySelector('#grupo-asunto i').classList.remove('fa-check-circle')
                document.querySelector('#grupo-asunto .input-error').classList.add('input-error-activo')
                campos['asunto'] = false
            }
        break;
        case "mensaje":
            if($.trim($("#mensaje").val())){
                document.querySelector('#grupo-mensaje .input-error').classList.remove('input-error-activo')
                document.getElementById('grupo-mensaje').classList.remove('formulario-grupo-incorrecto')
                document.getElementById('grupo-mensaje').classList.add('formulario-grupo-correcto')
                campos['mensaje'] = true
            }else{
                document.querySelector('#grupo-mensaje .input-error').classList.add('input-error-activo')
                document.getElementById('grupo-mensaje').classList.add('formulario-grupo-incorrecto')
                document.getElementById('grupo-mensaje').classList.remove('formulario-grupo-correcto')
                campos['mensaje'] = false
            }
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorrecto')
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correcto')
        document.querySelector(`#grupo-${campo} i`).classList.remove('fa-times-circle')
        document.querySelector(`#grupo-${campo} i`).classList.add('fa-check-circle')
        document.querySelector(`#grupo-${campo} .input-error`).classList.remove('input-error-activo')
        campos[campo] = true
    }else{
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorrecto')
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correcto')
        document.querySelector(`#grupo-${campo} i`).classList.add('fa-times-circle')
        document.querySelector(`#grupo-${campo} i`).classList.remove('fa-check-circle')
        document.querySelector(`#grupo-${campo} .input-error`).classList.add('input-error-activo')
        campos[campo] = false
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
msg.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    if(campos.nombre && campos.email && campos.celular && campos.asunto && campos.mensaje){

        //CONEXION CON PHP//
        var datos = new FormData(formulario);
        fetch('../php/form.php',{
            method: 'POST',
            body: datos
        })
	    .then(res => res.json())
	    .then(data => {
		console.log(data)
	})
	
        document.getElementById('formulario-mensaje-exito').classList.add('formulario-mensaje-exito-activo')
        setTimeout(() => {
            document.getElementById('formulario-mensaje-exito').classList.remove('formulario-mensaje-exito-activo')
            location.reload()
        }, 2500);
        document.querySelectorAll('.formulario-grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario-grupo-correcto')
        })
    }else{
        document.getElementById('formulario-mensaje-error').classList.add('formulario-mensaje-error-activo')
        setTimeout(() => {
            document.getElementById('formulario-mensaje-error').classList.remove('formulario-mensaje-error-activo')
        }, 2500);
    }
});
