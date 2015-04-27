module.exports = {


  friendlyName: 'Generate QR',


  description: 'Generates a QR code to store it by scanning the QR code.',


  extendedDescription: '',


  inputs: {
    application: {
      example: 'MachineDev',
      description: 'The name of the application',
      required: true
    },
    username: {
      example: 'John',
      description: 'The name of the user/account.',
      required: true
    },
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
      example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPUAAAD1CAAAAACt2uy5AAADJElEQVR42u3bwW4iMRAEUP7/p8kxUsSYKnsiEvtx2l3AzJuVGrureTxPfDyoqampqampqampqampqampqal79eP94/t110u/ePGPf7tc5dXbXr04vVJqauqD1WNN/+wlJFggvQnxtVBTU5+mDir35V+Dd9y9VHpPqKmpqUfPXm43x1va8RPjqk9NTU19mzq4ypXLT7ev1NTU1PMn6ODy00J+2WT8e10Famrqf6auso+P/uljiQ81NfVfV8fjHatJbpWHBJqluRRqaur91JN9uZSUPpF+WjXxQk1NfZI6yFarZl/w3mqBIBlZ2pFSU1Nvpa4+brK+9ksFXcWl8zU1NfWm6r6GB4FFcJXBPblcJTn6U1NTn6YeR63pLNzyhrfqUi71SKmpqTdVB+28IG8NDtTL2+EqGaGmpj5JPS7fwQf3s3V9qU7vGDU19cHqqhinoUhwhu/zkGplamrqg9VjYX/SHu9m+1X6+k9NTX2SenKDGiyQluDJ8/VSDaempt5KnYau3WTb8EA9OWWXLkpNTX2menKX2k+eTB7Bg+CFmpqa+pkPtfUJxeQ0XnoFaZxLTU19iLraggYfHLTz0sg4PYcvJbnU1NT7qSeP1tXQSZXapjeBmpqa+pmPBlfJQ9VfrN5bjQtTU1OfqQ6KZzVlElTp/sbc9AsIamrqndWTU8FpLzF4b1/hqampqd8GIFXN7fuBVbcwiTiWe6TU1NT/W9037KqpuOqLIS3LVShMTU19iDoovOnM3D1JRl++Z3ek1NTUW6kn2m9V8hB+JywHu9TU1Kergwg1vUVp4jvZAExzGGpqaurH9G+tgum5qoZPpsDU1NQHqwNNWksnD8/VN0Y/b0dNTX2IOj6mNkMnPTPNiNP/C2pq6uPUaXmsfuiQQoLBlrRlSE1NTT01uzY+D1ev67eb1NTU1Nlesk9Z08Ci6lL+dleBmpr6SHXfS6xS26pep9dCTU1NXQzwVhPFKxvUYJtLTU1N3Z6vq+m5YPOY3uh+jpiamvokdZ999Alt3N17/7o7p3Goqal3UW//oKampqampqampqampqampqamHj++APIwyIKEgmdTAAAAAElFTkSuQmCC',
      description: 'Base64 encoded QR code, set the result as source of an image to make it visible.',
    },

  },


  fn: function (inputs,exits) {
    var tfa = require('2fa');
    var QR = require('qr-image');
    // build data
    var data = 'otpauth://totp/' + encodeURIComponent(inputs.application + ' | ' + inputs.username)
           + '?secret=' + tfa.base32Encode(inputs.key);

    // turn data into a QR code
    var formatter = function(buf) {
      return 'data:image/png;base64,' + buf.toString('base64')
    };
    var qrOpts = { type: 'png' };
    var pngStream = QR.image(data, qrOpts);
    var pngData = [];
    pngStream.on('data', function(d) { pngData.push(d); });
    pngStream.on('end', function() {
      var png = Buffer.concat(pngData);
      return exits.success(formatter(png));
    });
  },



};
