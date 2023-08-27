export default async function (fastify, opts) {
    fastify.get('/new', async function (request, reply) {
        return reply.view("templates/newTask.ejs");
    });
}