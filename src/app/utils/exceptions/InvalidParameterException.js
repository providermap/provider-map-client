
class InvalidParameterException extends Error {

  constructor(...args) {
    // Pass args to parent class constructor
    super(...args);
  }

}

export default InvalidParameterException;