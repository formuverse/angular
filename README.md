# @formuverse/angular

**@formuverse/angular** is an open-source library that significantly simplifies working with forms in Angular, providing a more intuitive and efficient experience for developers.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Key Features

- **Ease of Use**: Simplifies the creation and management of complex forms.
- **Advanced Validation**: Support for powerful built-in data validation.
- **Customizable Components**: Ready-to-use components that can be easily customized to fit specific project needs.
- **Template Support**: Seamless integration with Angular templates for detailed customization.

## Installation

To use **@formuverse/angular**, you can install it via npm or yarn:

```bash
npm install @formuverse/angular --save
```

or

```bash
yarn add @formuverse/angular
```

##Usage

Importing the Module
Import the FormuverseModule in your AppModule or the module where you want to use the easy forms:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormuverseModule } from '@formuverse/angular';

@NgModule({
  imports: [
    BrowserModule,
    FormuverseModule.forRoot({
      theme: 'tailwind' // or 'bootstrap' based form, by default is 'tailwind'
    })
  ],
  // ...
})
export class AppModule { }
```

Example Usage
Here's a basic example of using @formuverse/angular in your component:

```ts
// myFormData.ts
import { FormData } from '@formuverse/angular';
import { Validator } from '@angular/form';

export const myFormRules: FormData = {
  groups: [
    {
      title: 'Personal Data',
      subtitle: 'Insert All your personal data',
      fields: [
        {
          type: 'text',
          validators: [Validator.required],
          label: 'First Name',
          size: 4,
        },
        {
          type: 'text',
          validators: [Validator.required],
          label: 'Last Name',
          size: 4,
        },
        {
          type: 'select',
          validators: [Validator.required],
          label: 'Gender',
          size: 4,
          option: [
            {
              label: 'Male',
              value: 'M'
            },
            {
              label: 'Female',
              value: 'F'
            },
          ]
        },
        {
          type: 'select',
          validators: [Validator.required],
          label: 'Civil Status',
          id: 'civil_status',
          size: 4,
          option: [
            {
              label: 'Single',
              value: 0
            },
            {
              label: 'Married',
              value: 1
            },
            {
              label: 'Divorced',
              value: 2
            },
            {
              label: 'Widowed',
              value: 3
            },
            {
              label: 'Civil Union',
              value: 4
            },
          ]
        },
        {
          type: 'text',
          validators: [Validator.required],
          label: 'Spouse Full Name',
          size: 6,
          dependencies: [ // you can use dependencies on single field or group
            {
              id: 'civil_status',
              value: [1,3,4],
              criteria: FormCriteriaEnum.INCLUDES
            }
          ]
        },
      ]
    }
  ]
}
```

```ts
//myForms.componentt.ts
import { Component } from '@angular/core';
import { FormBuilder, FormBase } from '@formuverse/angular';

@Component({
  selector: 'app-my-forms',
  templateUrl: './my-forms.component.html',
  styleUrls: ['./my-forms.component.css']
})
export class MyFormsComponent {

  form: FormBase;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(myFormRules);
  }

  onSubmit() {
    if (this.form.isValid) {
      // Logic to handle form submission
    }
  }
}
```

```html
//myForms.componentt.html
<form-base [formData]="form" (ngSubmit)="onSubmit()"></form-base>
```

## Contribution

Contributions are welcome! Feel free to open issues and pull requests to improve @formuverse/angular.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
