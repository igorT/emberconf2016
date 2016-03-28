import { test } from 'qunit';
import moduleForAcceptance from 'hello/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | cats');

test('List of cats', function(assert) {
  visit('/cats');

  andThen(function() {
    assert.equal(find('.cat-profile').length, 6, 'There are six cats');
  });
});

test('Name of the first cat', function(assert) {
  visit('/cats');

  andThen(function() {
    let firstCat = find('.cat-profile')[0];
    assert.equal($('h2', firstCat).text().trim(), 'cat1', 'First cat is called cat1');
  });
});

test('Can delete a cat', function(assert) {
  visit('/cats');

  andThen(function() {
    let firstCat = find('.cat-profile')[0];
    click($('.delete', firstCat));
  });
  andThen(function() {
    assert.equal(server.db.cats.length, 5, 'Cat was succesfully deleted');
  });
});

test('Can edit a cat', function(assert) {
  visit('/cats');
  var firstCat;

  andThen(function() {
    firstCat = find('.cat-profile')[0];
    click($('.edit', firstCat));
  });
  fillIn('input', 'BattleCat');
  click('.update');

  andThen(function() {
    assert.equal($('h2', firstCat).text().trim(), 'BattleCat', 'First cat is called BattleCat now');
    assert.equal(server.db.cats[0].name, 'BattleCat', 'Server was updated with the correct name');
  });
});

test('Owner of the first cat', function(assert) {
  visit('/cats');

  andThen(function() {
    let firstCat = find('.cat-profile')[0];
    assert.equal($('.owner-name', firstCat).text(), 'Paul', 'Owner of the first cat is called Paul');
  });
});

test('Relationships for the first cat', function(assert) {
  visit('/cats');

  andThen(function() {
    let firstCat = find('.cat-profile')[0];
    assert.equal($('.friends', firstCat).text().trim().replace(/\s+/g, ' '), 'Friends: cat2 cat3', 'First cat is friends with cats one and three');
  });
});

test('Correct serialization of the whole cat', function(assert) {
  assert.expect(6);
  visit('/cats');
  var firstCat;
  server.put('/cats/1', (db, request) => {
    let savedCat = JSON.parse(request.requestBody);
    assert.equal(savedCat.name, 'BattleCat', 'Correctly sent the name');
    assert.equal(savedCat.age, 6, 'Correctly sent the age');
    assert.equal(savedCat.owner_name, 'Paul', 'Correctly sent the owner name');
    assert.equal(savedCat.relationships.cat_friends[0], '2', 'Correctly sent the first friend');
    assert.equal(savedCat.relationships.cat_friends[1], '3', 'Correctly sent the second friend');
    assert.equal(savedCat.relationships.best_friend, '3', 'Correctly sent the best friend');
  });


  andThen(function() {
    firstCat = find('.cat-profile')[0];
    click($('.edit', firstCat));
  });
  fillIn('input', 'BattleCat');
  click('.update');
});
