import _ from 'lodash';

class Exception {

  constructor(message = '', code = '') {
    if(_.isError(message)) this.message = message.message;
    else this.message = message;
    this.code = code;
  }

  getCode() {
    return this.code;
  }

  getMessage() {
    return this.message;
  }

}

export default Exception;
