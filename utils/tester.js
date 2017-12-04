var MongoClient = require("mongodb").MongoClient;
var ctoj = require("csvtojson");

var readCsv = function(fileName, callback, colName) {
	var res = [];
	ctoj()
	.fromFile(fileName)
	.on('json',(jsonObj)=> {
		res.push(jsonObj);
	})
	.on('done',(error)=>{
		// console.log('end');
		// return res;
		// console.log(res);
		console.log('done!');
		callback(res,colName);
	})
};

var createCol = function(fileName, columnName) {
	readCsv(fileName, 
	function(result, colName) {
		var url = "mongodb://localhost:27017/assessment";
		// console.log('A:',result);
		MongoClient.connect(url, function(err, db) {
			if (err) {
				throw err;
			}

			db.collection('transactions').deleteMany({});

			db.createCollection(colName);
			db.collection(colName).deleteMany({});
			db.collection(colName).insertMany(result, function(res) {
				// db.collection(colName).find({}).toArray((err, res)=> {
				// 	console.log(res);
					db.close();
				// })
			});
		})
	}, columnName);
}

var createCols = function() {
	createCol('hack_cards.csv','consumers');
	createCol('hack_merchants.csv','merchants');
	// createCol('hack_transactions.csv','transactions');
}
createCols();

module.exports = createCols;