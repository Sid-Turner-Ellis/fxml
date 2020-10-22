const fetch = require('node-fetch');
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const fs = require('fs')

async function firstRun() {
  let fxLinks = []
  const xmlLinks = await takeFirstXMLLink('https://fxdigital.wearefx.uk/sitemap_index.xml')

  for (let i = 0; i < xmlLinks.length; i++) {
    const fxs = await takeSecondXMLLink(xmlLinks[i])
    fxs.forEach((v) => {
      fxLinks.push(v)
    })
  }

}

firstRun()


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


