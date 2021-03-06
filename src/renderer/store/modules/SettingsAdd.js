import db from '@/DB'
import constants from '@/constants'
import shortid from 'shortid'

const state = {
  logins: {},
  parties: []
}
const getters = {}
const mutations = {
  [constants.NEW_PARTY_GROUP](state, payload) {
    // add a null option please add a null option and look
    // at the files view comments
    db
      .get('party_groups')
      .push({
        id: shortid.generate(),
        username: payload.username,
        password: payload.password,
        parties: payload.party_group,
        abstainPresident: 0,
        abstainVicePresident: 0,
        abstainSecretary: 0,
        abstainTreasurer: 0,
        abstainLowerSchoolRepresentative: 0
      })
      .write()
  },
  [constants.GET_LOGINS](state, payload) {
    const logins = db
      .get('party_groups')
      .map(el => ({ username: el.username, password: el.password }))
      .value()

    const settings = db.get('settings.admin').value()
    console.log('teststing')
    console.log(settings)
    state.logins = [...logins, settings]
    console.log(state)
  },
  [constants.GET_PARTIES](state, payload) {
    const parties = db.get('party_groups').value()
    state.parties = parties
  },
  [constants.DELETE_PARTY](state, { id }) {
    db
      .get('party_groups')
      .remove({ id })
      .write()
  }
}
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
