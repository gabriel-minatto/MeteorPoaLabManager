const getValidationContext = AutoForm.getValidationContext;

const validateOne = (context) => {
    const func = (doc, key, option) => {

        return AutoForm.validateField(doc, key, option);
    }
    return (doc, key, option) => Reflect.apply(func, context, [doc, key, option]);
};

AutoForm.getValidationContext = function(formId) {

    const vc = getValidationContext(formId);
    vc.resetValidation = vc.reset;
    vc.validateOne = validateOne(vc);
    return vc;
};

CfsAutoForm.Util.deepFind = function(obj, path){

    // updates nao recebem createdAt pq esse valor sempre eh setado apenas no insert por motivos obvios
    const isUpdate = (!obj.createdAt) ? true : false;

    path = path.split('.');
    let flag = false;
    for (i = 0; i < path.length - 1; i++) {

        obj = obj[path[i]];
        flag = true;
    }

    if (path.length == 1 && !flag && obj[path[0]] && Array.isArray(obj[path[0]]) && isUpdate) {

        obj = obj[path[0]];
    }

    return obj;
};