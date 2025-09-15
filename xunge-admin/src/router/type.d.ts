export declare type RouteConfig = {
    path: string;
    component?: string;
    children?: RouteConfig[];
    redirect?: string;
};