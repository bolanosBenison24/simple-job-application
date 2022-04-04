const {
  both,
  compose,
  either,
  isEmpty,
  isNil,
  not
} = require('ramda')

export const notEmpty = compose(
  not,
  isEmpty
)

export const notNull = compose(
  not,
  isNil
)

export const neitherNullNorEmpty = both(
  notEmpty,
  notNull
)

export const eitherNullOrEmpty = either(
  isEmpty,
  isNil
)
