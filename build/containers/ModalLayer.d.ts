import * as React from 'react'
export declare function asModalProps(
  props: any,
): {
  isOpen: any
  onClose: any
  onRemove: any
}
export declare const ModalContext: React.Context<any>
export declare function useToggleModal(modal: any, deps?: any): () => void
export declare function useModal(modal: any, deps?: any): (() => void)[]
export declare function cloneModalContent(
  children: any,
): React.DetailedReactHTMLElement<
  {
    onClick: (e: React.MouseEvent<Element, MouseEvent>) => void
  },
  HTMLElement
>
export declare const ModalLayer: React.FC<any>
