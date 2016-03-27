import { test } from 'qunit';
import moduleForAcceptance from 'hello/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | cats');

test('visiting /cats', function(assert) {
  visit('/cats');

  andThen(function() {
    assert.equal(find('.cat-profile').length, 6, 'There are six cats');
    assert.equal($(find('.cat-profile h2')[0]).text(), 'cat1', 'First cat is called cat1');
  });
});
