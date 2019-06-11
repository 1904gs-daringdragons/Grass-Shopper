### Link to cart object stored on User model.

* cart #1: starts as an empty cart,
  * add item and it's still cart 1,
  * checkout as cart 1 to become order#${userId}-${cart#}.
* cart #2: start empty...

I'm thinking that the _link_ is stored on the model.
Still not sure where the cart itself would be kept.
This doesn't exactly solve the problem.
