const aws = require('aws-sdk')
const index = require('./index.js')

describe('get SecretString from AWS SecretsManager', () => {
  const secretsManager = new aws.SecretsManager({
    accessKeyId: 'fake-access-key-id',
    secretAccessKey: 'fake-secret',
    region: 'us-east-1'
  })

  const secretName = 'secretName'

  const secretString = JSON.stringify({
    key1: 'value1',
    key2: 'value2'
  })

  const resp = {
    SecretString: secretString
  }

  secretsManager.getSecretValue = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue(resp)
  })

  it('should have parsed values', async () => {
    await index.getSecretValue(secretsManager, secretName)
    expect(process.env.key1).toEqual('value1')
    expect(process.env.key2).toEqual('value2')
  })

  it('should have written to file', async () => {
    const fs = require('fs')
    const outputPath = '.env'
    await index.getSecretValue(secretsManager, secretName)
    expect(fs.readFileSync(outputPath, 'utf8')).toEqual('key1=value1\nkey2=value2')
  })
})
