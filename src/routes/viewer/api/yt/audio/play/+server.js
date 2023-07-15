import { json } from '@sveltejs/kit';
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create(/* options */);

/** @type {import('../$types').RequestHandler} */
export async function POST(event) {
    async function getPlaybackUrl() {
        const body = await event.request.json()
        const url = new URL(body.url)
        const videoId = url.searchParams.get('v')
        const info = await youtube.getBasicInfo(videoId);
        const format = info.chooseFormat({ type: 'audio', quality: 'best' });
        const playbackUrl = format?.decipher(youtube.session.player);
        return json(playbackUrl)
    }
    try {
        return await getPlaybackUrl()
    } catch (e) {
        try {
            return await getPlaybackUrl()
        } catch (e) {
            try {
                return await getPlaybackUrl()
            } catch (e) {
                return json('')
            }
        }
    }
}