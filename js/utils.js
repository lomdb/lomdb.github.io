import { usersDB } from './db_users.js'
import { countryCodes } from './enum_country-codes.js'
import { t } from './translations.js'
import { rank } from './enum_rank.js'


function getTooltip(item, players, label) {
  const localLabel = label || item.label
  const localPlayers = players || item?.users
  localPlayers.sort((a, b) => {
    const aPos = a.maxPosition ?? Infinity
    const bPos = b.maxPosition ?? Infinity

    if (aPos !== bPos) {
      return aPos - bPos
    }
    if (a.lastVerify !== b.lastVerify) {
      return new Date(b.lastVerify) - new Date(a.lastVerify)
    }
    if (a.maxRank !== b.maxRank) {
      return rank[a.maxRank] - rank[b.maxRank]
    }
    if (a.langNumber !== b.langNumber) {
      return a.langNumber - b.langNumber
    }
    if (a.server[0] !== b.server[0]) {
      return a.server[0].localeCompare(b.server[0])
    }

    return 0
  })

  const names = localPlayers
    ?.map(user => {
      const tooltip = `${t('Verified')} ${user?.verifiedMonth} ${
        user?.verifiedMonth === 1 ? t('month') : t('months')
      } ${t('ago')}.`
      const rank = `
        <small class="pill help-tooltip ${user?.maxRank}">
          ${[t(user?.maxRank), user?.maxPosition].filter(Boolean).join(' :: ')}
          <div class="help">${t('Highest rank and position achieved')}</div>
        </small>
        <strong class="help-tooltip pill month">
          ${user?.verifiedMonth}
          <div class="help">${tooltip}</div>
        </strong>
      `
      return `<li>${rank} ${user.label}</li>`
    })
    .join('')

  return localPlayers?.length > 0
    ? {
        msg: localPlayers
          ? `<lom-users label="${localLabel}">${names}</lom-users>`
          : '',
      }
    : {
        msg: '',
      }
}

function validateCountryCode(id, serverId) {
  if (id === 'PT' && +serverId > 247) {
    return 'ESPT'
  } else if (id === 'ME' && +serverId > 90) {
    return 'TR'
  } else if (id === 'EUEN' && +serverId >= 262) {
    return 'MUSH'
  }
  return id
}

const numericIdCounters = {}

function getCountryCode(str) {
  if (str) {
    const parts = str.split('_')
    let id = parts[0]
    const serverId = parts[1]

    id = validateCountryCode(id, serverId)
    const numericId = countryCodes?.[id]

    if (!numericIdCounters[numericId]) {
      numericIdCounters[numericId] = 1
    }

    const index = numericIdCounters[numericId]++

    const users = usersDB.filter(
      user => user.server === [id, serverId].join('_')
    )

    return {
      id: id?.toLowerCase(),
      label: [id, serverId].join('_'),
      numericId,
      users,
      index,
    }
  }
}

export { getCountryCode, getTooltip, validateCountryCode }
