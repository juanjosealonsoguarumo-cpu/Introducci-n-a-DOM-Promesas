const users = [
  {
    id: 1,
    name: "Alejandro Gómez",
    email: "alejandro.gomez@example.com"
  },
  {
    id: 2,
    name: "María Fernanda López",
    email: "maria.lopez@example.com"
  },
  {
    id: 3,
    name: "Carlos Andrés Ruiz",
    email: "carlos.ruiz@example.com"
  },
  {
    id: 4,
    name: "Laura Daniela Martínez",
    email: "laura.martinez@example.com"
  },
  {
    id: 5,
    name: "Juan Sebastián Torres",
    email: "juan.torres@example.com"
  }
]
const buscarUsuarioEnBD = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuarioEncontrado = users.find(u => u.id === parseInt(id));
            
            if (usuarioEncontrado) {
                resolve(usuarioEncontrado);
            } else {
                reject(`No se encontró ningún usuario con el ID: ${id}`);
            }
        }, 2000); 
    });
};

const inputId = document.getElementById('userId');
const btnSearch = document.getElementById('btnSearch');
const resultContainer = document.getElementById('resultContainer');

btnSearch.addEventListener('click', () => {
    const id = inputId.value;

    if (!id) {
        alert("Por favor, escribe un ID");
        return;
    }

    resultContainer.innerHTML = '<p class="loading">Consultando servidor...</p>';
    btnSearch.disabled = true; 
    buscarUsuarioEnBD(id)
        .then(usuario => {

            resultContainer.innerHTML = `
                <div class="success">
                    <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <p><strong>Rol:</strong> ${usuario.rol}</p>
                </div>
            `;
        })
        .catch(error => {
            resultContainer.innerHTML = `<p class="error"> ${error}</p>`;
        })
        .finally(() => {
            btnSearch.disabled = false;
            console.log("Búsqueda finalizada.");
        });
});
