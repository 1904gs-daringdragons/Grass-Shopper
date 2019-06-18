'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

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
      price: 6525,
      imageUrl:
        'https://cdn.psychologytoday.com/sites/default/files/styles/thumbnail/public/field_blog_entry_images/Cannabis_Plant%20052216%20033117.jpg?itok=Jxlt9yKX&cache=oi7cwb',
      description: 'It has a great smell and is known all around the world.',
      quantity: 239,
      catagory: 'Loose Leaf'
    }),
    Product.create({
      name: 'Sour Diesel',
      price: 5499,
      imageUrl:
        'https://zenpype.com/wp-content/uploads/2018/10/recreational-cannabis1-192x192.jpg',
      description:
        'Favorite of hollywood heart-throb Vin Diesel, this herb does have a somewhat sour taste, but it is not intended to be eaten as is.',
      quantity: 123,
      catagory: 'Loose Leaf'
    }),
    Product.create({
      name: 'Cannabis Seeds',
      price: 3117,
      imageUrl:
        'https://blog.seedsman.com/wp-content/uploads/2016/08/cannabis-seeds-150x150.jpg',
      description:
        'Grow your own stuff (where legal) with this uncurated baggie of seeds. Name your own strain and hope for females!',
      quantity: 2383
    }),
    Product.create({
      name: "Chong's Choice THC Strips",
      price: 1500,
      imageUrl:
        'http://chongschoice.com/wp-content/uploads/2016/04/WEB_PRODUCTS_THC_STRIP_SQUARE-300x300.jpg',
      description:
        'Brought to us by legendary stoner, entertainer, and activist Tommy Chong, these strips are taken orally and dissolve to deliver 40mg of THC quickly.',
      quantity: 12342
    }),
    Product.create({
      name: 'Weed Pills',
      price: 99,
      imageUrl:
        'https://honestmarijuana.com/wp-content/uploads/2015/11/THC-Pills_7.jpg',
      description: 'The modern triumph of Big Pharma.',
      quantity: 10
    }),
    Product.create({
      name: 'Glass Bowl',
      price: 125,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/31XQeDNFlOL._SL500_AC_SS350_.jpg',
      description: "This bowl is perfect for tokin' buds.",
      quantity: 90,
      catagory: 'Paraphenalia'
    }),
    Product.create({
      name: 'Ditch Weed',
      price: 1,
      imageUrl:
        'http://3dsmolier.com/media/cache/27/67/27675a2e615569f7cbf50b5d263d753f.jpg',
      description: 'A very affordable cannabis product. Worth every penny.',
      quantity: 1543,
      catagory: 'Vacuum Packed'
    }),
    Product.create({
      name: 'Cosmic Brownies 12-pack',
      price: 299,
      imageUrl:
        'https://lifemadesimplebakes.com/wp-content/uploads/2014/03/cosmic-brownies-150x150.jpg',
      description:
        'These brownies are out of this world! They are not psychoactive; please stop asking.',
      quantity: 123,
      catagory: 'Edible'
    }),
    Product.create({
      name: 'Pet Caterpillar',
      price: 175,
      imageUrl:
        'https://s3-us-west-2.amazonaws.com/maven-user-photos/theweedblog/growing/j42BVlIoHUKAYygyplotlQ/RVlG9C2GV0eaUijtrdNymA',
      description:
        'This little pal snacks on cannabis leaves all day and thus will be a super chill buddy for you.',
      quantity: 123
    }),
    Product.create({
      name: "Sunny's Choice",
      price: '550',
      imageUrl:
        'https://hightimes.com/wp-content/uploads/2018/07/how-grind-weed-without-grinder-featured.jpg',
      description: 'A delicious strain made by Sunny',
      quantity: 1000,
      catagory: 'Loose Leaf'
    }),
    Product.create({
      name: 'Purple Wizard',
      price: '5050',
      imageUrl:
        'https://www.rubytreefilms.com/wp-content/themes/evermore/lib/utils/timthumb.php?src=http://www.rubytreefilms.com/wp-content/uploads/2017/10/HighHopes_04-Cannabis-Leaves-and-Buds-RES.jpg&h=500&w=920&zc=1&c=1&q=100&a=c',
      featuredUrl:
        'https://www.rubytreefilms.com/wp-content/themes/evermore/lib/utils/timthumb.php?src=http://www.rubytreefilms.com/wp-content/uploads/2017/10/HighHopes_04-Cannabis-Leaves-and-Buds-RES.jpg&h=500&w=920&zc=1&c=1&q=100&a=c',
      isFeatured: true,
      description: 'A specially made purple blend by Nick',
      quantity: 1000,
      catagory: 'Loose Leaf'
    }),
    Product.create({
      name: 'Crystal Palace',
      price: '3400',
      imageUrl:
        'https://media.npr.org/assets/img/2015/05/19/marijuana-promo_wide-3960c528d4a1a56cddb3d8602e7cd85da5a19bae-s900.jpg',
      featuredUrl:
        'https://media.npr.org/assets/img/2015/05/19/marijuana-promo_wide-3960c528d4a1a56cddb3d8602e7cd85da5a19bae-s900.jpg',
      isFeatured: true,
      description: 'Made with shards of real crystal',
      quantity: 1000,
      catagory: 'Vacuum Packed'
    }),
    Product.create({
      name: 'Space Weed',
      price: '99999999',
      imageUrl: 'https://i.redd.it/db4air5xx3gx.jpg',
      featuredUrl: 'https://i.redd.it/db4air5xx3gx.jpg',
      isFeatured: true,
      description:
        "Made in small batches in a space station in a 90's video game",
      quantity: 1000,
      catagory: 'Vacuum Packed'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      orderStatus: 'CREATED',
      recipientName: 'BOB',
      confirmationEmail: 'SMITH',
      payPalConfirmationNumber: 1,
      totalPrice: 90,
      shippingAddress: '123 fake st',
      shippingCity: 'Ohio',
      shippingState: 'OH',
      shippingZipcode: '10010'
    }),
    Order.create({
      orderStatus: 'SHIPPED',
      recipientName: 'DOG',
      confirmationEmail: 'GOD',
      payPalConfirmationNumber: 89889,
      totalPrice: 3000020,
      shippingAddress: 'kennel',
      shippingCity: 'heaven',
      shippingState: 'nirvana',
      shippingZipcode: '89927'
    })
  ])

  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${orders.length} orders`)

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
