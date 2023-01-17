// Aqui colocamos las expresiones regulares para validar los input
const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	lastName: /^[a-zA-ZÀ-ÿ\s]{1,70}$/, // Letras y espacios, pueden llevar acentos.
	userName: /^[a-zA-Z0-9\_\-]{2,20}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
	// password2: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	address: /^[a-zA-Z0-9\_\-]/, // Letras, numeros, guion y guion_bajo
	country: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras
	state: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras
	zip: /^[0-9]{4,12}$/, // 4 a 12 digitos.
	message: /^[\s\S]{1,150}$/, // Letras, numeros, guion y guion_bajo
}

const fields = {
	name: false,
	lastName: false,
	userName: false,
	email: false,
	address: false,
	country: false,
	state: false,
	zip: false,
	message: false
}

// Controlador de validaciones del formulario
// event = el grupo seleccionado
const validarFormulario = (event) => {
	if (expresiones[event.target.id]){
		validarCampo(expresiones[event.target.id], event.target, event.target.id);
	} else if (event.target.id === "password2"){
		// Vamos a validar si los password son identicos
		// const inputPassword1 = document.getElementById("password").value;
  	// const inputPassword2 = document.getElementById("password2").value;
		// if(inputPassword1.length === inputPassword2.length && inputPassword1 === inputPassword2){
		// 	// Los datos introducidos son correctos
		// 	document.getElementById(`${event.target.id}Field`).classList.remove('form-field-wrong');
		// 	document.getElementById(`${event.target.id}Field`).classList.add('form-field-correct');
		// 	document.querySelector(`#${event.target.id}Field i`).classList.add('fa-check-circle');
		// 	document.querySelector(`#${event.target.id}Field i`).classList.remove('fa-times-circle');
		// 	document.querySelector(`#${event.target.id}Field .form-input-error`).classList.remove('form-input-error-active');
		// } else {
		// 	document.getElementById(`${event.target.id}Field`).classList.add('form-field-wrong');
		// 	document.getElementById(`${event.target.id}Field`).classList.remove('form-field-correct');
		// 	document.querySelector(`#${event.target.id}Field i`).classList.add('fa-times-circle');
		// 	document.querySelector(`#${event.target.id}Field i`).classList.remove('fa-check-circle');
		// 	document.querySelector(`#${event.target.id}Field .form-input-error`).classList.add('form-input-error-active');
		// }
	}
}

const selectValidation = (event) => {
	const select = document.getElementById(`${event.target.id}`);
	if (select.selectedIndex === 0){
		document.getElementById(`${event.target.id}Field`).classList.add('form-field-wrong');
		document.getElementById(`${event.target.id}Field`).classList.remove('form-field-correct');
		document.querySelector(`#${event.target.id}Field .form-input-error`).classList.add('form-input-error-active');
	} else {
		document.getElementById(`${event.target.id}Field`).classList.remove('form-field-wrong');
		document.getElementById(`${event.target.id}Field`).classList.add('form-field-correct');
		document.querySelector(`#${event.target.id}Field .form-input-error`).classList.remove('form-input-error-active');
	}
}

const checkboxValidation = (event) => {
	const select = document.getElementById(`${event.target.id}`);
	if (select.checked){
		document.getElementById(`${event.target.id}Field`).classList.remove('form-field-wrong');
		document.getElementById(`${event.target.id}Field`).classList.add('form-field-correct');
		document.querySelector(`#${event.target.id}Field .form-input-error`).classList.remove('form-input-error-active');
	}else{
		document.getElementById(`${event.target.id}Field`).classList.add('form-field-wrong');
		document.getElementById(`${event.target.id}Field`).classList.remove('form-field-correct');
		document.querySelector(`#${event.target.id}Field .form-input-error`).classList.add('form-input-error-active');
	}
}

const FORM = document.getElementsByTagName("form");

for (let index = 0; index < FORM[0].elements.length; index++) {
	const element = FORM[0].elements[index];
	// Aqui validamos los campos del formulario
	if (element.type === "select-one"){
		// Aqui validamos los campos de selección
		element.addEventListener('click', selectValidation);
	}else if (element.type === "checkbox"){
		// Aqui validamos el campo de terminos y condiciones
		element.addEventListener('click', checkboxValidation);
	}else{
		// Aqui validamos los campos input
		element.addEventListener('keyup', validarFormulario);
		element.addEventListener('blur', validarFormulario);
	}
}

FORM[0].addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('conditions');
	// Evaluamos que el campo textArea donde va el mensaje este correcto, en caso contrario mostramos el mensaje de error
	if (!fields.message){
		document.getElementById(`messageField`).classList.add('form-field-wrong');
		document.getElementById(`messageField`).classList.remove('form-field-correct');
		document.querySelector(`#messageField i`).classList.add('fa-times-circle');
		document.querySelector(`#messageField i`).classList.remove('fa-check-circle');
		document.querySelector(`#messageField .form-input-error`).classList.add('form-input-error-active');
	}
	// Evaluamos que el campo checkbox de terminos este encendido, en caso contrario mostramos el mensaje de error
	if(!terminos.checked){
		document.getElementById(`conditionsField`).classList.add('form-field-wrong');
		document.getElementById(`conditionsField`).classList.remove('form-field-correct');
		document.querySelector(`#conditionsField .form-input-error`).classList.add('form-input-error-active');
	}
	// Evaluamos que el campo genero tenga un valor, en caso contrario mostramos el mensaje de error
	const genderSelect = document.getElementById('genderSelect');
	if(genderSelect && genderSelect.selectedIndex === 0){
		document.getElementById(`genderSelectField`).classList.add('form-field-wrong');
		document.getElementById(`genderSelectField`).classList.remove('form-field-correct');
		document.querySelector(`#genderSelectField .form-input-error`).classList.add('form-input-error-active');
	}
	// Evaluamos que el campo donde nos conociste tenga un valor, en caso contrario mostramos el mensaje de error
	const knowSelect = document.getElementById('knowSelect');
	if(knowSelect && knowSelect.selectedIndex === 0){
		document.getElementById(`knowSelectField`).classList.add('form-field-wrong');
		document.getElementById(`knowSelectField`).classList.remove('form-field-correct');
		document.querySelector(`#knowSelectField .form-input-error`).classList.add('form-input-error-active');
	}
	if(fields.name && fields.lastName && fields.userName && fields.email && fields.address && fields.country && fields.state && fields.zip && fields.message && terminos.checked && knowSelect.selectedIndex !== 0 && genderSelect.selectedIndex !== 0){
		// Todos los inputs y terminos estan correctos, ahora vamos a validar las selecciones
		// Comenzamos con la selección de género
		const select = document.getElementById('genderField');
		const option = select.options[select.selectedIndex]
		// formulario.reset();

		// document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		// setTimeout(() => {
		// 	document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		// }, 5000);

		// document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
		// 	icono.classList.remove('formulario__grupo-correcto');
		// });
	} 
	// else {
	// 	document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	// }
});

// const validarPassword2 = () => {
// 	const inputPassword1 = document.getElementById("password").value;
//   const inputPassword2 = document.getElementById("password2").value;
// 	if (inputPassword1.length === inputPassword2.length){
// 		if (inputPassword1 === inputPassword2) return true
// 	}
// 	return false
// }

/*
Validación de los inputs:
	expresión = la expresion regular del input (campo) a evaluar
	input = el input (campo) a evaluar donde accederemos a su valor
	id = Id del input (campo)
*/
const validarCampo = (expresion, input, id) => {
	if(expresion.test(input.value)){
		// Los datos introducidos son correctos
		document.getElementById(`${id}Field`).classList.remove('form-field-wrong');
		document.getElementById(`${id}Field`).classList.add('form-field-correct');
		document.querySelector(`#${id}Field i`).classList.add('fa-check-circle');
		document.querySelector(`#${id}Field i`).classList.remove('fa-times-circle');
		document.querySelector(`#${id}Field .form-input-error`).classList.remove('form-input-error-active');
		if (id === "password") document.getElementById(`${id}2`).classList.remove('pointer-evnt-none');
		fields[id] = true;
	} else {
		document.getElementById(`${id}Field`).classList.add('form-field-wrong');
		document.getElementById(`${id}Field`).classList.remove('form-field-correct');
		document.querySelector(`#${id}Field i`).classList.add('fa-times-circle');
		document.querySelector(`#${id}Field i`).classList.remove('fa-check-circle');
		document.querySelector(`#${id}Field .form-input-error`).classList.add('form-input-error-active');
		if (id === "password") document.getElementById(`${id}2`).classList.add('pointer-evnt-none')
		fields[id] = false;
	}
}






