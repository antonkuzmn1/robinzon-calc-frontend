import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmComponent } from './fm.component';

describe('FmComponent', () => {
  let component: FmComponent;
  let fixture: ComponentFixture<FmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
