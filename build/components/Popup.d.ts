export declare type IPopupProps = {
  isOpen: boolean
  onClose: () => void
  onRemove: () => void
}
export declare const enhancePopupComponent: (
  WrappedComponent: any,
  layerClassName?: string | undefined,
) => (props: any) => any
export declare function usePopupShown(isOpen?: boolean): boolean
export declare function usePopupLayerOverlay(
  shown: boolean,
  onRemove?: any,
): () => void
