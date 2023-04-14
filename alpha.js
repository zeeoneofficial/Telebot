require("./settings")
const {
    Telegraf,
    Context
} = require('telegraf')
const {
    simple
} = require("./lib/myfunc")
const fs = require('fs')
const os = require('os')
const speed = require('performance-now')

if (BOT_TOKEN == 'YOUR_TELEGRAM_BOT_TOKEN') {
    return console.log(lang.noToken)
}

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')

const bot = new Telegraf(BOT_TOKEN)
async function startalpha() {
    bot.on('callback_query', async (alpha) => {
        //console.log(alpha)
        action = alpha.callbackQuery.data.split(' ')
        args = action
        user_id = Number(action[1])
        if (alpha.callbackQuery.from.id != user_id) return alpha.answerCbQuery('Uppss... this button not for you!', {
            show_alert: true
        })
        const timestampi = speed();
        const latensii = speed() - timestampi
        const user = simple.getUserName(alpha.callbackQuery.from)
        const {
            isUrl,
            fetchJson
        } = simple
        const pushname = user.full_name;
        const username = user.username ? user.username : "zeeone_ofc";
        const isCreator = [alpha.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(user.username ? user.username : "-")
        const reply = async (text) => {
            for (var x of simple.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await alpha.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        try {
            switch (action[0]) {
                case "menucmd": {
                    let hit_total;
                    try {
                        hit_total = await simple.fetchJson('https://api.countapi.xyz/hit/api-alphabot.herokuapp.com/visits')
                    } catch {
                        hit_total = {
                            value: "-"
                        }
                    }
                    hitall = `${hit_total.value == undefined ? '-' : hit_total.value}`
                    let dnew = new Date(new Date + 3600000)
                    let week = dnew.toLocaleDateString('en', {
                        weekday: 'long'
                    })
                    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(dnew / 84600000) % 5]
                    let date = dnew.toLocaleDateString('en', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                    let dateIslamic = Intl.DateTimeFormat('en' + '-TN-u-ca-islamic', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }).format(dnew)
                    lang.menu(alpha, THUMBNAIL, pushname, OWNER_NAME, OWNER, "/", hitall, latensii, os, simple, week, date, dateIslamic, username, isCreator, user.id.toString())
                }
                break
                case "animecmd": {
                    lang.animecmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "asupancmd": {
                    lang.asupancmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "cecancmd": {
                    lang.cecancmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "cogancmd": {
                    lang.cogancmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "downloadcmd": {
                    lang.downloadcmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "ephotocmd": {
                    lang.ephotocmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "ephotocmd2": {
                    lang.ephotocmd2(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "logocmd": {
                    lang.logocmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "logocmd2": {
                    lang.logocmd2(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "islamcmd": {
                    lang.islamcmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "nsfwcmd": {
                    lang.nsfwcmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "photooxycmd": {
                    lang.photooxycmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd": {
                    lang.textprocmd(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd2": {
                    lang.textprocmd2(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd3": {
                    lang.textprocmd3(alpha, THUMBNAIL, user_id.toString())
                }
                break
                case "owner": {
                    await alpha.sendContact(OWNER_NUMBER, OWNER_NAME)
                    reply(`My lord [${OWNER_NAME}](${OWNER[0]}) 👑`)
                }
                break
                case "ytmp3": {
                    if (!args[2]) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    if (!isUrl(args[2])) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    if (!args[2].includes('youtu.be') && !args[2].includes('youtube.com')) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    reply(lang.wait)
                    await alpha.deleteMessage()
                    let res = await fetch(global.api('alfa', '/api/downloader/youtube-audio', {
                        url: args[2]
                    }, 'apikey'))
                    if (!res.ok) throw await res.text()
                    var result = await res.json()
                    var {
                        id,
                        thumbnail,
                        title,
                        quality,
                        filesize,
                        size,
                        download
                    } = result.result
                    if (size > 50000) { //batas download 50mb, tamabahin jika kurang (misal 100mb = 100000)
                        let key = "「 YOUTUBE AUDIO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${download}\n\n`
                        key += `Ukuran media melebihi batas, silahkan download sendiri melalui link di atas.`
                        await alpha.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key
                        })
                    } else {
                        let key = "「 YOUTUBE AUDIO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${download}\n\n`
                        key += `Silahkan download melalui link di atas jika media tidak di kirim`
                        await alpha.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key
                        })
                        await alpha.replyWithAudio({
                            url: download,
                            filename: title
                        })
                    }
                }
                break
                case "ytmp4": {
                    if (!args[2]) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    if (!isUrl(args[2])) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    if (!args[2].includes('youtu.be') && !args[2].includes('youtube.com')) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    reply(lang.wait)
                    await alpha.deleteMessage()
                    let res = await fetch(global.api('alfa', '/api/downloader/youtube-video', {
                        url: args[2]
                    }, 'apikey'))
                    if (!res.ok) throw await res.text()
                    var result = await res.json()
                    var {
                        id,
                        thumbnail,
                        title,
                        quality,
                        filesize,
                        size,
                        download
                    } = result.result
                    var getdl = await fetchJson(`https://tinyurl.com/api-create.php?url=${download}`)
                    if (size > 50000) { //batas download 50mb, tamabahin jika kurang (misal 100mb = 100000)
                        let key = "「 YOUTUBE VIDEO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${getdl.data}\n\n`
                        key += `Ukuran media melebihi batas, silahkan download sendiri melalui link di atas.`
                        await alpha.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key
                        })
                    } else {
                        let key = "「 YOUTUBE VIDEO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${getdl.data}\n\n`
                        key += `Silahkan download melalui link di atas jika media tidak di kirim`
                        await alpha.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key,
                            parse_mode: 'Markdown'
                        })
                        alpha.replyWithVideo({
                            url: download
                        }, {
                            caption: lang.ok
                        })
                    }
                }
                break
            }
        } catch (e) {
            console.log(e)
        }
    })
    bot.command('help', async (alpha) => {
        user = simple.getUserName(alpha.message.from)
        await alpha.reply(lang.first_chat(BOT_NAME, user.full_name), {
            parse_mode: "MARKDOWN",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Script',
                        url: "https://github.com/zeeoneofficial/telebot"
                    }, {
                        text: 'Owner',
                        url: OWNER[0]
                    }]
                ]
            }
        })
    })

    bot.command('start', async (alpha) => {
        let user = simple.getUserName(alpha.message.from)
        await alpha.reply(lang.first_chat(BOT_NAME, user.full_name), {
            parse_mode: "MARKDOWN",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Script',
                        url: "https://github.com/zeeoneofficial/telebot"
                    }, {
                        text: 'Owner',
                        url: OWNER[0]
                    }]
                ]
            }
        })
    })
    bot.on('message', async (alpha) => {
        require("./index")(alpha, bot)
    })

    bot.launch({
        dropPendingUpdates: true
    })

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Author": "https://t.me/zeeoneofc"
        })
    })
}
startalpha()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))