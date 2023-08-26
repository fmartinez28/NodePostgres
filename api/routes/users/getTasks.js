import { pool } from '../../dbconnection.js'
import getTasksSchema from '../../schemas/getTasks.json' assert { type: "json" };

export default async function getTasks(fastify, opts) {
    fastify.get('/', { schema: getTasksSchema }, async (request, reply) => {
        try {
            const result = await pool.query('SELECT * FROM tasks');
            if (result.rows.length > 0) {
                reply.send(result.rows);
            }
            reply.status(204).send();
        } catch (err) {
            reply.status(500).send({ message: '[ERROR] Cannot get tasks: ' + err.message });
        }
    });
}
