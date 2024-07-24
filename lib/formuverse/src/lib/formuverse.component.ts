import { Component } from '@angular/core';
import { FormService } from './core/services/form.service';

@Component({
  selector: 'lib-formuverse-lib',
  standalone: true,
  imports: [],
  providers: [FormService],
  template: `
    <p>
      formuverse-lib works!
    </p>
  `,
  styles: ``
})
export class FormuverseComponent {

}
