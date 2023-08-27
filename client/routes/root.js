export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const req = await fetch('http://localhost:3000/tasks');
    const tasks = await req.json();
    console.log(tasks);
    return reply.view("templates/taskViewer.ejs", { tasks });
  })
}
