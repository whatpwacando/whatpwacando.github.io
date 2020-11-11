import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-data-transfer',
  templateUrl: './image-data-transfer.component.html',
  styleUrls: ['./image-data-transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDataTransferComponent implements OnInit {

  message = '';
  text = '';
  startTag = '#tallix-start#';
  endTag = '#tallix-end#';

  constructor() { }

  ngOnInit(): void {
  }

  downloadImage(): void {
    const link = document.createElement('a');

    link.download = 'test.png';
    link.style.display = 'none';

    const base = `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEa0lEQVR4Xu3UwQkAMAwDsWb/odNnV+iBMoGRg2d3d2bmOAIECHwuYKg+L0g8AgSegMHyDQQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECF8kSBJeDsCYeAAAAAElFTkSuQmCC`;

    const info = window.btoa(this.startTag + this.message + this.endTag);

    link.href = `${base}${info}`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  uploadFile(event): void {
    console.log(event);
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsText(file);

    reader.addEventListener(
      'load',
      () => {
        console.log(reader.result);
        const result = reader.result as string;
        const data = result.split(this.startTag)[1];
        console.log(data, '------');
        if (data.indexOf(this.endTag) === -1) {
          alert('data not correct');

          return;
        }
        console.log(data.split(this.endTag));
        const r = data.split(this.endTag)[0];
        console.error('message is: ', r);
        this.text = `what you input is : ${r}`;
      },
      false
    );

    event.preventDefault();
    event.stopPropagation();
  }

}
