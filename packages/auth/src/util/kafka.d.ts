export declare const producer: {
    connect: () => Promise<void>;
    send: (topic: string, message: object) => Promise<void>;
    disconnect: () => Promise<void>;
};
export declare const consumer: {
    connect: () => Promise<void>;
    subscribe: (topic: string, handler: (message: any) => Promise<void>) => Promise<void>;
    disconnect: () => Promise<void>;
};
//# sourceMappingURL=kafka.d.ts.map