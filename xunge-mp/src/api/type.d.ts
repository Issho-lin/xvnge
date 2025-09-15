export type ResBanner = {
    id: number
    bannerName: string
    sort: number
    bannerUrl: string
    /** 发布类型：1 文本内容  2 网址 */
    publishType: number
    publishingContent: string
    creator: string
    createTime: string
    publishTime: string
    status: number
}

export type ReqProduct = {
    productName?: string
    productType?: string
    id?: number
}

export type ResProduct = {
    id: number
    productName: string
    productType: number
    sort: number
    popular: boolean
    productUrl: string
    productContent: string
    creator: string
    createTime: number
    publishTime: number
    status: number
    hotBigUrl: string
    hotSmallUrl: string
}

export type ResActivity = {
    id: number
    activityName: string
    sort: number
    activityTitle: string
    publishType: number
    activityContent: string
    activityLink: string
    creator: string
    createTime: string
    publishTime: string
    status: number
    activityUrl: string
}

export type ResSolution = {
    id: number
    solutionName: string
    publishType: number
    sort: number
    solutionUrl: string
    solutionContent: string
    creator: string
    createTime: string
    publishTime: string
    status: number
}

export type ResDoc = {
    id: number
    docName: string
    docUrl: string
    sort: number
    docContent: string
    creator: string
    createTime: string
    publishTime: string
    status: number
}

export type ReqProductDoc = {
    productName?: string
}

export type ReqById = {
    id: number
}