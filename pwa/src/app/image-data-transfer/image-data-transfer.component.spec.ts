import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDataTransferComponent } from './image-data-transfer.component';

describe('ImageDataTransferComponent', () => {
  let component: ImageDataTransferComponent;
  let fixture: ComponentFixture<ImageDataTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDataTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDataTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
