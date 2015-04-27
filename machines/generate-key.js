module.exports = {


  friendlyName: 'Generate Key',


  description: 'Generates a crypto secure hex key with 32 characters.',


  extendedDescription: '',


  inputs: {

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      example: '44xtha1v228542u5q6ddxzdoukji1m74',
      description: 'Key was successfully generated.',
    },

  },


  fn: function (inputs,exits) {
    var tfa = require('2fa');
 
    // lets generate a new key for a user 
    // tfa.generateKey(length (optional), cb) 
    tfa.generateKey(32, function(err, key) {
      // crypto secure hex key with 32 characters  
      return exits.success(key);
    });
  },



};
