const byId = (id) => document.getElementById(id);

const byClassName = (className) => document.getElementsByClassName(className);

const updateStatus = (status) => (byId('status-bar').style.display = status);
let messageTimeoutId = 0;

let message = '';
const startTag = '#tallix-start#';
const endTag = '#tallix-end#';

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

byId('info').addEventListener('change', (event) => {
    console.log(event);
    message = event.target.value;

    event.preventDefault();
    event.stopPropagation();
});

byId('file').addEventListener('change', (event) => {
    console.log(event);
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsText(file);

    reader.addEventListener(
        'load',
        function () {
            console.log(reader.result);
            const result = reader.result;
            const data = result.split(startTag)[1];
            console.log(data, '------');
            if (data.indexOf(endTag) === -1) {
                alert('data not correct');

                return;
            }
            console.log(data.split(endTag));
            const r = data.split(endTag)[0];
            console.error('message is: ', r);
            byId('image-message').innerHTML = `what you input is : ${r}`;
        },
        false
    );

    event.preventDefault();
    event.stopPropagation();
});

byId('download').addEventListener('click', () => {
    const link = document.createElement('a');
    //设置下载的文件名
    link.download = 'test.png';
    link.style.display = 'none';
    //设置下载路径

    const base = `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEa0lEQVR4Xu3UwQkAMAwDsWb/odNnV+iBMoGRg2d3d2bmOAIECHwuYKg+L0g8AgSegMHyDQQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECF8kSBJeDsCYeAAAAAElFTkSuQmCC`;
    //触发点击

    const info = window.btoa(startTag + message + endTag);

    link.href = `${base}${info}`;

    // console.log('fghjksadas');
    // link.href = src;
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
