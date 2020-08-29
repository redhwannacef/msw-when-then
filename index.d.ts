type HttpResponse = {
  state: number;
  body?: any;
};

export const response: (HttpResponse) => HttpResponse;
export const ok: (body?: any) => HttpResponse;
export const created: (body?: any) => HttpResponse;
export const accepted: (body?: any) => HttpResponse;
export const badRequest: (body?: any) => HttpResponse;
export const unauthorized: (body?: any) => HttpResponse;
export const notFound: (body?: any) => HttpResponse;

type RestMethod = "get" | "post" | "put" | "patch" | "options" | "delete";
type Mask = RegExp | string;
type RestMask = {
  method: RestMethod;
  url: Mask;
};

export const mask: (method: RestMethod, url: Mask) => RestMask;
export const get: (url: Mask) => RestMask;
export const post: (url: Mask) => RestMask;
export const put: (url: Mask) => RestMask;
export const _delete: (url: Mask) => RestMask;
export const patch: (url: Mask) => RestMask;
export const options: (url: Mask) => RestMask;

type BodyRequest = { body: any };
type HeadersRequest = { headers: any };
type ParamsRequest = { params: any };
type RequestData = (BodyRequest | HeadersRequest | ParamsRequest)[];
type Request = {
  body?: BodyRequest;
  headers?: HeadersRequest;
  params?: ParamsRequest;
};

export const request: (...requestData: RequestData) => Request;

export const withBody: (body: any) => BodyRequest;
export const withHeaders: (headers: any) => HeadersRequest;
export const withParams: (params: any) => ParamsRequest;

export type MswResolver = (req: any, res: any, ctx: any) => any;

export type Then = (resolver: MswResolver) => ThenFunctions;
export type ThenReturn = (response: HttpResponse) => ThenFunctions;
export type ThenReturnFor = (request: Request, response: HttpResponse) => ThenFunctions;

export type ThenFunctions = {
  then: Then;
  thenReturn: ThenReturn;
  thenReturnFor: ThenReturnFor;
};

export const whenThen: (
  server: any,
  rest: any
) => {
  when: (mask: RestMask) => ThenFunctions;
};
