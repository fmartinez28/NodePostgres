import { pool } from '../dbconnection.js'

//A modo de ejemplo, un get
export default async function (fastify, opts) {
  fastify.get('/tasks', async function (request, reply) {
    const query = await pool.query('SELECT * FROM Tasks');
    const res = await query.rows;
    return res;
  })
}

/*
Todo esto debería ser delegado a un controller:

async function (request, reply) {
    const query = await pool.query('SELECT * FROM Tasks');
    const res = await query.rows;
    return res;
  })

Quedando así el código de la ruta:

import { getResource } from '../controllers/resourceController.js';

export default async function (fastify, opts) {
  fastify.get('/', getResource(request, reply))
}
*/
