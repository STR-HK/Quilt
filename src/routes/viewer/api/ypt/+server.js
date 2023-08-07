import { json } from '@sveltejs/kit';

/** @type {import('../$types').RequestHandler} */
export async function GET(event) {

    async function getYpt_e() {
        return new Promise((resolve, reject) => {
            fetch("https://pi.tgclab.com/logs/group/members?groupID=2967033", {
                // fetch("https://pi.tgclab.com/logs/group/members?groupID=2528781", {
    headers: {
      authorization:
        "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MDAzNzY2LCJ1c2VybmFtZSI6ImcxMDk2NzU2MzU5Nzk1MzI4OTk2MTYiLCJleHAiOjQ4NDIxMDM1NzQsImVtYWlsIjoiIn0.xevnJD6QuK96LPvajLk0RH1v5KjeJA3g6_JEWNzkYk0",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      resolve(res);
    })
    .catch((e) => {
      console.warn("[Timeness] pi.tgclab.com/logs/group/members", e);
        reject(e);
    });
        }  )
    }
    return json(await getYpt_e())
}