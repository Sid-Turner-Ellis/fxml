const express = require('express')
const router = express.Router()
const fetch = require('node-fetch');
const xml2js = require('xml2js')
const parser = new xml2js.Parser()



router.get('/', async (req, res) => {
    let fxLinks = []
    const xmlLinks = await takeFirstXMLLink('https://fxdigital.wearefx.uk/sitemap_index.xml')
    xmlLinks.forEach(async (v) => {
        const fxs = await takeSecondXMLLink(v)
        fxLinks.push(fxs)
    })
})

async function takeFirstXMLLink(link) {
    const raw = await fetch(link)
    const xml = await raw.text()
    let linksArr
    parser.parseString((xml), (err, result) => {
        const { sitemapindex: { sitemap } } = result
        const links = sitemap.map((v) => {
            return v.loc[0]
        })
        linksArr = links
    })
    return linksArr
}

async function takeSecondXMLLink(link) {
    const raw = await fetch(link)
    const xml = await raw.text()
    let linksArr
    parser.parseString((xml), (err, result) => {
        const urls = result.urlset.url
        const links = urls.map((v) => {
            return v.loc[0]
        })
        linksArr = links
    })
    return linksArr
}

module.exports = router