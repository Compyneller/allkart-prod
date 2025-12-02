import app from "./app";
// import { consumer, producer } from "./util/kafka";

const PORT = process.env.PORT || 5000;
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
