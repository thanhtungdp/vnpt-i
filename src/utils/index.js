export function isStateless(Component) {
  return !Component.prototype.render
}
