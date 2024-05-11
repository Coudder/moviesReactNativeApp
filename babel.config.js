module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv',{
       envName: 'APP_NAME',
       moduleName: '@env',
       path: '.env'
    }]
  ]
};
