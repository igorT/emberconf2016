import { test } from 'qunit';
import moduleForAcceptance from 'hello/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | cats');

test('List of cats', function(assert) {
  visit('/cats');

  andThen(function() {
    assert.equal(find('.cat-profile').length, 6, 'There are six cats');
  });
});

test('Data for the first cat', function(assert) {
  visit('/cats');

  andThen(function() {
    let firstCat = find('.cat-profile')[0];
    assert.equal($('h2', firstCat).text(), 'cat1', 'First cat is called cat1');
    assert.equal($('.owner-name', firstCat).text(), 'Paul', 'Owner of the first cat is called Paul');
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
