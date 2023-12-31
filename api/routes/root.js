import { pool } from '../dbconnection.js'

//A modo de ejemplo, un get
export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const query = await pool.query('SELECT * FROM Tasks');
    const tasks = query.rows;
    return tasks;
  })
}