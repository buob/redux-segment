function validateTrackFields(fields: Object, actionType: string) {
  if (typeof actionType !== 'string' && !fields.event) {
    return new Error('missing event field for EventTypes.track');
  }

  return null;
}

function getTrackProperties(fields: Object) {
  if (!fields.properties) return [ 'event', 'options' ];

  return [ 'event', 'properties', 'options' ];
}

function titleize(actionType) {
  return actionType.split('_').map(word => {
    const lowerCaseWord = word.toLowerCase();
    return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
  }).join(' ');
}

function extractFields(obj: Object, keys: Array, actionType: string, options: Object) {
  return keys.map(key => key === 'event' ? obj[key] || options.titleizeActions ? titleize(actionType) : actionType : obj[key]);
}

function extractTrackFields(fields: Object, actionType: string, options: Object) {
  const props = getTrackProperties(fields);

  const err = validateTrackFields(fields, actionType);
  if (err) return err;

  return extractFields(fields, props, actionType, options);
}


export {
  extractTrackFields,
};
