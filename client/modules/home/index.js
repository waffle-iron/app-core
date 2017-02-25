Template.s3_tester.events({
	"click button.upload": function(){
		var files = $("input.file_bag")[0].files

		S3.upload({
				files:files,
				path:"subfolder"
			},function(e,r){

		});
	}
})

Template.s3_tester.helpers({
	"files": function(){
		return S3.collection.find();
	}
})
