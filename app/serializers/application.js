import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    return payload || { data: {} };
  }
});
