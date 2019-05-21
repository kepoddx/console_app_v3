import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';

export function get$(url: string, config?: AxiosRequestConfig) {
   return config
    ? from(axios.get(url, config))
    : from(axios.get(url));
}

export function post$(url: string, data?: any, config?: AxiosRequestConfig | undefined): Observable<AxiosResponse> {
    if (data && config) return from(axios.post(url, data, config));
    if (data && !config) return from(axios.post(url, data));
    if (!data && config) return from (axios.post(url, null, config));
    return from(axios.post(url));
}

