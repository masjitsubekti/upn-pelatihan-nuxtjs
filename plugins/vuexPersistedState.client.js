import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => createPersistedState({ key: 'secretkinerja', paths: ['auth'] })(store)
