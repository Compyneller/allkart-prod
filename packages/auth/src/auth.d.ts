export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth/adapters/prisma").DBAdapter<import("better-auth").BetterAuthOptions>;
    user: {
        additionalFields: {
            role: {
                type: "string";
                defaultValue: string;
                required: false;
                input: false;
            };
        };
    };
    session: {
        fetchUserInfo: boolean;
        additionalFields: {
            role: {
                type: "string";
                fieldName: string;
                returned: true;
            };
        };
    };
    trustedOrigins: string[];
    baseURL: string;
    secret: string | undefined;
    emailAndPassword: {
        enabled: true;
        requireEmailVerification: true;
        sendResetPassword: ({ user, url }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }) => Promise<void>;
    };
    emailVerification: {
        autoSignInAfterVerification: true;
        sendVerificationEmail: ({ user, url }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }, request: Request | undefined) => Promise<void>;
        afterEmailVerification(user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        }, request: Request | undefined): Promise<void>;
    };
    socialProviders: {
        google: {
            prompt: "consent";
            clientId: string;
            clientSecret: string;
        };
    };
    plugins: [{
        id: "admin";
        init(): {
            options: {
                databaseHooks: {
                    user: {
                        create: {
                            before(user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            } & Record<string, unknown>): Promise<{
                                data: {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                    role: string;
                                };
                            }>;
                        };
                    };
                    session: {
                        create: {
                            before(session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            } & Record<string, unknown>, ctx: import("better-auth").GenericEndpointContext<import("better-auth").BetterAuthOptions> | undefined): Promise<void>;
                        };
                    };
                };
            };
        };
        hooks: {
            after: {
                matcher(context: import("better-auth").EndpointContext<string, any> & Omit<import("better-auth").InputContext<string, any>, "method"> & {
                    context: import("better-auth").AuthContext & {
                        returned?: unknown;
                        responseHeaders?: Headers;
                    };
                    headers?: Headers;
                }): boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<import("better-auth/plugins").SessionWithImpersonatedBy[] | undefined>;
            }[];
        };
        endpoints: {
            setRole: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: string;
                        role: "user" | "admin" | ("user" | "admin")[];
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: import("better-auth/plugins").UserWithRole;
                    };
                } : {
                    user: import("better-auth/plugins").UserWithRole;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                        role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                    }, import("better-auth").$strip>;
                    requireHeaders: true;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        $Infer: {
                            body: {
                                userId: string;
                                role: "user" | "admin" | ("user" | "admin")[];
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/set-role";
            };
            getUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query: {
                        id: string;
                    };
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                } : {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                }>;
                options: {
                    method: "GET";
                    query: import("better-auth").ZodObject<{
                        id: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/get-user";
            };
            createUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        email: string;
                        password: string;
                        name: string;
                        role?: "user" | "admin" | ("user" | "admin")[] | undefined;
                        data?: Record<string, any>;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: import("better-auth/plugins").UserWithRole;
                    };
                } : {
                    user: import("better-auth/plugins").UserWithRole;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        email: import("better-auth").ZodString;
                        password: import("better-auth").ZodString;
                        name: import("better-auth").ZodString;
                        role: import("better-auth").ZodOptional<import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>>;
                        data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        $Infer: {
                            body: {
                                email: string;
                                password: string;
                                name: string;
                                role?: "user" | "admin" | ("user" | "admin")[] | undefined;
                                data?: Record<string, any>;
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/create-user";
            };
            adminUpdateUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                        data: Record<any, any>;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: import("better-auth/plugins").UserWithRole;
                } : import("better-auth/plugins").UserWithRole>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                        data: import("better-auth").ZodRecord<import("better-auth").ZodAny, import("better-auth").ZodAny>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/update-user";
            };
            listUsers: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query: {
                        searchValue?: string | undefined;
                        searchField?: "email" | "name" | undefined;
                        searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                        limit?: string | number | undefined;
                        offset?: string | number | undefined;
                        sortBy?: string | undefined;
                        sortDirection?: "asc" | "desc" | undefined;
                        filterField?: string | undefined;
                        filterValue?: string | number | boolean | undefined;
                        filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                    };
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        users: import("better-auth/plugins").UserWithRole[];
                        total: number;
                        limit: number | undefined;
                        offset: number | undefined;
                    } | {
                        users: never[];
                        total: number;
                    };
                } : {
                    users: import("better-auth/plugins").UserWithRole[];
                    total: number;
                    limit: number | undefined;
                    offset: number | undefined;
                } | {
                    users: never[];
                    total: number;
                }>;
                options: {
                    method: "GET";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    query: import("better-auth").ZodObject<{
                        searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            email: "email";
                            name: "name";
                        }>>;
                        searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            contains: "contains";
                            starts_with: "starts_with";
                            ends_with: "ends_with";
                        }>>;
                        limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                        offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                        sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            asc: "asc";
                            desc: "desc";
                        }>>;
                        filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                        filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            eq: "eq";
                            ne: "ne";
                            lt: "lt";
                            lte: "lte";
                            gt: "gt";
                            gte: "gte";
                            contains: "contains";
                        }>>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    users: {
                                                        type: string;
                                                        items: {
                                                            $ref: string;
                                                        };
                                                    };
                                                    total: {
                                                        type: string;
                                                    };
                                                    limit: {
                                                        type: string;
                                                    };
                                                    offset: {
                                                        type: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/list-users";
            };
            listUserSessions: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                    };
                } : {
                    sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                }>;
                options: {
                    method: "POST";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    sessions: {
                                                        type: string;
                                                        items: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/list-user-sessions";
            };
            unbanUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: any;
                    };
                } : {
                    user: any;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/unban-user";
            };
            banUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                        banReason?: string | undefined;
                        banExpiresIn?: number | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: any;
                    };
                } : {
                    user: any;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                        banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/ban-user";
            };
            impersonateUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                } : {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    session: {
                                                        $ref: string;
                                                    };
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/impersonate-user";
            };
            stopImpersonating: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        session: import("better-auth").Session & Record<string, any>;
                        user: packages_core_dist_db.User & Record<string, any>;
                    };
                } : {
                    session: import("better-auth").Session & Record<string, any>;
                    user: packages_core_dist_db.User & Record<string, any>;
                }>;
                options: {
                    method: "POST";
                    requireHeaders: true;
                } & {
                    use: any[];
                };
                path: "/admin/stop-impersonating";
            };
            revokeUserSession: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        sessionToken: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        sessionToken: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/revoke-user-session";
            };
            revokeUserSessions: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/revoke-user-sessions";
            };
            removeUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/remove-user";
            };
            setUserPassword: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        newPassword: string;
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        newPassword: import("better-auth").ZodString;
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/set-user-password";
            };
            userHasPermission: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: ({
                        permission: {
                            readonly user?: ("list" | "create" | "set-role" | "ban" | "impersonate" | "delete" | "set-password" | "get" | "update")[] | undefined;
                            readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                        };
                        permissions?: never;
                    } | {
                        permissions: {
                            readonly user?: ("list" | "create" | "set-role" | "ban" | "impersonate" | "delete" | "set-password" | "get" | "update")[] | undefined;
                            readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                        };
                        permission?: never;
                    }) & {
                        userId?: string;
                        role?: "user" | "admin" | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        error: null;
                        success: boolean;
                    };
                } : {
                    error: null;
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodIntersection<import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                        role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>, import("better-auth").ZodUnion<readonly [import("better-auth").ZodObject<{
                        permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                        permissions: import("better-auth").ZodUndefined;
                    }, import("better-auth").$strip>, import("better-auth").ZodObject<{
                        permission: import("better-auth").ZodUndefined;
                        permissions: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                    }, import("better-auth").$strip>]>>;
                    metadata: {
                        openapi: {
                            description: string;
                            requestBody: {
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                permission: {
                                                    type: string;
                                                    description: string;
                                                    deprecated: boolean;
                                                };
                                                permissions: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    error: {
                                                        type: string;
                                                    };
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        $Infer: {
                            body: ({
                                permission: {
                                    readonly user?: ("list" | "create" | "set-role" | "ban" | "impersonate" | "delete" | "set-password" | "get" | "update")[] | undefined;
                                    readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                                };
                                permissions?: never;
                            } | {
                                permissions: {
                                    readonly user?: ("list" | "create" | "set-role" | "ban" | "impersonate" | "delete" | "set-password" | "get" | "update")[] | undefined;
                                    readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                                };
                                permission?: never;
                            }) & {
                                userId?: string;
                                role?: "user" | "admin" | undefined;
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/has-permission";
            };
        };
        $ERROR_CODES: {
            readonly FAILED_TO_CREATE_USER: "Failed to create user";
            readonly USER_ALREADY_EXISTS: "User already exists.";
            readonly USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.";
            readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
            readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
            readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
            readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
            readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
            readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
            readonly BANNED_USER: "You have been banned from this application";
            readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
            readonly NO_DATA_TO_UPDATE: "No data to update";
            readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
            readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
            readonly YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: "You are not allowed to set a non-existent role value";
        };
        schema: {
            user: {
                fields: {
                    role: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    banned: {
                        type: "boolean";
                        defaultValue: false;
                        required: false;
                        input: false;
                    };
                    banReason: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    banExpires: {
                        type: "date";
                        required: false;
                        input: false;
                    };
                };
            };
            session: {
                fields: {
                    impersonatedBy: {
                        type: "string";
                        required: false;
                    };
                };
            };
        };
        options: any;
    }];
}>;
//# sourceMappingURL=auth.d.ts.map