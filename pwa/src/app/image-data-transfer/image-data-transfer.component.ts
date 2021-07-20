import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  imgBase64Data = '';
  images = [];
  @ViewChild('img', { static: true }) imgCanvas: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const ele = this.imgCanvas.nativeElement;
    const ctx = ele.getContext('2d');
    const img = new Image();
    img.onload = () => {
      console.log(img.height, img.width)
      ele.height = 300;
      ele.width = 200;
      ctx.drawImage(img, 0, 0);


      // this.imgBase64Data = ele.toDataURL('image/png', 0.1);
    };
    img.src = '../../assets/logo.png';
  }

  messageUpdate(e): void {
    const ctx = this.imgCanvas.nativeElement.getContext('2d');
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.clearRect(0, 200, 200, 100);
    ctx.fillText(this.message, this.imgCanvas.nativeElement.width / 2, 230);
  }

  downloadImage(): void {
    const link = document.createElement('a');

    link.download = 'test.png';
    link.style.display = 'none';

    const base = `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEa0lEQVR4Xu3UwQkAMAwDsWb/odNnV+iBMoGRg2d3d2bmOAIECHwuYKg+L0g8AgSegMHyDQQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECBssPECCQETBYmaoEJUDAYPkBAgQyAgYrU5WgBAgYLD9AgEBGwGBlqhKUAAGD5QcIEMgIGKxMVYISIGCw/AABAhkBg5WpSlACBAyWHyBAICNgsDJVCUqAgMHyAwQIZAQMVqYqQQkQMFh+gACBjIDBylQlKAECF8kSBJeDsCYeAAAAAElFTkSuQmCC`;
    this.imgBase64Data = this.imgCanvas.nativeElement.toDataURL('image/png', 0.1);
    console.log(this.imgBase64Data);
    const data = {
      message: this.message,
      images: [
        base,
        base,
        this.imgBase64Data,
        this.imgBase64Data,
        this.imgBase64Data,
        this.imgBase64Data,
        this.imgBase64Data,
      ]
    };

    const base64 = window.atob(this.imgBase64Data.split('data:image/png;base64,')[1]);

    const info = window.btoa(base64 + this.startTag + JSON.stringify(data) + this.endTag);
    link.href = `data:image/png;base64,${info}`;

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
        if (data.indexOf(this.endTag) === -1) {
          alert('data not correct');

          return;
        }
        console.log(data.split(this.endTag));
        const r = data.split(this.endTag)[0];
        const _ = JSON.parse(r);
        console.error('message is: ', _);

        this.text = `what you input is : ${_.message}`;
        this.images = _.images;

        console.log(this.images)
        this.cdr.markForCheck();
      },
      false
    );

    event.preventDefault();
    event.stopPropagation();
  }

}
