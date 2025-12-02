import { createKafkaClient, createConsumer, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("notification-service");

export const producer = createProducer(kafkaClient);
export const consumer = createConsumer(kafkaClient, "notification-group");
