var request = require('request');
module.exports = (function() {
    var _apiKey;
    function setKey(apiKey) {
        _apiKey = apiKey;
    }
    function charactersGetAll() {
        function getCharacter(name) {
            return new Promise(function(resolve, reject) {
                request('https://api.guildwars2.com/v2/characters?id=' + name, {
                    'auth': {
                        'bearer': _apiKey
                    }
                }, function(err, res, body) {
                    if(err) { reject(err); }
                    else { resolve(JSON.parse(body)); }
                }); 
            });
        }
        return new Promise(function(resolve, reject) {
            request('https://api.guildwars2.com/v2/characters', {
                'auth': {
                    'bearer': _apiKey
                }
            }, function(err, res, body) {
                var listPromises = [];
                if(err) { reject(err); }
                if(body !== undefined) {
                    body = JSON.parse(body);
                    for(var i = 0; i < body.length; i++) {
                        listPromises.push(getCharacter(body[i]));
                    }
                    resolve(Promise.all(listPromises)); 
                } else {
                    reject('Failed to get character list');
                }
            });
        });
    }
    return {
        setAPIKey: setKey,
        characters: {
            getAll: charactersGetAll
        }
    };
});