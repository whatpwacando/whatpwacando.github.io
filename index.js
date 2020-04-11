const byId = (id) => document.getElementById(id);

const updateStatus = status => byId('status-bar').style.display = status;

window.addEventListener('load', async () => {
    updateStatus('none');
});

byId('reload').addEventListener('click', () => {
    updateStatus('block');
    window.location.reload();
})