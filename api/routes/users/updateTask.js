import { pool } from '../../dbconnection.js'
import updateTaskSchema from '../../schemas/updateTask.json' assert { type: "json" };

export default async function updateTask(fastify, opts) {
    fastify.put('/:id', { schema: updateTaskSchema }, async (request, reply) => {
        const id = Number(request.params.id);
        const updatedUser = request.body;
        try {
            const result = await pool.query(
                'UPDATE tasks SET name = $1, description = $2 WHERE id = $3 RETURNING *',
                [updatedUser.name, updatedUser.description, id]
            );
            if (result.rows.length > 0) {
                reply.send(result.rows[0]);
            } else {
                reply.status(404).send({ message: 'Task not found' });
            }
        } catch (err) {
            reply.status(500).send({ message: '[ERROR] Cannot update task: ' + err.message });
        }
    });
}
