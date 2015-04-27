module.exports = {


  friendlyName: 'Generate Code',


  description: 'Generates a Code using the users secret key which can then be verified',


  extendedDescription: '',


  inputs: {
    key: {
      example: '44xtha1v228542u5q6ddxzdoukji1m74',
      description: 'The secret key, which is to be stored with the userdata.',
      required: true
    }
  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      example: '123456',
      description: 'Generated a verification code successfully.',
    },

  },


  fn: function (inputs,exits) {
    var tfa = require('2fa');
 
    // calculate the counter for the HOTP (pretending it's actually TOTP) 
    var counter = Math.floor(Date.now() / 1000 / 30);
   
    // generate a valid code (in real-life this will be user-input) 
    var code = tfa.generateCode(inputs.key, counter);

    return exits.success(code);
  },



};
