import { am } from './db_users-am.js'
import { eu } from './db_users-eu.js'
import { sea } from './db_users-sea.js'
import { kr } from './db_users-kr.js'
import { jp } from './db_users-jp.js'
import { tw } from './db_users-tw.js'
import { rank } from './enum_rank.js'

const users = [...am, ...eu, ...sea, ...kr, ...jp, ...tw].sort((a, b) => {
  const aPos = a.maxPosition ?? Infinity
  const bPos = b.maxPosition ?? Infinity

  if (aPos !== bPos) {
    return aPos - bPos
  }

  if (a.maxPosition !== b.maxPosition) {
    return a.maxPosition - b.maxPosition
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
  // if (a.id !== b.id) {
  //   return a.id.localeCompare(b.id)
  // }

  return 0
})

// function checkDuplicates() {
//   console.log('----------------------- REPEATED UID::BEGIN')

//   // const duplicates = []

//   users.forEach(i => {
//     const hasInstances = users.filter(j => j.id === i.id) //&& j.server[0] === i.server[0]
//     if (hasInstances.length > 1) {
//       console.log('-----------------------------')
//       hasInstances.forEach((instance, index) => {
//         // duplicates.push(`${index} ${instance.name} ${instance.server.join(',')}`)
//         console.log(index, instance.name, instance.server.join(','))
//       })
//     }
//   })

//   // duplicates.forEach(i => console.log(i))

//   console.log('----------------------- REPEATED UID::END')
// }

// checkDuplicates()

export { users as usersDB }
