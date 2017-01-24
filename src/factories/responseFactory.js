'use strict';

class ResponseFactory {

	constructor() { }

	defaultResponseObject() {
        return {
            success: null,
            code:    null,
            message: null,
            data:    null
        };
    };

    fail(code, errorMessage = null){
        var responseObject = this.defaultResponseObject();

        responseObject.success = false;
        responseObject.code    = code;
        responseObject.message = errorMessage;

        return responseObject;
    };

    sucess(responseData = null){
        var responseObject = this.defaultResponseObject();

        responseObject.success = true;
        responseObject.code    = 1;
        responseObject.data    = responseData;

        return responseObject;
    };
}

export default ResponseFactory;