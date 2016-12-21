'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function validateTrackFields(fields, actionType) {
  if (typeof actionType !== 'string' && !fields.event) {
    return new Error('missing event field for EventTypes.track');
  }

  return null;
}

function getTrackProperties(fields) {
  if (!fields.properties) return ['event', 'options'];

  return ['event', 'properties', 'options'];
}

function titleize(actionType) {
  return actionType.split('_').map(function (word) {
    var lowerCaseWord = word.toLowerCase();
    return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
  }).join(' ');
}

function extractFields(obj, keys, actionType, options) {
  return keys.map(function (key) {
    return key === 'event' ? obj[key] || options.titleizeActions ? titleize(actionType) : actionType : obj[key];
  });
}

function extractTrackFields(fields, actionType, options) {
  var props = getTrackProperties(fields);

  var err = validateTrackFields(fields, actionType);
  if (err) return err;

  return extractFields(fields, props, actionType, options);
}

exports.extractTrackFields = extractTrackFields;