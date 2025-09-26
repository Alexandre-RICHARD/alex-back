// -----------------------------
// Partie 1 — CÔTÉ SPEC (core)
// -----------------------------

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";

/** Extrait les :params d'un path Express-like. */
export type PathParamsOf<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? ({ [K in Param | keyof PathParamsOf<`/${Rest}`>]: string })
    : Path extends `${string}:${infer Param}`
      ? ({ [K in Param]: string })
      : Record<string, never>;

/** Schéma fantôme pour ancrer le type TS (sans runtime). */
export type Schema<T> = { _t?: (x: T) => T };

export type Responses<Body> = { [Status in number]?: Schema<Body> };

export interface AppErrorShape { code: string; message: string; details?: unknown }
export type ErrorResponses = { [Status in number]?: Schema<AppErrorShape> };

export interface EndpointSpec<Path extends string = string, Method extends HttpMethod = HttpMethod> {
  alias?: string;
  description?: string;
  method: Method;
  path: Path;
  params?: {
    path?: Schema<PathParamsOf<Path>>;
    query?: Schema<Record<string, string | string[] | undefined>>;
    headers?: Schema<Record<string, string | undefined>>;
    body?: Schema<unknown>;
  };
  responses?: Responses<unknown>;
  errors?: ErrorResponses;
}

export interface ApiSpec {
  name: string;
  baseUrl?: string;
  commonErrors?: ErrorResponses;
  endpoints: EndpointSpec[];
}

export function defineEndpoint<Path extends string, Method extends HttpMethod>(e: EndpointSpec<Path, Method>) { return e }
export function defineApi(spec: ApiSpec) { return spec }

// Types d'inférence utilitaires
export type InferEndpointInput<E extends EndpointSpec> = (
  E["params"] extends infer P ? {
    path?: P extends { path: Schema<infer T> } ? T : undefined;
    query?: P extends { query: Schema<infer T> } ? T : undefined;
    headers?: P extends { headers: Schema<infer T> } ? T : undefined;
    body?: P extends { body: Schema<infer T> } ? T : undefined;
  } : {}
);

export type InferSuccess<E extends EndpointSpec> = (
  E["responses"] extends infer R ? {
    status: Extract<keyof R, number>;
    body: R extends { [K in number]?: Schema<infer T> } ? T : unknown;
  } : { status: number; body: unknown }
);

// ---------------------------------
// Partie 2 — CÔTÉ BACK (Express)
// ---------------------------------

import type { Request, Response, NextFunction } from "express";

/** Adapter Express minimal, sans validation runtime. */
export function expressHandler<E extends EndpointSpec>(
  endpoint: E,
  handler: (ctx: {
    req: Request;
    params: {
      path: E["params"] extends { path: Schema<infer T> } ? T : Record<string, never>;
      query: E["params"] extends { query: Schema<infer T> } ? T : Record<string, never>;
      headers: E["params"] extends { headers: Schema<infer T> } ? T : Record<string, never>;
      body: E["params"] extends { body: Schema<infer T> } ? T : unknown;
    };
  }) => Promise<{ status: number; body?: unknown } | void> | ({ status: number; body?: unknown } | void)
) {
  return async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const pathParams = req.params as any;
      const query = req.query as any;
      const headers = req.headers as any;
      const body = req.body as any;

      const result = await handler({ req, params: { path: pathParams, query, headers, body } as any });
      if (!result) return res.status(204).end();
      if (result.body === undefined) return res.status(result.status).end();
      return res.status(result.status).json(result.body);
    } catch (err: any) {
      const status = typeof err?.status === "number" ? err.status : 500;
      const payload: AppErrorShape = {
        code: err?.code || (status === 400 ? "BAD_REQUEST" : status === 404 ? "NOT_FOUND" : "INTERNAL_ERROR"),
        message: err?.message || "Unexpected error",
        details: err?.details,
      };
      return res.status(status).json(payload);
    }
  };
}

/** Montage batch de handlers sur un Router */
export function mountExpress(router: import("express").Router, spec: ApiSpec, handlers: Record<string, ReturnType<typeof expressHandler>>) {
  for (const e of spec.endpoints) {
    const key = e.alias ?? `${e.method} ${e.path}`;
    const h = handlers[key];
    if (!h) throw new Error(`Missing handler for ${key}`);
    (router as any)[e.method.toLowerCase()](e.path, h);
  }
}

// --------------------------------
// Partie 3 — CÔTÉ FRONT (client)
// --------------------------------

export interface ClientOptions {
  baseUrl?: string;
  fetcher?: typeof fetch;
  onError?: (err: { status?: number; body?: unknown; raw: Response | Error }) => void;
}

export function createClient<TSpec extends ApiSpec>(spec: TSpec, opts: ClientOptions = {}) {
  const base = opts.baseUrl ?? spec.baseUrl ?? "";
  const fetcher = opts.fetcher ?? fetch;

  function buildUrl(path: string, pathParams?: Record<string, string>, query?: Record<string, any>) {
    let p = path;
    if (pathParams) {
      for (const [k, v] of Object.entries(pathParams)) {
        p = p.replace(new RegExp(`:${k}(?=/|$)`), encodeURIComponent(String(v)));
      }
    }
    const url = new URL(p, base || undefined);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v === undefined || v === null) continue;
        if (Array.isArray(v)) v.forEach((vv) => url.searchParams.append(k, String(vv)));
        else url.searchParams.set(k, String(v));
      }
    }
    return url.toString();
  }

  const client: any = {};

  for (const e of spec.endpoints) {
    const key = e.alias ?? `${e.method} ${e.path}`;
    client[key] = (async (input: any) => {
      const pathParams = input?.path;
      const query = input?.query;
      const headers = input?.headers ?? {};
      const body = input?.body;

      const url = buildUrl(e.path, pathParams as any, query as any);
      const res = await fetcher(url, {
        method: e.method,
        headers: {
          "content-type": body ? "application/json" : undefined,
          ...(headers as any),
        },
        body: body ? JSON.stringify(body) : undefined,
      }).catch((err) => {
        opts.onError?.({ raw: err });
        throw err;
      });

      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const err = { status: res.status, body: payload, raw: res } as const;
        opts.onError?.(err);
        throw Object.assign(new Error(`HTTP ${res.status}`), err);
      }

      return { status: res.status, body: payload };
    }) as (input: InferEndpointInput<typeof e>) => Promise<InferSuccess<typeof e>>;
  }

  return client as { [K in keyof typeof client]: typeof client[K] };
}

// ----------------------------------------------------------
// Partie 4 — EXEMPLE COMPLET (POST avec path + body + 404)
// ----------------------------------------------------------

// 4.1 — Types DTO (uniquement TS)
export interface CreateWidgetBody { label: string; power: number }
export interface WidgetDTO { id: string; label: string; power: number; createdAt: string }

// 4.2 — Spec minimaliste (no validators)
export const widgetApi = defineApi({
  name: "widget",
  baseUrl: "http://localhost:3000", // facultatif pour le client
  endpoints: [
    defineEndpoint({
      alias: "createWidget",
      description: "Crée un widget avec un id en path et un body",
      method: "POST",
      path: "/widgets/:wid",
      params: {
        path: {} as Schema<PathParamsOf<"/widgets/:wid">>,
        body: {} as Schema<CreateWidgetBody>,
      },
      responses: {
        201: {} as Schema<WidgetDTO>,
      },
      errors: {
        404: {} as Schema<AppErrorShape>,
      },
    }),
  ],
});

// 4.3 — Back/Express: router + controller + async handler
// --- controller.ts ---
export const widgetController = {
  // signature guidée par expressHandler(widgetApi.endpoints[0], ...)
  createWidget: async ({ params }: { params: { path: { wid: string }, body: CreateWidgetBody } }) => {
    const { wid } = params.path;
    const { label, power } = params.body;

    // Cas d'erreur exemple
    if (wid === "missing") {
      return { status: 404, body: { code: "NOT_FOUND", message: "Widget id not found" } };
    }

    // Random object simulé
    const dto: WidgetDTO = {
      id: wid,
      label,
      power,
      createdAt: new Date().toISOString(),
    };
    return { status: 201, body: dto };
  },
};

// --- routes.ts ---
// import express from "express";
// import { mountExpress, expressHandler, widgetApi, widgetController } from "./without-validators";
// export const router = express.Router();
// mountExpress(router, widgetApi, {
//   createWidget: expressHandler(widgetApi.endpoints[0], ({ req, params }) => widgetController.createWidget({ params } as any)),
// });

// 4.4 — Front: client et appel typé
export const widgetClient = createClient(widgetApi);

async function demoFrontCall() {
  const { status, body } = await widgetClient.createWidget({
    path: { wid: "w-123" },
    body: { label: "Turbo", power: 42 },
  });
  // status: 201, body: WidgetDTO
  console.log(status, body);
}

// Gestion d'erreur 404 côté front
async function demoFrontNotFound() {
  try {
    await widgetClient.createWidget({ path: { wid: "missing" }, body: { label: "X", power: 1 } });
  } catch (e: any) {
    // e.status === 404, e.body ressemble à AppErrorShape
    console.error("Create failed", e.status, e.body);
  }
}
