import crypto from 'crypto'
// const crypto = require('crypto')

export default function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX')
}
