const Lab = require('@hapi/lab');
const Hoek = require('@hapi/hoek');
const Knex = require('knex');
const knexConfig = require('../knexfile').test;
const knex = Knex(knexConfig);

/**
 * A simple DatabaseFixture to initialize, populate, clean up, and destroy
 * the test database.
 */
const DatabaseFixture = {
    async init() {
        await knex.migrate.down();
        await knex.migrate.up();
        await knex.seed.run({ env: 'test' });
        return knex;
    },
    async populate(knexInstance) {
        await knex.seed.run({ env: 'test' });
    },
    async truncate(knexInstance) {
        // Truncate tables to remove any changes made during the test
        // Adjust the table names as necessary or implement a strategy DP
        await knexInstance('users').truncate();
    },
    async destroy(knexInstance) {
        await knexInstance.destroy();
    }
};

exports.script = function () {
    const lab = Lab.script();
    const { describe, it, before, after, beforeEach, afterEach } = lab;
    let knexInstance;

    // Wraps the describe call to provide centralized test setup/teardown
    lab.describe = (title, callback) => {
        describe(title, () => {
            before(async () => {
                // Initializes the database once for this test suite
                knexInstance = await DatabaseFixture.init();
            });

            beforeEach(async () => {
                // Ensures the database is populated with seed data before each test
                await DatabaseFixture.populate(knexInstance);
            });

            afterEach(async () => {
                // Cleans up any changes from the test
                await DatabaseFixture.truncate(knexInstance);
            });

            after(async () => {
                // Destroys the database connection once all tests are done
                await DatabaseFixture.destroy(knexInstance);
            });

            callback();
        });
    };

    // Optionally, wrap "it" if you need additional behavior per test.
    lab.it = (title, test) => {
        it(title, async () => {
            await test();
        });
    };

    return lab;
};
