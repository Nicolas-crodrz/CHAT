// * Nicolás Cabrera Rodríguez
var socket = io(); // Se importa socket.io

var mensaje = document.getElementById('mensaje'); // Se obtiene el elemento mensaje

var cajaMensajes = document.getElementById('cajaMensajes'); // Se obtiene el elemento cajaMensajes

var input = document.getElementById('input'); // Se obtiene el elemento input

var ulLista = document.getElementById('ul-lista'); // Se obtiene el elemento ul-lista

var feedback = document.getElementById('feedback'); // Se obtiene el elemento feedback

var timbre = document.getElementById("timbre"); // Se obtiene el elemento timbre

var login = document.getElementById("login"); // Se obtiene el elemento login

var app = document.getElementById("app"); // Se obtiene el elemento app

var entrar = document.getElementById("entrar"); // Se obtiene el elemento entrar

var body = document.getElementById("body"); // Se obtiene el elemento body

var escribiendo = document.getElementsByClassName("escribiendo"); // Se obtiene el elemento escribiendo

var room = document.getElementById("room"); // Se obtiene el elemento room

var inputSala = document.getElementById("inputSala"); // Se obtiene el elemento inputRoom

var entrarSala = document.getElementById("entrarSala"); // Se obtiene el elemento entrarSala

var snoop = document.getElementById("snoop"); // Se obtiene el elemento snoop

//what your name
var nombre = prompt('¿Cómo te llamas?'); // Se pide el nombre


cajaMensajes.addEventListener('submit', (e) => { // Se define el evento submit

  e.preventDefault(); // Se evita que se envie el formulario

  if (input.value) { // Se comprueba que el input no esté vacío

    socket.emit('mensaje del chat', input.value); // Se envia el mensaje

    input.value = ''; // Se vacía el input

  }
});


socket.emit('user', nombre, (data) => { // Se define el evento new user

  if (data) { // Se comprueba que el usuario no exista

    document.getElementById('chat').style.display = 'block'; // Se muestra el chat

    socket.emit('mensaje del chat', `${nombre} se ha unido al chat`); // Se envia el mensaje

  } else {

    alert('El nombre de usuario ya existe'); // Se muestra una alerta

  }
});


socket.on('mensaje del chat', (msg) => { // Se define el evento de mensaje

  var contenido = document.createElement('li'); // Se crea un elemento li

  contenido.textContent = msg; // Se le asigna el mensaje

  mensaje.appendChild(contenido); // Se añade el elemento li al elemento mensaje

  window.scrollTo(0, document.body.scrollHeight); // Se hace scroll hacia abajo

  feedback.innerHTML = ''; // Se vacía el feedback

  //render(data); // Se renderiza el mensaje

});

// ESTAS ESCRIBIENDO-----------------------------------------------------------------------------------------------------------------

input.addEventListener('keypress', () => { // Se define el evento keypress

  socket.emit('typing', nombre.value); // Se envia el mensaje de que está escribiendo
});


socket.on('typing', (data) => { // Se define el evento typing

  feedback.innerHTML = data; // Se muestra el mensaje

  /* setTimeout(() => { // Se define un tiempo de espera
 
     feedback.innerHTML = ''; // Se vacía el feedback
 
   }, 3000);*/
});

// ESTAS ESCRIBIENDO-----------------------------------------------------------------------------------------------------------------

// INICIO LISTA-----------------------------------------------------------------------------------------------------------------

socket.on('userList', (nombre) => { // Se define el evento de mensaje


  ulLista.innerHTML = ''; // Se vacía el elemento ul-lista

  for (let i in nombre) { // Se recorre el objeto

    console.log(nombre); // Se muestra en consola el objeto

    var lista = document.createElement('li'); // Se crea un elemento li

    lista.textContent = nombre[i].nombre; // Se le asigna el nombre del usuario

    ulLista.appendChild(lista); // Se añade el elemento li al elemento mensaje

    window.scrollTo(0, document.body.scrollHeight); // Se hace scroll hacia abajo 
  }


});

// FIN LISTA-----------------------------------------------------------------------------------------------------------------

cajaMensajes.addEventListener('submit', (e) => { // Se define el evento submit

  e.preventDefault(); // Se evita que se envie el formulario

  if (nombre.value) { // Se comprueba que el input no esté vacío

    socket.emit('userList', nombre.value); // Se envia el mensaje

    nombre.value = ''; // Se vacía el input

  };
});


// INICIO TIMBRE-----------------------------------------------------------------------------------------------------------------


function Sound() { // Se define la función Sound

  const audio = document.createElement("audio"); // Se crea un elemento audio

  audio.preload = "auto"; // Se le asigna el atributo preload

  audio.src = "../audio/roblox.mp3"; // Se le asigna el archivo de audio

  if (audio.paused) { // Se comprueba que el audio esté pausado

    audio.play(); // Se reproduce el audio

  }
  audio.currentTime = 0.14; // Se le asigna el tiempo de inicio
  input.value = ''; // Se vacía el input
};


timbre.addEventListener("click", function () { // Se define el evento click

  Sound(); // Se llama a la función Sound

  socket.emit('ding'); // Se envia el mensaje
});



socket.on('ding', (sonido) => { // Se define el evento de mensaje

  Sound(); // Se llama a la función Sound
});





// FIN TIMBRE-----------------------------------------------------------------------------------------------------------------

// INICIO TEMAS-----------------------------------------------------------------------------------------------------------------

socket.on('dark', (oscuro) => { // Se define el evento de mensaje')

  var contenido = document.createElement('li'); // Se crea un elemento li

  contenido.textContent = oscuro; // Se le asigna el mensaje

  mensaje.appendChild(contenido); // Se añade el elemento li al elemento mensaje

  window.scrollTo(0, document.body.scrollHeight); // Se hace scroll hacia abajo

  feedback.innerHTML = ''; // Se vacía el feedback

});

input.addEventListener('keypress', () => { // Se define el evento keypress

  if (input.value === '$dark') {

    body.style.backgroundColor = '#535353';

    mensaje.style.backgroundColor = '#2e2e2e';

    cajaMensajes.style.backgroundColor = '#0a0a0a';

    body.style.color = '#fff';

    input.value = '';

    escribiendo.style.color = '#fff';

    socket.on('dark', () => { // Se define el evento de mensaje')

      var contenido = document.createElement('li'); // Se crea un elemento li

      contenido.textContent = `${listauser[socket.id].nombre} se ha pasado al lado oscuro`; // Se le asigna el mensaje

      mensaje.appendChild(contenido); // Se añade el elemento li al elemento mensaje

      window.scrollTo(0, document.body.scrollHeight); // Se hace scroll hacia abajo

      feedback.innerHTML = ''; // Se vacía el feedback

    });

    socket.emit('dark'); // Se envia el mensaje



  } else if (input.value === '$light') {

    body.style.backgroundColor = '#fff';

    body.style.color = '#000';

    mensaje.style.backgroundColor = '#efefef';

    cajaMensajes.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';

    input.value = '';

    escribiendo.style.color = '#000';

  } else if (input.value === '$red') {

    body.style.backgroundColor = '#ff0000';

    mensaje.style.backgroundColor = '#c70404';

    cajaMensajes.style.backgroundColor = '#800101';

    body.style.color = '#fff';

    input.value = '';

    escribiendo.style.color = '#fff';

  } else if (input.value === '$blue') {

    body.style.backgroundColor = '#0000ff';

    mensaje.style.backgroundColor = '#0404d4';

    cajaMensajes.style.backgroundColor = '#040491';

    body.style.color = '#fff';

    input.value = '';

    escribiendo.style.color = '#fff';

  } else if (input.value === '$green') {

    body.style.backgroundColor = '#00ff00';

    mensaje.style.backgroundColor = '#02b302';

    cajaMensajes.style.backgroundColor = '#017d01';

    body.style.color = '#000';

    input.value = '';

    escribiendo.style.color = '#fff';
  }


});

// FIN TEMAS-----------------------------------------------------------------------------------------------------------------

// INICIO ANIMACION CON GIFS-----------------------------------------------------------------------------------------------------------------

// INICIO GIFS-----------------------------------------------------------------------------------------------------------------


// * snoop dogg

function snoopD() { // Se define la función snoopD

    function Sound() { // Se define la función Sound

      const audio = document.createElement("audio"); // Se crea un elemento audio

      audio.preload = "auto"; // Se le asigna el atributo preload

      audio.src = "../audio/snoop.mp3"; // Se le asigna el archivo de audio

      if (audio.paused) { // Se comprueba que el audio esté pausado

        audio.play(); // Se reproduce el audio
        snoop.style.display = 'block'; // Se muestra el chat
      }
      audio.currentTime = 0.14; // Se le asigna el tiempo de inicio

      input.value = ''; // Se vacía el input

      audio.onended = function () { // Se define el evento onended
        snoop.style.display = 'none'; // Se oculta el chat
      };

    };

    Sound(); // Se llama a la función Sound
  };
  
socket.on('gifs', (gifs) => { // Se define el evento de mensaje')

  snoopD();  // Se llama a la función snoopD

});



// * john cena

function johnCena() { // Se define la función snoopD

  function Sound() { // Se define la función Sound

    const audio = document.createElement("audio"); // Se crea un elemento audio

    audio.preload = "auto"; // Se le asigna el atributo preload

    audio.src = "../audio/cena.mp3"; // Se le asigna el archivo de audio

    if (audio.paused) { // Se comprueba que el audio esté pausado

      audio.play(); // Se reproduce el audio
      
    }
    audio.currentTime = 0; // Se le asigna el tiempo de inicio

    // cuando el adio llegue al segundo 3.10 cena cambia el stilo a display block
    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime >= 3.10) {
        cena.style.display = 'block';
      }
    });

    input.value = ''; // Se vacía el input

    audio.onended = function () {
      cena.style.display = 'none'; // Se oculta el chat
    };

  };

  Sound(); // Se llama a la función Sound
};

socket.on('john', (cena) => { // Se define el evento de mensaje')

johnCena();  // Se llama a la función snoopD

});



// * toasty 

function toasty() { // Se define la función snoopD

  function Sound() { // Se define la función Sound

    const audio = document.createElement("audio"); // Se crea un elemento audio

    audio.preload = "auto"; // Se le asigna el atributo preload

    audio.src = "../audio/toasty.mp3"; // Se le asigna el archivo de audio

    if (audio.paused) { // Se comprueba que el audio esté pausado

      audio.play(); // Se reproduce el audio
      toasty0.style.display = 'block'; // Se muestra el chat
    }
    audio.currentTime = 0; // Se le asigna el tiempo de inicio

    input.value = ''; // Se vacía el input

    audio.onended = function () { // Se define el evento onended
      toasty0.style.display = 'none'; // Se oculta el chat
    };

  };

  Sound(); // Se llama a la función Sound
};

socket.on('toasty', (mk) => { // Se define el evento de mensaje')

toasty();  // Se llama a la función snoopD

});

// FIN GIFS-----------------------------------------------------------------------------------------------------------------


input.addEventListener('keypress', () => { // Se define el evento keypress



  if (input.value === '$snoop') { // Se comprueba que el input tenga el valor $snoop

    snoopD(); // Se llama a la función snoopD

    socket.emit('gifs'); // Se envia el mensaje


  } else if (input.value === '$john') {

    johnCena(); // Se llama a la función snoopD

    socket.emit('john'); // Se envia el mensaje

  } else if(input.value === '$toasty'){

    toasty(); // Se llama a la función snoopD

    socket.emit('toasty'); // Se envia el mensaje
  }


});




// FIN ANIMACION CON GIFS-----------------------------------------------------------------------------------------------------------------



// INICIO LOGIN-----------------------------------------------------------------------------------------------------------------

entrar.addEventListener("click", () => { // Se define el evento click

  login.style.display = 'none'; // Se oculta el login

  room.style.display = 'block'; // Se muestra el chat
});

entrarSala.addEventListener("click", () => { // Se define el evento click

  room.style.display = 'none'; // Se oculta el login

  app.style.display = 'block'; // Se muestra el chat
});

// FIN LOGIN-----------------------------------------------------------------------------------------------------------------




// INICIO ANIMACION TEXTO LOGIN-----------------------------------------------------------------------------------------------------------------


var string = `BIENVENIDO AL CHAT ${nombre.toUpperCase()}`; // Se define la variable string

var str = string.split(""); // Se divide la variable string en un array

var el = document.getElementById('str'); // Se define el elemento str

(function animate() { // Se define la función animate

  str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running); // Se comprueba que el array tenga más elementos 

  var running = setTimeout(animate, 90); // Se define el tiempo de espera
})();

// FIN ANIMACION TEXTO LOGIN-----------------------------------------------------------------------------------------------------------------

