import classNames from 'classnames'
export function transformStyles(styles) {
  const keyMapper = (key) => styles[key]
  return (...opts) => {
    const className = classNames(opts)
    return className
      .split(' ')
      .map(keyMapper)
      .join(' ')
  }
}
