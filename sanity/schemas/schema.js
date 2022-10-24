import createSchema from 'part:@sanity/base/schema-creator';

import schemaTypes from 'all:part:@sanity/base/schema-type';
import brand from './brand';
import renter from './renter';
import vehicle from './vehicle';
import flags from './flags';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    brand,
    renter,
    vehicle,
    flags,
  ]),
})
