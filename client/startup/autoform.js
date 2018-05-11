const getValidationContext = AutoForm.getValidationContext;

const validateOne = (context) => {
    const func = (doc, key, option) => {

        return AutoForm.validateField(doc, key, option);
    }
    return (doc, key, option) => Reflect.apply(func, context, [doc, key, option]);
}

AutoForm.getValidationContext = function(formId) {

    const vc = getValidationContext(formId);
    vc.resetValidation = vc.reset;
    vc.validateOne = validateOne(vc);
    return vc;
}