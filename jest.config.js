module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  globals: {
    NODE_ENV: 'test'
  },
  setupFiles: ['dotenv/config']
}

process.env = Object.assign(process.env, {
  INPUT_OUTPUT_PATH: '.env'
})
