/** 
  author: jevin sutariya
  time: 05:48PM 10-02-2023
  information: To handle errors of the website dynamically and easily.
*/

class ErrorHandler extends Error{
  constructor(message, statusCode)
  /*
    message: error message which can be shown to user
    statusCode: on error which status code send to the client in responce
  */
  {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
  
}

module.exports = ErrorHandler;