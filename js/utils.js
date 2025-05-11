import { usersDB } from './db_users.js'
import { countryCodes } from './enum_country-codes.js'

function getTooltip(item, group = 0) {
  const names = item?.users
    ?.map(user => {
      const warning =
        !user?.lastVerify && user.maxRank === 'top'
          ? `
          <nn-icono class="exclamation pill sunglow" title="Old Entry"></nn-icono>
        `
          : ''
      const tooltip = `Verified ${user?.verifiedMonth} ${user?.verifiedMonth === 1 ? 'month' : 'months'} ago.`
      const rank = `
        <small class="pill help-tooltip ${user?.maxRank}">
          ${[user?.maxRank, user?.maxPosition].filter(Boolean).join(' :: ')}
          <div class="help">Highest rank and position achieved</div>
        </small>
        <strong class="help-tooltip pill month" Date: ${user?.lastVerify}">
          ${user?.verifiedMonth}
          <div class="help">${tooltip}</div>
        </strong>
      `
      return `<li>${rank} ${user.label} ${warning}</li>`
    })
    .join('')
  const classes = ['group']

  return item?.users?.length > 0
    ? {
        classes,
        msg: item?.users
          ? `<lom-users label="${[item.label, group ? `(${group})` : null].join(
              ' '
            )}">${names}</lom-users>`
          : '',
      }
    : {
        classes: [],
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
