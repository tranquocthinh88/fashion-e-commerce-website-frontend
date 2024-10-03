import axios from 'axios';
import { apiUrl } from './api-url';

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export enum ContentType {
    JSON = 'application/json',
    FORM_DATA = 'multipart/form-data',
    TEXT_PLAIN = 'text/plain',
}

const requestConfig = <T>(endpoint: string, method: Method, data: T, contentType: ContentType) => {
    const headers = {
        'Content-Type': contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }

    const instance = axios.create({
        baseURL: `${apiUrl}/api/v1/`,
        headers,
        withCredentials: true
    })
    return instance.request(
        {
            method,
            url: `${endpoint}`,
            data,
            responseType: "json"
        }
    );
}

export default requestConfig;