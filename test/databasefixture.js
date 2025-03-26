const Lab = require('@hapi/lab');
const Hoek = require('@hapi/hoek');
const knexSingleton = require('../src/persistence/knex_singleton');
knexSingleton.setEvn("test");
let knexInstance = knexSingleton.getInstance();

/**
 * A simple DatabaseFixture to initialize, populate, clean up, and destroy
 * the test database.
 */

const DatabaseFixture = {
    async init() {
        if(!knexInstance){
           knexInstance = knexSingleton.getInstance(); 
        }
        await knexInstance.migrate.down();
        await knexInstance.migrate.up();
        await knexInstance.seed.run({ env: 'test' });
        return knexInstance;
    },
    async populate() {
        await knexInstance.seed.run({ env: 'test' });
    },
    async truncate() {
        // Truncate tables to remove any changes made during the test
        // Adjust the table names as necessary or implement a strategy DP
        await knexInstance('users').truncate();
    },
    async destroy() {
        await knexInstance.destroy();
        knexInstance = null;
    }
};

exports.script = function () {
    const lab = Lab.script({parallel: false});
    const { describe, it, before, after, beforeEach, afterEach } = lab;

    // Wraps the describe call to provide centralized test setup/teardown
    lab.describe = (title, callback) => {
        describe(title, () => {
            before(async () => {
                // Initializes the database once for this test suite
                knexInstance = await DatabaseFixture.init();
            });

            beforeEach(async () => {
                // Ensures the database is populated with seed data before each test
                await DatabaseFixture.populate();
            });

            afterEach(async () => {
                // Cleans up any changes from the test
                await DatabaseFixture.truncate();
            });

            after(async () => {
                // Destroys the database connection once all tests are done
                await DatabaseFixture.destroy();
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
