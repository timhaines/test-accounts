if (Meteor.isClient) {

  Template.hello.greeting = function () {
    return "Welcome to test-accounts.";
  };

  Template.hello.events({
    'click input.twitter' : function () {
      Twitter.requestCredential(function(tokenOrError){
        if(tokenOrError && tokenOrError instanceof Error) {
          console.log('Error:' + tokenOrError);
        } else {
          Meteor.call('retrieveTwitterCredential', tokenOrError, function(error, result) {
            if(error)
              console.log(error.reason);
            else {
              console.log('DEMO ONLY - DON\'T send unfiltered credentials to the client on a production app');
              console.log('Result:', result);
            }
          });
        }
      });
    },
    'click input.facebook' : function () {
      Facebook.requestCredential(function(tokenOrError){
        if(tokenOrError && tokenOrError instanceof Error) {
          console.log('Error:' + tokenOrError);
        } else {
          Meteor.call('retrieveFacebookCredential', tokenOrError, function(error, result) {
            if(error)
              console.log('Error: ' + error.reason);
            else {
              console.log('DEMO ONLY - DON\'T send unfiltered credentials to the client on a production app');
              console.log('Result:', result);
            }
          });
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    retrieveTwitterCredential: function(token) {
      credential = Twitter.retrieveCredential(token);
      if(credential instanceof Error)
        throw new Meteor.Error(500, credential.message);
      else
        return credential;
    },
    retrieveFacebookCredential: function(token) {
      credential = Facebook.retrieveCredential(token);
      if(credential instanceof Error)
        throw new Meteor.Error(500, credential.message);
      else
        return credential;
    }
  })
}
