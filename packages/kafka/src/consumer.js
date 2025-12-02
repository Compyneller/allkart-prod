"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsumer = void 0;
const createConsumer = (kafka, groupId) => {
    const consumer = kafka.consumer({ groupId });
    const connect = async () => {
        await consumer.connect();
        console.log("kafka consumer connected:" + groupId);
    };
    const subscribe = async (topic, handler) => {
        await consumer.subscribe({
            topic: topic,
            fromBeginning: true,
        });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const value = message.value?.toString();
                    if (value) {
                        await handler(JSON.parse(value));
                    }
                }
                catch (error) {
                    console.log(error);
                }
            },
        });
    };
    const disconnect = async () => {
        await consumer.disconnect();
    };
    return { connect, subscribe, disconnect };
};
exports.createConsumer = createConsumer;
