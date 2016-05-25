const getDB = (env) => {
  switch (env) {
    case 'prod':
    case 'staging':
      return {
        url: '' // Websocket URL for your app. For a meteor app use `wss://vardygr-app.meteorapp.com/websocket`
      }
    case 'dev':
    default:
      return {
        //host: 'vardygr-app.meteorapp.com',
        host: 'localhost',
        port: '3000'
      }
  }
};

let opts = {
  env: 'dev', // ['dev', 'staging', 'prod']
  // codePushDeploymentKey: '',
  ddpConfig: {
    maintainCollections : true,
  }
}

Object.assign(opts.ddpConfig, getDB(opts.env));

export default opts;
