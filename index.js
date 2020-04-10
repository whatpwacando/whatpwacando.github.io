const byId = (id) => document.getElementById(id);

const updateStatus = status => byId('status').innerHTML = status;

window.addEventListener('load', async () => {
    updateStatus('stabled');
});

byId('reload').addEventListener('click', () => {
    updateStatus('uploading');
    window.location.reload();
})