import { test } from 'qunit';
import moduleForAcceptance from 'hello/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dogs');

test('List of dogs', function(assert) {
  visit('/dogs');

  andThen(function() {
    assert.equal(find('.dog-profile').length, 4, 'There are four dogs');
  });
});

test('Data for the first dog', function(assert) {
  visit('/dogs');

  andThen(function() {
    let firstDog = find('.dog-profile')[0];
    assert.equal($('h2', firstDog).text().trim(), 'dog1', 'First dog is called dog1');
  });
});

test('Can edit a dog', function(assert) {
  visit('/dogs');
  var firstDog;

  andThen(function() {
    firstDog = find('.dog-profile')[0];
    click($('.edit', firstDog));
  });

  fillIn('input', 'Mr Dog');
  click('.update');

  andThen(function() {
    assert.equal($('h2', firstDog).text().trim(), 'Mr Dog', 'First dog is called Mr Dog now');
    assert.equal(server.db.dogs[0].name, 'Mr Dog', 'Server was updated with the correct name');
  });
});

test('Simple Boolean for dogs', function(assert) {
  visit('/dogs');

  andThen(function() {
    let firstDog = find('.dog-profile')[0];
    assert.equal($('.playsFetch', firstDog).length, 1, 'First dog plays fetch');
    let secondDog = find('.dog-profile')[1];
    assert.equal($('.playsFetch', secondDog).length, 0, 'Second dog does not play fetch');
  });
});

test('Complex Boolean for dogs', function(assert) {
  visit('/dogs');

  andThen(function() {
    let firstDog = find('.dog-profile')[0];
    assert.equal($('.likesCats', firstDog).length, 0, 'First dog does not like cats');
    let secondDog = find('.dog-profile')[1];
    assert.equal($('.likesCats', secondDog).length, 1, 'Second dog likes cats');
  });
});

test('Correct serialization of the dog attributes', function(assert) {
  assert.expect(4);
  visit('/dogs');
  var firstDog;
  server.put('/dogs/1', (db, request) => {
    let savedDog = JSON.parse(request.requestBody).dog;
    assert.equal(savedDog.name, 'Mr Dog', 'Correctly sent the name');
    assert.equal(savedDog.age, 10, 'Correctly sent the age');
    assert.equal(savedDog.plays_fetch, true, 'Correctly sent the fetch boolean');
    assert.equal(savedDog.likes_cats, "false", 'Correctly sent the cats boolean');
  });

  andThen(function() {
    firstDog = find('.dog-profile')[0];
    click($('.edit', firstDog));
  });

  fillIn('input', 'Mr Dog');
  click('.update');
});
