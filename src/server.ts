import fastify from 'fastify';
import {StateStore} from './StateStore';

const server = fastify({logger: {level: 'warn'}});
const stateStore = new StateStore();

class Foo {
    constructor(public id: string) {}
}

server.post<{Body: Foo}>('/store', async (request, reply) => {
    const {body} = request;
    const items = [{key: body.id, value: body}];
    return stateStore.store<Foo>({items});
});

const HOST = process.env.APP_HOST || 'localhost';
const PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 9000;
server.listen({host: HOST, port: PORT}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
