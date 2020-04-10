const byId = (id) => document.getElementById(id);


byId('reload').addEventListener('click', () => {
    window.location.reload();
})