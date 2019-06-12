'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cheech',
      lastName: 'Marin',
      email: 'cheech@cheechmarin.com',
      password: '420',
      isAdmin: true
    }),
    User.create({
      firstName: 'Tommy',
      lastName: 'Chong',
      email: 'tommy@chongschoice.com',
      password: '420'
    }),
    User.create({
      firstName: 'Smokey',
      lastName: 'Bear',
      email: 'ih8fires@gmail.com',
      password: 'onlyu'
    })
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
    }),
    Product.create({
      name: 'Cannabis Seeds',
      price: 31.17,
      imageUrl:
        'https://blog.seedsman.com/wp-content/uploads/2016/08/cannabis-seeds-150x150.jpg',
      description:
        'Grow your own stuff (where legal) with this uncurated baggie of seeds. Name your own strain and hope for females!'
    }),
    Product.create({
      name: "Chong's Choice THC Strips",
      price: 15.0,
      imageUrl:
        'http://chongschoice.com/wp-content/uploads/2016/04/WEB_PRODUCTS_THC_STRIP_SQUARE-300x300.jpg',
      description:
        'Brought to us by legendary stoner, entertainer, and activist Tommy Chong, these strips are taken orally and dissolve to deliver 40mg of THC quickly.'
    }),
    Product.create({
      name: 'Weed Pills',
      price: 0.99,
      imageUrl:
        'https://honestmarijuana.com/wp-content/uploads/2015/11/THC-Pills_7.jpg',
      description: 'The modern triumph of Big Pharma.'
    }),
    Product.create({
      name: 'Glass Bowl',
      price: 12.5,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/31XQeDNFlOL._SL500_AC_SS350_.jpg',
      description: "This bowl is perfect for tokin' buds."
    }),
    Product.create({
      name: 'Ditch Weed',
      price: 0.01,
      imageUrl:
        'http://3dsmolier.com/media/cache/27/67/27675a2e615569f7cbf50b5d263d753f.jpg',
      description: 'A very affordable cannabis product. Worth every penny.'
    }),
    Product.create({
      name: 'Cosmic Brownies 12-pack',
      price: 2.99,
      imageUrl:
        'https://lifemadesimplebakes.com/wp-content/uploads/2014/03/cosmic-brownies-150x150.jpg',
      description:
        'These brownies are out of this world! They are not psychoactive; please stop asking.'
    }),
    Product.create({
      name: 'Pet Caterpillar',
      price: 17.5,
      imageUrl:
        'https://s3-us-west-2.amazonaws.com/maven-user-photos/theweedblog/growing/j42BVlIoHUKAYygyplotlQ/RVlG9C2GV0eaUijtrdNymA',
      description:
        'This little pal snacks on cannabis leaves all day and thus will be a super chill buddy for you.'
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
