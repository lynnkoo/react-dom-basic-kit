import * as React from 'react'

type IInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange?: (target: HTMLInputElement) => void
}

export const Input: React.FC<IInputProps> = (props) => {
  const { onChange, ...otherProps } = props
  const [typing, setTyping] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange && !typing) {
        onChange(e.target)
      }
    },
    [typing],
  )
  React.useEffect(() => {
    if (onChange && !typing && inputRef.current) {
      onChange(inputRef.current)
    }
  }, [typing])
  return (
    <input
      {...otherProps}
      ref={inputRef}
      onChange={onInputChange}
      onCompositionStart={() => setTyping(true)}
      onCompositionEnd={() => setTyping(false)}
    />
  )
}
