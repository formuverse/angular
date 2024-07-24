import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFieldComponent } from './single-field.component';

describe('SingleFieldComponent', () => {
  let component: SingleFieldComponent;
  let fixture: ComponentFixture<SingleFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
