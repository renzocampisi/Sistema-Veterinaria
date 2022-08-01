//Ejecutando funciones
document
  .getElementById("btn_iniciar_sesion")
  .addEventListener("click", iniciarSesion);
document.getElementById("btn_registrarse").addEventListener("click", (e) => {
  register();
});
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario_login");
var formulario_register = document.querySelector(".formulario_register");
var contenedor_login_register = document.querySelector(
  ".contenedor_login_register"
);
var caja_trasera_login = document.querySelector(".caja_trasera_login");
var caja_trasera_register = document.querySelector(".caja_trasera_register");

const btnSubmitLogin = document.querySelector(".formulario_login button");
const btnSubmitRegistar = document.querySelector(".formulario_register button");
let DB;
//FUNCIONES

function anchoPage() {
  if (window.innerWidth > 850) {
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "block";
  } else {
    caja_trasera_register.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.display = "none";
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
  }
}

anchoPage();

function iniciarSesion() {
  if (window.innerWidth > 850) {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "10px";
    formulario_register.style.display = "none";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";
  } else {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "none";
  }
}

function register() {
  if (window.innerWidth > 850) {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";
  } else {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.display = "none";
    caja_trasera_login.style.display = "block";
    caja_trasera_login.style.opacity = "1";
  }
}

btnSubmitLogin.addEventListener("click", (e) => {
  e.preventDefault();
  //loginUsuario();
  loginLS();
});

btnSubmitRegistar.addEventListener("click", (e) => {
  e.preventDefault();
  //registrarUsuario();
  registroLS();
});

function registrarUsuario() {
  const txtNombreCompleto = document.querySelector(
    '.formulario_register [placeholder="Nombre completo"]'
  );
  const txtCorreo = document.querySelector(
    '.formulario_register [placeholder="Correo Electronico"]'
  );
  const txtUsuario = document.querySelector(
    '.formulario_register [placeholder="Usuario"]'
  );
  const txtPassword = document.querySelector(
    '.formulario_register [placeholder="Contraseña"]'
  );
  console.log(txtNombreCompleto.value);
  console.log(txtCorreo.value);
  console.log(txtUsuario.value);
  console.log(atob(txtPassword.value));

  const nuevoUsuario = {
    nombre: txtNombreCompleto.value,
    correo: txtCorreo.value,
    usuario: txtUsuario.value,
    password: btoa(txtPassword.value),
  };

  const tx = DB.transaction(["usuarios"], "readwrite");
  tx.onerror = (e) => {
    const error = document.querySelector(".message");
    error.innerHTML = `El usuario con este correo ya existe.`;
    //error.style.color = "red";
    error.style.display = "block";
    error.classList.add("alert", "alert-danger");
    setTimeout(() => {
      error.innerHTML = "";
      error.style.display = "none";
      error.classList.remove("alert", "alert-danger");
    }, 3000);
  };
  const objStore = tx.objectStore("usuarios");
  objStore.add(nuevoUsuario);
}

function registroLS() {
  const txtNombreCompleto = document.querySelector(
    '.formulario_register [placeholder="Nombre completo"]'
  );
  const txtCorreo = document.querySelector(
    '.formulario_register [placeholder="Correo Electronico"]'
  );
  const txtUsuario = document.querySelector(
    '.formulario_register [placeholder="Usuario"]'
  );
  const txtPassword = document.querySelector(
    '.formulario_register [placeholder="Contraseña"]'
  );

  const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) ?? []

  const nuevoUsuario = {
    id: usuariosRegistrados.length,
    nombre: txtNombreCompleto.value,
    correo: txtCorreo.value,
    usuario: txtUsuario.value,
    password: btoa(txtPassword.value),
    admin: txtCorreo.value.match(/^admin[\s\S]+/gi),
  };

  usuariosRegistrados.push(nuevoUsuario)

  localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados))
  localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
}

function loginLS() {
  const txtCorreo = document.querySelector(
    '.formulario_login [placeholder="Correo Electronico"]'
  );
  const txtPassword = document.querySelector(
    '.formulario_login [placeholder="Contraseña"]'
  );

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    alert("No hay usuario registrado");
    return;
  }

  if (
    txtCorreo.value === usuario.correo &&
    txtPassword.value === atob(usuario.password)
  ) {
    const fecha = new Date();
    const log = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      fecha: fecha.toDateString(),
      hora: fecha.toLocaleTimeString("es-AR"),
    };

    let logs = JSON.parse(localStorage.getItem("logs"));
    if (!logs) {
      logs = [];
    }

    logs.push(log);

    localStorage.setItem("logs", JSON.stringify(logs));

    if (usuario.admin) {
      window.location.href = ("admin.html");
    } else {
      window.location.href = ("index.html");
    }
  }
}

/*
 function loginUsuarioDB() {
  const txtCorreo = document.querySelector(
    '.formulario_login [placeholder="Correo Electronico"]'
  );
  const txtPassword = document.querySelector(
    '.formulario_login [placeholder="Contraseña"]'
  );
}

function crearUsuariosDB() {
  //crear ka base de datos de usuarios
  const crearDBusuarios = indexedDB.open("usuarios", 1);
  crearDBusuarios.onerror = function () {
    console.log("hubo un error al crear la DB de usuarios");
  };
  crearDBusuarios.onsuccess = function () {
    console.log("DB de usuarios creada");
    DB = crearDBusuarios.result;
    console.log("Base de datos:", DB);
  };
  crearDBusuarios.onupgradeneeded = function (e) {
    const db = e.target.result;
    const objectStore = db.createObjectStore("usuarios", { keyPath: "correo" });
    objectStore.createIndex("correo", "correo", { unique: true });
    objectStore.createIndex("password", "passsword", { unique: false });
    objectStore.createIndex("nombre", "nombre", { unique: false });
    objectStore.createIndex("usuario", "usuario", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });
    console.log("DB creada y lista");
  };
}

crearUsuariosDB();
 */
