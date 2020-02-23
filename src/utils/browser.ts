export enum BrowserType {
  IE = 'IE',
  Edge = 'Edge',
  Firefox = 'Firefox',
  Opera = 'Opera',
  Safari = 'Safari',
  Chrome = 'Chrome',
  Unknow = 'Unknow',
}

type IbrowserTypeMap = {
  [key: string]: (ua: string) => boolean
}

type IbrowserVersionMap = {
  [key: string]: RegExp[]
}

const browserTypeMap: IbrowserTypeMap = {
  [BrowserType.Opera]: (ua) => ua.includes('Opera'),
  [BrowserType.IE]: (ua) => ua.includes('MSIE') || ua.includes('Trident'),
  [BrowserType.Edge]: (ua) => ua.includes('Edge'),
  [BrowserType.Firefox]: (ua) => ua.includes('Firefox'),
  [BrowserType.Safari]: (ua) => ua.includes('Safari') && !ua.includes('Chrome'),
  [BrowserType.Chrome]: (ua) => ua.includes('Chrome') && ua.includes('Safari'),
}

const browserVersionMap: IbrowserVersionMap = {
  [BrowserType.Opera]: [/Opera.([\d.]+)/],
  [BrowserType.IE]: [/MSIE ([\d.]+)/, /rv:([\d.]+)/],
  [BrowserType.Edge]: [/Edge\/([\d.]+)/],
  [BrowserType.Firefox]: [/Firefox\/([\d.]+)/],
  [BrowserType.Safari]: [/Version\/([\d.]+)/],
  [BrowserType.Chrome]: [/Chrome\/([\d.]+)/],
}

export function getBrowserType(): BrowserType {
  const userAgent = navigator.userAgent
  for (const browserType of Object.keys(browserTypeMap)) {
    if (browserTypeMap[browserType](userAgent)) {
      return browserType as BrowserType
    }
  }
  return BrowserType.Unknow
}

export function getBrowserVersion(browserType: BrowserType): string {
  const userAgent = navigator.userAgent
  const regexps = browserVersionMap[browserType]
  for (const regexp of regexps) {
    const match = userAgent.match(regexp)
    if (match) {
      return match[1]
    }
  }
  console.log(userAgent, browserType)
  return '-1'
}

// function getBrowserInfo() {
//   let type: BrowserType | null = null
//   let match: RegExpMatchArray | null = null
//   const userAgent = navigator.userAgent
//   if (userAgent.includes('Opera')) {
//     type = BrowserType.Opera
//     // match = userAgent.match(/Opera.([\d.]+)/)
//   } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
//     type = BrowserType.IE
//     // match = userAgent.match(/MSIE ([\d.]+)/) || userAgent.match(/rv:([\d.]+)/)
//   } else if (userAgent.includes('Edge')) {
//     type = BrowserType.Edge
//     // match = userAgent.match(/Edge\/([\d.]+)/)
//   } else if (userAgent.includes('Firefox')) {
//     type = BrowserType.Firefox
//     // match = userAgent.match(/Firefox\/([\d.]+)/)
//   } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
//     type = BrowserType.Safari
//     // match = userAgent.match(/Version\/([\d.]+)/)
//   } else if (userAgent.includes('Chrome') && userAgent.includes('Safari')) {
//     type = BrowserType.Chrome
//     // match = userAgent.match(/Chrome\/([\d.]+)/)
//   }
//   return { type, version: match ? parseInt(match[1]) : -1 }
// }

// export function isEdgeOrIE(): boolean {
//   const type = BROWSER_INFO.type
//   return type === BrowserType.IE || type === BrowserType.Edge
// }

// export const BROWSER_INFO = getBrowserInfo()
