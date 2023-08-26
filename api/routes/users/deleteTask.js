import { pool } from '../../dbconnection.js'
import deleteTaskSchema from '../../schemas/deleteTask.json' assert { type: "json" };

export default async function deleteTask(fastify, opts) {
    fastify.delete('/:id', { schema: deleteTaskSchema }, async (request, reply) => {
        const id = Number(request.params.id);
        try {
            const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *',
                [id]);
            if (result.rows.length > 0) {
                reply.status(204).send();
            } else {
                reply.status(404).send({ message: 'Task not found' });
            }
        } catch (err) {
            reply.status(500).send({ message: '[ERROR] Cannot delete task: ' + err.message });
        }
    });
}
