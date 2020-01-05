import * as React from 'react'
declare type IAppContainerProps = {
  basename?: string
  loading?: any
}
export declare const AppContext: React.Context<any>
export declare function useToastError(error: any): void
export declare function useToggleToast(text?: string): (msg?: any) => void
export declare const Container: React.FC<IAppContainerProps>
export {}
