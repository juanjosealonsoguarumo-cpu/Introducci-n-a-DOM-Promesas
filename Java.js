const usuarios = [
    { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", rol: "Admin" },
    { id: 2, nombre: "Juan Pérez", email: "juan@ejemplo.com", rol: "Editor" },
    { id: 3, nombre: "Maria López", email: "maria@ejemplo.com", rol: "Usuario" }
];
const buscarUsuarioEnBD = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuarioEncontrado = usuarios.find(u => u.id === parseInt(id));
            
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
            resultContainer.innerHTML = `<p class="error">❌ ${error}</p>`;
        })
        .finally(() => {
            btnSearch.disabled = false;
            console.log("Búsqueda finalizada.");
        });
});