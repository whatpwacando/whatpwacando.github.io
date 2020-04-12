const byId = id => document.getElementById(id);

const byClassName = className => document.getElementsByClassName(className);

const updateStatus = status => byId('status-bar').style.display = status;
let messageTimeoutId = 0;
window.addEventListener('load', async () => {
    updateStatus('none');
});

byId('reload').addEventListener('click', () => {
    updateStatus('block');
    window.location.reload();
})

const mountItemClickEvent = () => {
    for (let item of byClassName('item')) {
        item.addEventListener('click', (evnet) => {
            console.log(event)
            clearTimeout(messageTimeoutId);
            byId('message').style.display = 'block';
            messageTimeoutId = setTimeout(() => {
                byId('message').style.display = 'none';
            }, 3000);
        })
    }
}

mountItemClickEvent();

const checkInternet = () => {
    const { onLine } = navigator;
    byId('device').attributes.className = onLine ? 'iconfont icon-deviceon' : 'iconfont icon-deviceoff';
    byId('device-info').innerHTML = html;
}
