import { Observable, of, empty } from "rxjs";
import { AxiosResponse } from "axios";

import { get$ } from '../../util'
import { map, catchError, expand } from "rxjs/operators";

const config = require('./api.config.json');


export const FB_API = {
    getConfig,
    getAccnts$
};

export function getConfig(node: string) { return config[node]}

export function getAccnts$(): Observable<any> {
    const accntUrl = `${config.baseUrl}/me/adaccounts`;
    const requestConfig = {
        params : {
            access_token: config.accessToken,
            fields: 'name,account_id'
        }
    };
    return get$(accntUrl, requestConfig)
            .pipe(
                map(data => ({ content: data.data.data, next: data.data.paging.next})),
                // expand(({next}) => next ? get$(next) : empty()),
                expand( (data: any) => {
                    if(data.next) return get$(data.next);
                    return empty();
                }),
                // map((res) => res['content']),
                catchError(err => of(handleError(err)))
            )
}

function handleError(err) {
    return { 
        success: false, 
        message: err.message, 
        error: err.response.data.error,
        req: {
            headers:err.headers,
            config: {
                url: err.config.url,
                path: err.request.path,
                headers: JSON.stringify(err.config.headers),
                params: JSON.stringify(err.config.params)
            }
        }
    }
}