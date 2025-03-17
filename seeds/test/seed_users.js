exports.seed = async function(knex) {
    await knex('users').del();
  
    await knex('users').insert([
      { id: 1, name: 'Mic'},
      { id: 2, name: 'Drop'},
    ]);
  };
  