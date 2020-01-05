export declare const IS_MOBILE: boolean
export declare enum BrowserType {
  IE = 'IE',
  Edge = 'Edge',
  Firefox = 'Firefox',
  Opera = 'Opera',
  Safari = 'Safari',
  Chrome = 'Chrome',
}
export declare function isEdgeOrIE(): boolean
export declare const BROWSER_INFO: {
  type: BrowserType | null
  version: number
}
