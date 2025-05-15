import { countryCodes } from './enum_country-codes.js'
import { rank as rankEnum } from './enum_rank.js'
import './modules/dayjs.min.js'

class User {
  constructor(names, server, id, ranks = []) {
    this.names = names
    this.id = id

    const serverParts = server.split('_')

    const firstNick = names[0]?.o ? names[0].o : names[0]
    this.label = [id, firstNick].filter(Boolean).join(' :: ')
    this.langNumber = countryCodes[serverParts[0]]
    this.lang = serverParts[0].toLowerCase()
    this.server = server

    // Find the most recent entry for each rank
    const latestByRank = new Map()
    for (const entry of ranks) {
      const current = latestByRank.get(entry.rank)
      if (!current || new Date(entry.date) > new Date(current.date)) {
        latestByRank.set(entry.rank, entry)
      }
    }

    this.ranks = Array.from(latestByRank.values())

    this.maxRank =
      rankEnum[this.ranks.map(r => rankEnum[r.rank]).sort((a, b) => a - b)[0]]

    this.lastVerify = ranks
      .filter(r => r.rank === this.maxRank)
      .map(item => item?.date)
      .sort((a, b) => new Date(b) - new Date(a))[0]

    this.verifiedMonth = dayjs().diff(dayjs(this.lastVerify), 'month')

    // Get top position (lowest number)
    const positions = ranks.map(r => r?.position).filter(Boolean)
    this.maxPosition = positions.length ? Math.min(...positions) : null

    const powers = this.ranks.map(r => r?.power).filter(Boolean)
    this.maxPower = powers.length ? Math.max(...powers) : null

    const lvs = this.ranks.map(r => r?.lv).filter(Boolean)
    this.maxLevel = lvs.length ? Math.max(...lvs) : null

    // Most recent record for the highest rank
    this.rank = this.ranks
      .filter(r => r.rank === this.maxRank)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0]
  }
}

const user = (...args) => new User(...args)

export { user }
