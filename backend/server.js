const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

const CAMUNDA_URL = process.env.CAMUNDA_URL;

app.get("/api/events", async (req, res) => {
    try {
        const response = await axios.post(`${CAMUNDA_URL}/process-definition/key/EventProcessing/start`, {
            variables: {}
        });

        console.log("✅ Процесс обработки событий запущен!");

        // Ждём выполнения задачи
        setTimeout(async () => {
            const result = await axios.get(`${CAMUNDA_URL}/task`);

            if (result.data.length > 0) {
                const taskId = result.data[0].id;

                // Завершаем таску и получаем результат
                const taskResult = await axios.post(`${CAMUNDA_URL}/task/${taskId}/complete`);
                res.json(taskResult.data.variables);
            } else {
                res.status(500).json({ error: "Нет активных задач" });
            }
        }, 1000);
    } catch (error) {
        console.error("Ошибка при запуске процесса:", error);
        res.status(500).json({ error: "Ошибка при запуске процесса" });
    }
});

app.listen(port, () => {
    console.log(`🚀 Backend запущен на порту ${port}`);
});
