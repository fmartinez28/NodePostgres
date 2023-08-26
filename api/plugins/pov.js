import fp from 'fastify-plugin'
import pov from '@fastify/view'
import ejs from 'ejs'

export default fp(async function (fastify, opts) {
    fastify.register(pov, {
        engine: {
            ejs,
        },
    })
})