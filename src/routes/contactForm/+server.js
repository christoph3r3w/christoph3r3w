import { redirect } from '@sveltejs/kit';
import { request } from 'node:http';

/** @type {import('./$types').RequestHandler} */
export async function POST() {
    let x = await request.formData
    console.log({x});

    redirect(303,'/')

    return new Response(x);
};