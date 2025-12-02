"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.producer = void 0;
const kafka_1 = require("@repo/kafka");
const kafkaClient = (0, kafka_1.createKafkaClient)("auth-service");
exports.producer = (0, kafka_1.createProducer)(kafkaClient);
exports.consumer = (0, kafka_1.createConsumer)(kafkaClient, "auth-group");
