export default async function (fastify, opts) {
    fastify.get('/edit/:taskId', async function (request, reply) {
        const { taskId } = request.params;
        const req = await fetch(`http://localhost:3000/tasks/${taskId}`);
        const task = await req.json();
        return reply.view("templates/editTask.ejs", { task });
    });
}