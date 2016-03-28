import { test } from 'qunit';
import moduleForAcceptance from 'hello/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | cat');

test('Basic Cat profile', function(assert) {
  visit('/cat/1');

  andThen(function() {
    assert.equal(find('.hello').text(), ' Hello I am CAT', 'Cat says hi');
    assert.equal(find('.name').text(), 'cat1', 'Name of the first cat is cat1');
  });
});

test('Another Cat profile', function(assert) {
  visit('/cat/2');

  andThen(function() {
    assert.equal(find('.hello').text(), ' Hello I am CAT', 'Cat says hi');
    assert.equal(find('.name').text(), 'cat2', 'Name of the second cat is cat2');
  });
});

test('Cat Owner Name', function(assert) {
  visit('/cat/1');
  andThen(function() {
    assert.equal(find('.owner').text(), 'Paul', 'Name of the owner of the first cat is Paul');
  });
});

test('Correct cat age', function(assert) {
  visit('/cat/1');

  andThen(function() {
    assert.equal(find('.age').text(), '41', 'Cat has the correct age in cat years');
  });
});

test('Correct cat friends', function(assert) {
  visit('/cat/1');

  andThen(function() {
    assert.equal($('.friends').text().trim().replace(/\s+/g, ' '), 'Friends: cat2 cat3', 'First cat is friends with cats one and three');
  });
});
