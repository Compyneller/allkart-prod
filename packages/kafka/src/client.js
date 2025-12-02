"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKafkaClient = void 0;
const kafkajs_1 = require("kafkajs");
const createKafkaClient = (service) => {
    return new kafkajs_1.Kafka({
        clientId: service,
        brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
    });
};
exports.createKafkaClient = createKafkaClient;
