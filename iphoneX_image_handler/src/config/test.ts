
module.exports = {
	db: {
		redis: {
			host: '47.106.9.67',
			port: 6380,
			//password: '123456',
			db: 10
		},
		mongo: 'mongodb://47.106.9.67:27018/iphone_test',
	},
	protocol: 'http', // https
	tls: {
		key: 'path',
		cert: 'path'
	},
	port: 8080
};
