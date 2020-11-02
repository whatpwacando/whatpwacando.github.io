const byId = (id) => document.getElementById(id);

const byClassName = (className) => document.getElementsByClassName(className);

const updateStatus = (status) => (byId('status-bar').style.display = status);
let messageTimeoutId = 0;
window.addEventListener('load', async () => {
    updateStatus('none');
    checkInternet();
});

byId('reload').addEventListener('click', () => {
    updateStatus('block');
    window.location.reload();
});

byId('no-keyboard').addEventListener('focus', (event) => {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
});

byId('download').addEventListener('click', () => {
    const link = document.createElement('a');
    //设置下载的文件名
    link.download = 'test.png';
    link.style.display = 'none';
    //设置下载路径
    var blob = new Blob(['12312312']);

    //这里导出src，然后把这里的src赋给上面的src即可
    var src = URL.createObjectURL(blob);
    link.href = src;
    //触发点击
    document.body.appendChild(link);
    link.click();
    //移除节点
    document.body.removeChild(link);
});



const mountItemClickEvent = () => {
    for (let item of byClassName('item')) {
        item.addEventListener('click', (evnet) => {
            console.log(event);
            clearTimeout(messageTimeoutId);
            byId('message').style.display = 'block';
            messageTimeoutId = setTimeout(() => {
                byId('message').style.display = 'none';
            }, 3000);
        });
    }
};

mountItemClickEvent();

const checkInternet = () => {
    const { onLine } = navigator;
    byId('device').setAttribute(
        'class',
        onLine ? 'iconfont icon-deviceon' : 'iconfont icon-deviceoff'
    );
};
