export function awaitCheckStatus (props, key, status, callback) {
  if (props.awaitStatuses[key] === status) {
    return callback || true
  }
  return false
}

export function awaitCheckPending (props, key, callback) {
  return awaitCheckStatus(props, key, 'pending', callback)
}

export function awaitCheckSuccess (props, key, callback) {
  return awaitCheckStatus(props, key, 'success', callback)
}

export function awaitCheckFail (props, key, callback) {
	return awaitCheckStatus(props, key, 'fail', callback)
}