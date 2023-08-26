import { pool } from '../../dbconnection.js'
import addTaskSchema from '../../schemas/addTask.json' assert { type: "json" };

export default async function addTask(fastify, opts) {
    fastify.post('/', { schema: addTaskSchema }, async (request, reply) => {
        const newTask = request.body;
        try {
            const result = await pool.query(
                'INSERT INTO Tasks (name, description) VALUES ($1, $2) RETURNING *',
                [newTask.name, newTask.description]
            );
            reply.send(result.rows[0]);
        } catch (err) {
            reply.status(500).send({ message: '[ERROR] Cannot add task: ' + err.message });
        }
    });
}
