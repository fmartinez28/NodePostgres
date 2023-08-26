import { pool } from '../../dbconnection.js'
import getTaskSchema from '../../schemas/getTask.json' assert { type: "json" };

export default async function getTask(fastify, opts) {
    fastify.get('/:id', { schema: getTaskSchema }, async (request, reply) => {
        const id = Number(request.params.id);
        try {
            const result = await pool.query('SELECT * FROM tasks WHERE id = $1',
                [id]);
            if (result.rows.length > 0) {
                reply.send(result.rows[0]);
            } else {
                reply.status(404).send({ message: 'Task not found' });
            }
        } catch (err) {
            reply.status(500).send({ message: '[ERROR] Cannot get task: ' + err.message });
        }
    });
}
