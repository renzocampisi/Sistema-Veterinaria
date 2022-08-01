const logs = JSON.parse(localStorage.getItem("logs"));
const users = JSON.parse(localStorage.getItem("usuariosRegistrados")) ?? []

const logs_container = document.getElementById("logs");
const users_container = document.getElementById("users")

console.log(users)

const deleteUser = (email) => {
  console.log(email)
  const filteredArray = users.filter(user => user.correo !== email)


  console.log(filteredArray)
}




logs.forEach((log) => {
  const li = document.createElement("li");
  li.innerText = `${log.nombre} ----- ${log.correo} ----- ${log.fecha} ----- ${log.hora} `;
  logs_container.insertAdjacentElement("beforeend", li);
});

users.forEach((user) => {
  const li = document.createElement("li");
  li.innerHTML = `
  <div class="row d-flex justify-content-between mb-3">
    <div class="row d-flex justify-content-between align-items-center w-50">
      <div>r
        ${user.nombre}
      </div>
      <div>
        ${user.usuario}
      </div>
      <div>
        ${user.correo}
      </div>
      <div>
        ${user.nombre}
      </div>
    </div>
    <div>
      <button class='btn btn-warning mx-2'>Roles</button>
      <button class='btn btn-danger mx-2' id='delete-user-button'>Eliminar</button>
    </div>
  </div>
  `
  const deleteUserButtonElement = li.querySelector('#delete-user-button')
  deleteUserButtonElement.addEventListener('click', () => {
    deleteUser(`${user.correo}`)
  })

  users_container.insertAdjacentElement("beforeend", li);
})