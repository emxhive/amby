declare module 'ziggy-js' {
    export interface Config {
        url: string;
        port?: number | null;
        defaults?: Record<string, unknown>;
        routes: Record<string, unknown>;
    }

    export type RouteParams = Record<string, unknown> | Array<unknown> | string | number | undefined;
    export type RouteName = string;

    export interface RouteHelper {
        (): { current: () => string };
        (
            name?: RouteName,
            params?: RouteParams,
            absolute?: boolean,
            config?: Config,
            url?: string,
        ): string;
        current?: (name?: RouteName, params?: RouteParams) => boolean;
    }

    export const route: RouteHelper;
}
