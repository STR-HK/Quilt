import { json } from '@sveltejs/kit';
import * as fs from 'fs';

function getYYYYMMDD() {
    const today = new Date();
    return today.getFullYear() + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0')
}

function getHHMM() {
    const today = new Date();
    return today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0')
}


/** @type {import('../$types').RequestHandler} */
export async function POST(event) {
   async function readWriteFile_e() {
    return new Promise((resolve, reject) => {
        fs.readFile('./src/routes/viewer/api/check/register/db.json',  (err, data) => {
            if (err) {
              reject(err)
            }
            let content = JSON.parse(data)
            const body = event.request.json()
            body.then((data) => {
                const target = content[getYYYYMMDD()]
                if (!target) {
                    content[getYYYYMMDD()] = [{name: data.name,time: getHHMM(),}]
                } else {
                    target.push({name: data.name,time: getHHMM(),})
                }

                fs.writeFile('./src/routes/viewer/api/check/register/db.json', JSON.stringify(content), (err) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(content)
                }
            )
            })
        });
    });
   }

   return json(await readWriteFile_e())
}

/** @type {import('../$types').RequestHandler} */
export async function GET(event) {

    async function readFile_e() {
        return new Promise((resolve, reject) => {
            fs.readFile('./src/routes/viewer/api/check/register/db.json', (err, data) => {
                if (err) {
                    reject(err)
                }
                const content = JSON.parse(data)
                const target = content[getYYYYMMDD()]
                if (!target) {
                    resolve([])
                } else {
                    resolve(target)
                }

            })
        }
        )
    }
    return json(await readFile_e())
}


/** @type {import('../$types').RequestHandler} */
export async function DELETE(event) {

    async function removeFromFile_e() {
        return new Promise((resolve, reject) => {
            fs.readFile('./src/routes/viewer/api/check/register/db.json', (err, data) => {
                let content = JSON.parse(data)
            const body = event.request.json()
            body.then((data) => {
                const target = content[getYYYYMMDD()]
                if (target) {
                    target.forEach(element => {
                        if (element.name === data.name) {
                            target.splice(target.indexOf(element), 1)

                            fs.writeFile('./src/routes/viewer/api/check/register/db.json', JSON.stringify(content), (err) => {
                                if (err) {
                                    reject(err)
                                }
                                resolve(content)
                            }
                        )
                        }
                    });
                }
            })
            })
        }
        )
    }
    return json(await removeFromFile_e())
}

