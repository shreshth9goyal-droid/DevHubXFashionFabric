declare module 'page-flip' {
  export interface PageFlipOptions {
    width: number
    height: number
    size?: 'fixed' | 'stretch'
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    showCover?: boolean
    flippingTime?: number
    usePortrait?: boolean
    startZIndex?: number
    autoSize?: boolean
    maxShadowOpacity?: number
    mobileScrollSupport?: boolean
  }

  export default class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions)

    loadFromImages(images: string[]): void
    flipNext(): void
    flipPrev(): void
    flip(page: number): void
    on(event: string, callback: (e: any) => void): void
    destroy(): void

    getCurrentPageIndex(): number
    getPageCount(): number
  }
}
