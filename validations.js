// Aqui colocamos las expresiones regulares para validar los input
const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	lastName: /^[a-zA-ZÀ-ÿ\s]{1,70}$/, // Letras y espacios, pueden llevar acentos.
	userName: /^[a-zA-Z0-9\_\-]{2,20}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
	dni: /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	address: /^[a-zA-Z0-9\_\-]{1,150}$/, // Letras, numeros, guion y guion_bajo
	country: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras
	state: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras
	zip: /^[0-9]{4,12}$/, // 4 a 12 digitos.
	message: /^[\s\S]{1,150}$/ // Letras, numeros, guion y guion_bajo
}

// Objeto auxiliar para ir almacenando los valores y si el valor (Content) está correcto o incorrecto
const fields = {
	name: { content: false, value: "" },
	lastName: { content: false, value: "" },
	dni: { content: false, value: "" },
	email: { content: false, value: "" },
	address: { content: false, value: "" },
	country: { content: false, value: "" },
	state: { content:  false, value: "" },
	zip: { content: false, value: "" },
	message: { content: false, value: "" }
}

// Controlador de validaciones del formulario
// event = el grupo seleccionado
const validarFormulario = (event) => {
	// Si el event.target.id pertenece a una de las claves de las expresiones regulares entonces va a validar el campo
	if (expresiones[event.target.id]){
		validarCampo(expresiones[event.target.id], event.target, event.target.id);
	}
}

// Aqui vamos a validar los campos que son selecciones
const selectValidation = (event) => {
	// Primero buscamos y obtenemos del html el elemento que contenga el id que proviene de event.target.id
	const select = document.getElementById(`${event.target.id}`);
	if (select.selectedIndex === 0){
		// Si selectedIndex === 0 entonces no se ha seleccionado un valor del listado y procedemos a mostrar el mensaje de error
		document.getElementById(`${event.target.id}Field`).classList.add('form-field-wrong');
		document.getElementById(`${event.target.id}Field`).classList.remove('form-field-correct');
		document.querySelector(`#${event.target.id}Field .form-input-error`).classList.add('form-input-error-active');
	} else {
		// Sino obtendremos el valor seleccionado 
		document.getElementById(`${event.target.id}Field`).classList.remove('form-field-wrong');
		document.getElementById(`${event.target.id}Field`).classList.add('form-field-correct');
		document.querySelector(`#${event.target.id}Field .form-input-error`).classList.remove('form-input-error-active');
	}
}

// Aqui validamos que este check el boton de las condiciones
const checkboxValidation = (event) => {
	// Primero buscamos y obtenemos del html el elemento que contenga el id que proviene de event.target.id
	const select = document.getElementById(`${event.target.id}`);
	if (select.checked){
		// Si esta checked eso quiere decir que se han aceptado los terminos
		document.getElementById(`${event.target.id}Field`).classList.remove('form-field-wrong');
		document.getElementById(`${event.target.id}Field`).classList.add('form-field-correct');
		document.querySelector(`#${event.target.id}Field .form-input-error`).classList.remove('form-input-error-active');
	}else{
		// No se han aceptado los terminos y procedemos a mostrar el mensaje de error
		document.getElementById(`${event.target.id}Field`).classList.add('form-field-wrong');
		document.getElementById(`${event.target.id}Field`).classList.remove('form-field-correct');
		document.querySelector(`#${event.target.id}Field .form-input-error`).classList.add('form-input-error-active');
	}
}

/*
Validación de los inputs:
	expresión = la expresion regular del input (campo) a evaluar
	input = el input (campo) a evaluar donde accederemos a su valor
	id = Id del input (campo)
*/
const validarCampo = (expresion, input, id) => {
	// Validamos que el valor insertado cumple o no con la expresiom regular que se le asignado a travez del metodo test
	if(expresion.test(input.value)){
		// Los datos introducidos son correctos, quitamos y añadimos el mensaje y el icono correspondiente
		document.getElementById(`${id}Field`).classList.remove('form-field-wrong');
		document.getElementById(`${id}Field`).classList.add('form-field-correct');
		document.querySelector(`#${id}Field i`).classList.add('fa-check-circle');
		document.querySelector(`#${id}Field i`).classList.remove('fa-times-circle');
		// Para el caso dni no utiliza el mensaje de error por eso esta condicion hace que cuando se evalue ese campo no acceda a esta clase
		if (id !== "dni"){
			document.querySelector(`#${id}Field .form-input-error`).classList.remove('form-input-error-active');
		}
		// Actualizaremos nuestro campo fields auxiliar con los datos introducidos en su id correspondiente
		fields[id].content = true;
		fields[id].value = input.value;
	} else {
		// Los datos introducidos son incorrectos, quitamos y añadimos el mensaje y el icono correspondiente
		document.getElementById(`${id}Field`).classList.add('form-field-wrong');
		document.getElementById(`${id}Field`).classList.remove('form-field-correct');
		document.querySelector(`#${id}Field i`).classList.add('fa-times-circle');
		document.querySelector(`#${id}Field i`).classList.remove('fa-check-circle');
		// Para el caso dni no utiliza el mensaje de error por eso esta condicion hace que cuando se evalue ese campo no acceda a esta clase
		if (id !== "dni"){
			document.querySelector(`#${id}Field .form-input-error`).classList.add('form-input-error-active');
		}
		// Actualizaremos nuestro campo fields auxiliar con los datos introducidos en su id correspondiente
		fields[id].content = false;
		fields[id].value = input.value;
	}
}

// INICIO DE LA EJECUCION DE OBTENER LOS ELEMENTOS DEL FORMULARIO
const FORM = document.getElementsByTagName("form");

// Recorremos todos los elementos del formulario desde la posicion 0 hasta el numero de elementos
for (let index = 0; index < FORM[0].elements.length; index++) {
	// En element vamos a ir obteniendo los elementos del formulario en orden
	const element = FORM[0].elements[index];
	// Aqui validamos los campos del formulario
	// Vamos a utilizar un atributo de cada elemento que es el type, el type viene siendo el tipo de dato que es el elemento
	if (element.type === "select-one"){
		// Aqui validamos los campos de selección al hacer click
		element.addEventListener('click', selectValidation);
	}else if (element.type === "checkbox"){
		// Aqui validamos el campo de terminos y condiciones al hacer click
		element.addEventListener('click', checkboxValidation);
	}else{
		// Aqui validamos los campos input, tenemos el keyup que es cuando tocamos dentro del input y el blur cuando tocamos fuera del input
		element.addEventListener('keyup', validarFormulario);
		element.addEventListener('blur', validarFormulario);
	}
}

// En esta parte tenemos escuchando el evento cuando clickamos en el boton enviar donde el boton tiene un type submit
FORM[0].addEventListener('submit', (e) => {
	// Añadimos el preventDefault() para que los datos de los campos no desaparezcan
	e.preventDefault();

	// Evaluamos que el campo textArea donde va el mensaje no este vacio, en caso contrario mostramos el mensaje de error
	if (!fields.message.content){
		document.getElementById(`messageField`).classList.add('form-field-wrong');
		document.getElementById(`messageField`).classList.remove('form-field-correct');
		document.querySelector(`#messageField i`).classList.add('fa-times-circle');
		document.querySelector(`#messageField i`).classList.remove('fa-check-circle');
		document.querySelector(`#messageField .form-input-error`).classList.add('form-input-error-active');
	}
	// Buscamos el elemento de conditions
	const terminos = document.getElementById('conditions');
	// Evaluamos que el campo checkbox de terminos este encendido, en caso contrario mostramos el mensaje de error
	if(!terminos.checked){
		document.getElementById(`conditionsField`).classList.add('form-field-wrong');
		document.getElementById(`conditionsField`).classList.remove('form-field-correct');
		document.querySelector(`#conditionsField .form-input-error`).classList.add('form-input-error-active');
	}
	// Evaluamos que el campo genero tenga un valor, en caso contrario mostramos el mensaje de error
	// Buscamos el elemento de genderSelect
	const genderSelect = document.getElementById('genderSelect');
	if(genderSelect && genderSelect.selectedIndex === 0){
		document.getElementById(`genderSelectField`).classList.add('form-field-wrong');
		document.getElementById(`genderSelectField`).classList.remove('form-field-correct');
		document.querySelector(`#genderSelectField .form-input-error`).classList.add('form-input-error-active');
	}
	// Evaluamos que el campo donde nos conociste tenga un valor, en caso contrario mostramos el mensaje de error
	// Buscamos el elemento de knowSelect
	const knowSelect = document.getElementById('knowSelect');
	if(knowSelect && knowSelect.selectedIndex === 0){
		document.getElementById(`knowSelectField`).classList.add('form-field-wrong');
		document.getElementById(`knowSelectField`).classList.remove('form-field-correct');
		document.querySelector(`#knowSelectField .form-input-error`).classList.add('form-input-error-active');
	}
	// Una vez validado los campos anteriores, validaremos todo junto con la constante fields que es nuestra variable auxiliar que contiene los datos de los inputs
	if(fields.name.content && fields.lastName.content && fields.dni.content && fields.email.content && fields.address.content && fields.country.content && fields.state.content && fields.zip.content && fields.message.content && terminos.checked && knowSelect.selectedIndex !== 0 && genderSelect.selectedIndex !== 0){
		// Todos los inputs y terminos estan correctos, ahora vamos armar nuestro objeto final con todos los valores
		const dataFinal = {
			name: fields.name.value,
			lastName: fields.lastName.value,
			dni: fields.dni.value,
			email: fields.email.value,
			address: fields.address.value,
			country: fields.country.value,
			state: fields.state.value,
			zip: fields.zip.value,
			message: fields.message.value,
			gender: genderSelect.value,
			knowWhere: knowSelect.value
		}

		// Ahora procedemos a guardarlos en el localStorage
		// utilizamos el metodo setItem donde necesita como primer parametro una clave en este caso se ha colocado Datos del formulario y necesita un valor como segundo parametro que sea un string
		// JSON.stringify convierte un objecto JSON a un string
		localStorage.setItem('Datos del formulario', JSON.stringify(dataFinal))

		// Ahora buscamos el dato que hemos almacenado en el localStorage
		// Utilizamos el metodo getItem que necesita como primer parametro el nombre de la clave
		const dataFormLocalStorage = localStorage.getItem('Datos del formulario')
		// Si queremos convertir de nuevo el string a JSON debemos utilizar el metodo JSON.parse donde le pasamos el string que es un objeto por parametro
		const dataFormParse = JSON.parse(dataFormLocalStorage)
		
		// Aqui limpiamos los datos del formulario
		FORM[0].reset();

		// Aqui mostramos el mensaje que todo esta correcto y lo quitamos en 5 segundos con el setTimeout
		// SetTimeout es una funcion ejecuta una accion luego que transcurra el tiempo que se le indique despues de la coma
		// Donde cada 1000 es 1 segundo
		document.getElementById('form-message-good').classList.add('form-message-good-active');
		setTimeout(() => {
			document.getElementById('form-message-good').classList.remove('form-message-good-active');
		}, 5000);

		// Eliminamos los mensajes de error que puedan quedar por el html de todos los iconos
		document.querySelectorAll('.form-field-correct').forEach((icon) => {
			icon.classList.remove('form-field-correct');
		});
	} else {
		// Mostramos el mensaje de error si no se han rellenado todos los campos correctamente, luego de 5 segundos desaparece el mensaje
		document.getElementById('form-message').classList.add('form-message-active');
		setTimeout(() => {
			document.getElementById('form-message').classList.remove('form-message-active');
		}, 5000);
	}
});


