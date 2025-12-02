"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducer = void 0;
const createProducer = (kafka) => {
    const producer = kafka.producer();
    const connect = async () => {
        await producer.connect();
    };
    const send = async (topic, message) => {
        console.log(topic, message);
        await producer.send({
            topic,
            messages: [
                {
                    value: JSON.stringify(message),
                },
            ],
        });
    };
    const disconnect = async () => {
        await producer.disconnect();
    };
    return { connect, send, disconnect };
};
exports.createProducer = createProducer;
