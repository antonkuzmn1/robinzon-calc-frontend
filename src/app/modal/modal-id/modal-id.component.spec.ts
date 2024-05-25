import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIdComponent } from './modal-id.component';

describe('ModalIdComponent', () => {
  let component: ModalIdComponent;
  let fixture: ComponentFixture<ModalIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
