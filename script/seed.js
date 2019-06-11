'use strict'

const db = require('../server/db')
const {User, Product, Order, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Green Cannabis',
      price: 65.25,
      imageUrl:
        'https://cdn.psychologytoday.com/sites/default/files/styles/thumbnail/public/field_blog_entry_images/Cannabis_Plant%20052216%20033117.jpg?itok=Jxlt9yKX&cache=oi7cwb',
      description: 'It has a great smell and is known all around the world.'
    }),
    Product.create({
      name: 'Sour Diesel',
      price: 54.99,
      imageUrl:
        'https://zenpype.com/wp-content/uploads/2018/10/recreational-cannabis1-192x192.jpg',
      description:
        'Favorite of hollywood heart-throb Vin Diesel, this herb does have a somewhat sour taste, but it is not intended to be eaten as is.'
    })
  ])
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
