import app from "./app.js";
import { consumer, producer } from "./utils/kafka.js";
const PORT = process.env.PORT || 5002;

const start = async () => {
  try {
    // Promise.all([await producer.connect(), await consumer.connect()]);
    app.listen(PORT, () => {
      console.log("notification service is running", PORT);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
