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
    assert.equal($('h2', firstDog).text(), 'dog1', 'First dog is called dog1');
    assert.equal($('.owner-name', firstDog).text(), 'Paul', 'Owner of the first dog is called Paul');
  });
});
