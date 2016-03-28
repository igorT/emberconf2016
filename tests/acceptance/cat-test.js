import { test } from 'qunit';
import moduleForAcceptance from 'hello/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | cat');

test('Basic Cat profile', function(assert) {
  visit('/cat/1');

  andThen(function() {
    assert.equal(find('.hello').text(), ' Hello I am CAT', 'Cat says hi');
    assert.equal(find('.name').text(), 'cat1', 'Name of the first cat is cat1');
    assert.equal(find('.owner').text(), 'Paul', 'Name of the owner of the first cat is Paul');
  });
});

test('Correct cat age', function(assert) {
  visit('/cat/1');

  andThen(function() {
    assert.equal(find('.age').text(), '41', 'Cat has the correct age in cat years');
  });
});
