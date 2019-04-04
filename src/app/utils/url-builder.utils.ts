import { Injectable } from '@angular/core';

@Injectable()
export class UrlBuilder {
    build(baseUrl: string, path: string, queryParams?: object): string {
        if (queryParams !== null && queryParams !== undefined) {
            let paramsPath = '';
            const params = Object.values(queryParams);
            for (const key in queryParams) {
                if (queryParams.hasOwnProperty(key)) {
                    const element = queryParams[key];
                    paramsPath += `${key}=${element}&`;
                }
            }
            paramsPath = paramsPath.substring(0, paramsPath.length);
            paramsPath = encodeURIComponent(paramsPath);
            return `${baseUrl}${path}?${paramsPath}`;
        } else {
            return `${baseUrl}${path}`;
        }
    }
}
