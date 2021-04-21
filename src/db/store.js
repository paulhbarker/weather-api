/**
 * In-memory store. If the API goes down, so does our info.
 * In a real-world scenario, this data would be stored in a database.
 */
const store = {
    users: {},
    tokens: {}
};

module.exports = store;
