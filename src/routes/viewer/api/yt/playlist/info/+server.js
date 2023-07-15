import { json } from '@sveltejs/kit';
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create(/* options */);

/** @type {import('../$types').RequestHandler} */
export async function POST(event) {
    async function getInfo() {
        try {
            const body = await event.request.json()
            const url = new URL(body.url)
            const listId = url.searchParams.get('list')
            const playlist = await youtube.getPlaylist(listId)
            return json(playlist)
        } catch (e) {
            setTimeout(await getInfo, 100)
        }
    }
    return await getInfo()
}