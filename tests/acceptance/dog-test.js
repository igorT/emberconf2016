import { test } from 'qunit';
import moduleForAcceptance from 'hello/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dog');

test('visiting /dog', function(assert) {
  visit('/dog/1');

  andThen(function() {
    assert.equal(currentURL(), '/dog/1');
  });
});
