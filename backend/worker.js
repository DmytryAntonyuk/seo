const { Client, logger } = require("camunda-external-task-client-js");
const axios = require("axios");

const config = {
    baseUrl: process.env.CAMUNDA_URL,
    use: logger
};

const client = new Client(config);

client.subscribe("fetch-events", async ({ task, taskService }) => {
    console.log("⚡ Получаем данные из PHP...");

    try {
        const response = await axios.get(`${process.env.PHP_ENDPOINT}?pag=1&ID=1`);

        if (response.data.status === 'success') {
            console.log("✅ Ивенты успешно получены!");

            const events = response.data.ivents;
            events.forEach(event => {
                console.log(`Ивент: ${event.Ivent_name}`);
            });

            await taskService.complete(task, { events });
        } else {
            console.log("❌ Ошибка при получении ивентов!");
        }
    } catch (error) {
        console.error("🚨 Ошибка при запросе к PHP:", error);
    }
});

console.log("🎯 External Task Worker запущен!");
