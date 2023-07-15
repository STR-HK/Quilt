import { json } from '@sveltejs/kit';
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create(/* options */);

/** @type {import('../$types').RequestHandler} */
export async function POST(event) {
    async function getItems() {
        try {
            const body = await event.request.json()
            const url = new URL(body.url)
            const listId = url.searchParams.get('list')
            const playlist = await youtube.getPlaylist(listId)
            return json(playlist.items)
        } catch (e) {
            setTimeout(await getItems, 100)
        }
    }
    return await getItems()
}