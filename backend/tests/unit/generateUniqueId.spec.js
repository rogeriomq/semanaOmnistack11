// const generateUniqueId = require('../../src/utils/generateUniqueId')
import generateUniqueId from '../../src/utils/generateUniqueId'

describe('Generate Unique ID', () => {
  it('Should generate unique string ID', () => {
    const id  = generateUniqueId()
    expect(id).toHaveLength(8)
  })

})