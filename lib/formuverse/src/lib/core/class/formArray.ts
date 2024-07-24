import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from "@angular/forms";


export class FormuverseArray extends FormArray {
    private _showField = true;

    constructor(
        controls: AbstractControl[],
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public set showField(value: boolean) {
        this._showField = value;
    }

    public get showField() {
        return this._showField;
    }
}