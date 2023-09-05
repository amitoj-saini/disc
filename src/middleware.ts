import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next/types";

type ProtectedAPIRoutes = {
    [route: string]: {methods: string[], allowedRequests: number, per: number}
}

type RateLimit = {
    [route: string]: {until: number, requests: number}
}

const protectedAPIRoutes: ProtectedAPIRoutes = {
    "/api/signup": {methods: ["POST"], allowedRequests: 5, per: 2678400},
    "/api/login": {methods: ["POST"], allowedRequests: 20, per: 2678400}
    // set back to 5 when done testing
}

export const config = {
    matcher: [ "/:path*" ]
}

let rateLimit: RateLimit = {}

export async function middleware(req: NextRequest) {
    let path = new URL(req.url).pathname;
    if (path in protectedAPIRoutes) {
        let route = protectedAPIRoutes[path];
        if (route.methods.includes(req.method)) {
            let time = Math.round(new Date().getTime() / 1000)
            if (!(req.url in rateLimit) || time > rateLimit[req.url].until) rateLimit[req.url] = {until: time+route.per, requests: 0};
            if (time < rateLimit[req.url].until) {
                if (rateLimit[req.url].requests > route.allowedRequests) {
                    return NextResponse.json({"error": "Not allowed (Forbidden)"}, {status: 405})
                }
            }
            rateLimit[req.url].requests += 1;
        }
    }
}