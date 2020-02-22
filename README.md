## react-dom-basic-kit

You can use custom components by hooks simplify.

### Container

this is a base component, you must set it on base dom like `Provider`

```javascript
export const App = () => {
  return (
    <Container>
      { ... }
    </Container>
  )
}
```

### Toast

You can use toast in container

```javascript
export const ToggleToastComponent = () => {
  const toggleToast = useToggleToast({ ... });
  const toggleMessage = () => {
    toggleToast('...')
  }
  return <div onClick={toggleMessage}>Toggle Toast Test</div>
}
```

More examples is in the stories

### Modal

You can use toast in container

```javascript
export const ToggleModalComponent = () => {
  const toggleModal = useToggleModal((mProps: any) => (
    <Modal {...mProps} blankClose>
      <div>Toggle Modal Test</div>
    </Modal>
  ))
  return <div onClick={toggleModal}>Toggle Dialog Modal</div>
}
```

### Theme

```javascript
import styles from './styles/Container.module.scss'
import styles_dark from './styles/Container-dark.module.scss'

function useStyles() {
  return useThemeStyles(styles, { dark: styles_dark })
}

const ThemeingText = () => {
  const cx = useStyles()
  return <div className={cx('test')}>Theme test Text</div>
}

const Comp = () => {
  const { theme, setTheme } = useAppContext()
  const toDark = () => {
    setTheme('dark')
  }
  const clearTheme = () => {
    setTheme('')
  }
  return (...)
}

```

More examples is in the stories

Thanks
