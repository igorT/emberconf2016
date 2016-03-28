import { test } from 'qunit';
import moduleForAcceptance from 'hello/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dog');

test('visiting /dog', function(assert) {
  visit('/dog/1');

  andThen(function() {
    assert.equal(currentURL(), '/dog/1');
  });
});

test('Correct dog age', function(assert) {
  visit('/dog/1');

  andThen(function() {
    assert.equal(find('.age').text(), '56', 'Dog has the correct age in dog years');
  });
});
