module.exports = {


  friendlyName: 'Validate',


  description: 'Validates the given code compared to user\'s key.',


  extendedDescription: '',


  inputs: {
    key: {
      example: '44xtha1v228542u5q6ddxzdoukji1m74',
      description: 'The secret key, which is to be stored with the userdata.',
      required: true
    },
    code: {
      example: '123456',
      description: 'The code the user entered to be validated.',
      required: true
    }
  },


  defaultExit: 'invalid',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },
    
    valid: {
      description: 'Valid code.',
    },

    invalid: {
      description: 'Invalid code.',
    },

  },


  fn: function (inputs,exits) {
    var tfa = require('2fa');
    var opts = {
      // the number of counters to check before what we're given 
      // default: 0 
      beforeDrift: 2,
      // and the number to check after 
      // default: 0 
      afterDrift: 2,
      // if before and after drift aren't specified, 
      // before + after drift are set to drift / 2 
      // default: 0 
      drift: 4,
      // the step for the TOTP counter in seconds 
      // default: 30 
      step: 30
    };
    // for TOTP, the counter is calculated internally using Date.now(); 
    if(tfa.verifyTOTP(inputs.key, inputs.code, opts)){
      return exits.valid();
    } else {
      return exits.invalid();
    }
  },



};
