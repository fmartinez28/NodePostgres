import { pool } from '../dbconnection.js'

//A modo de ejemplo, un get
export default async function (fastify, opts) {
    fastify.get('/tasks', async function (request, reply) {
        const query = await pool.query('SELECT * FROM Tasks;');
        const res = await query.rows;
        return res;
    });
    fastify.get('/tasks/:id', async function (request, reply) {
        const { id } = request.params;
        const query = await pool.query(`SELECT * FROM Tasks WHERE Id = ${id};`);
        const res = await query.rows;
        return res[0];
    })
    fastify.post('/tasks', async function (request, reply) {
        const name = request.body.name;
        const description = request.body.description;
        const query = await pool.query(`INSERT INTO Tasks ("name", "description") values ('${name}', '${description}');`);
        const res = await query.rows;
        return res;
    });
    fastify.delete('/tasks/:id', async function (request, reply) {
        const { id } = request.params;
        const query = await pool.query(`DELETE from Tasks where id = ${id};`);
        const res = await query.rows;
        return res;
    });
    fastify.put('/tasks/:id', async function (request, reply) {
        const { id } = request.params;
        const name = request.body.name;
        const description = request.body.description;
        const query = await pool.query(`update Tasks set name = '${name}', description = '${description}' where id = ${id};`)
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
