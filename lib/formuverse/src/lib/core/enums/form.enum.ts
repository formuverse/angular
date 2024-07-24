export type FormFieldType = FormFieldSingleTypeEnum | FormFieldMultipleTypeEnum;


export enum FormFieldMultipleTypeEnum {
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select',
    MULTISELECT = 'multiselect',
}

export enum FormFieldSingleTypeEnum {
    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email',
    NUMBER = 'number',
    DATE = 'date',
    TIME = 'time',
    DATETIME = 'datetime',
    HIDDEN = 'hidden',
    TEXTAREA = 'textarea',
}

export enum CriteriaEnum {
    EQUALS = 'equals',
    NOT_EQUALS = 'not_equals',
    GREATER_THAN = 'greater_than',
    LESS_THAN = 'less_than',
    GREATER_THAN_OR_EQUALS = 'greater_than_or_equals',
    LESS_THAN_OR_EQUALS = 'less_than_or_equals',
    CONTAINS = 'contains',
    NOT_CONTAINS = 'not_contains',
}
