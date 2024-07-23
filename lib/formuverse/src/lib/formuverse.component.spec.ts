import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuverseComponent } from './formuverse.component';

describe('FormuverseComponent', () => {
  let component: FormuverseComponent;
  let fixture: ComponentFixture<FormuverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormuverseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormuverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
