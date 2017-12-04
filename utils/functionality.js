var MongoClient = require("mongodb").MongoClient;
var url= "mongodb://localhost:27017/assessment";
var validateCSV = function (cvc, id){
	var query = {"card_member_id": id}
	return new Promise((resolve, reject) => {
		MongoClient.connect(url,function(err,db){
			if(err) throw err;
			db.collection("consumers").find(query).toArray(function(err,result){
				db.close();
				if (result.length==0) {
					resolve(null);
					return ;
				}
				var item=result[0];
				if(item["cvv"] === cvc){
					var date;
					var testDate =new Date();
					date = Date.parse(item["expiry_date"] + " " + testDate.getFullYear());
					console.log(date);
					if(date<testDate){
						resolve(null);
						return ;
					}
					else{
						resolve(result); 
						return result;
					}
				}
				else{
					resolve(null);
					return ;
				}
				resolve(result);
			})
		})
	})
}
validateCSV('76898', '107')
.then((result) => {
	console.log(result);
})