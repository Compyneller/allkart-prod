import { createKafkaClient, createConsumer, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("auth-service");

export const producer = createProducer(kafkaClient);
export const consumer = createConsumer(kafkaClient, "auth-group");
