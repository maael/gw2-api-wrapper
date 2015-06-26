var GW2api = require('..'),
    chai = require('chai'),
    should = chai.should();

chai
.use(require('chai-things'))
.use(require("chai-as-promised"));

describe('API', function() {
    var testAPI, testAPI2;
    describe('initialization', function() {
        before(function() {
            testAPI = GW2api();
            testAPI2 = GW2api();
        });
        it('can set an API key to subsequently use', function() {
            testAPI.setAPIKey("544670F8-10AC-B448-9FC0-BC90BEA65E971A932417-C99F-443F-BE5B-5C4C5BBF91FF");
        });
        it('can initialize multiple instances with different API keys', function() {
            testAPI2.setAPIKey("09415B9A-C9DA-EB4C-8728-4AE8C638A24EE9D1C2B5-C9C0-4D0D-8C5D-FFFDDC337443");
            testAPI2.should.not.equal(testAPI);
        });
    });
    describe('characters', function() {
        describe('getAll', function() {
            var getAllPromise;
            before(function() {
                getAllPromise = testAPI.characters.getAll();
            });
            it('should return an array', function() {
                this.timeout(0);
                return getAllPromise.should.eventually.be.an('array');
            });
            it('should return an array of length equal to the number of characters', function() {
                this.timeout(0);
                return getAllPromise.should.eventually.be.length(9);
            });
            it('should be array of objects with the correct properties', function() {
                this.timeout(0);
                return getAllPromise.then(function(characters) {
                    return characters.every(function(character) {
                        var expectedProperties = ['name', 'race', 'gender', 'profession', 'level', 'guild', 'age', 'created', 'deaths'],
                            actualProperties = Object.keys(character);
                        return expectedProperties.every(function(key) {
                            return (actualProperties.indexOf(key) > -1 ); 
                        }); 
                    });
                }).should.eventually.be.equal(true);
            });
        });
    });
});