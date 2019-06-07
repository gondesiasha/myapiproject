var hapi=require('@hapi/hapi');
require("dotenv").config();
var mysql=require('mysql');


var server=new hapi.server({
	host:'localhost',
	port:8000
});
 
 server.route({
 	method:'GET',
 	path:"/",
 	handler:(request,reply)=>{
 		return "welcome";
 	}
 })

// session api/producer/
//1
 server.route({
    method:"GET",
    path:"/api/producer/",
    handler:(request,reply)=>{

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query('SELECT * from producer', function (error, producers, fields) {
                if (error) reject(error);
                resolve(producers);
              });
               
              connection.end();
        })
        
    }
})



//2
server.route({
 	method:"post",
 	path:"/api/producer/",
 	handler:(request,reply)=>{
 		var array=[];
 		var count=0;
 		var name=request.payload.producer_name;
 		var em=request.payload.email;
 		var pw=request.payload.password_hash;
 		var tn=request.payload.twitter_name;
 		var sn=request.payload.soundcloud_name;
 		var ps=request.payload.producer_status;
 		if(name.length>=32)
 			{
 			array.push('it cant take more than 32 characters');
 			count++
 		}
 		if(name.includes('XxXxStr8FirexXxX')==true)
 		{
 			array.push('it cant take these chacaters');
 			count++;
 		}
 		if(em.includes('@gmail.com')==false)
 			{
 				array.push('use valid email');
 				count++;
 			}
 			
 		if(em.length>256){
 			array.push('email length cant have more than 256 characters');
 			count++;
 		}
 		if(tn.length>16)
 		{
 			array.push('twitter_name cannot have more than 16 characters');
 			count++;
 		}
 		if(sn.length>32)
 		{
 			array.push('soundcloud_name cannot have more than 32 characters');
 			count++;
 		}
        if((ps!="none")&&(ps!="not ready")&&(ps!="featured"))
        {
        	array.push('use valid producer_status');
        	count++;
        
        }
        if(count!=0)
        {
        	return array;
        }
       else{

        


 		
 		return new Promise((resolve,reject)=>{

            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();


              connection.query(`INSERT INTO producer(producer_name,email,password_hash,twitter_name,soundcloud_name,producer_status) VALUES('${name}','${em}','${pw}','${tn}','${sn}','${ps}')`, 
                            function (error, producers, fields) {
            if (error) 
            reject(error);
            resolve(producers);
          });
           
          connection.end();
      })





 	}
 }


 	
 });
//3

 server.route({
    method:"GET",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
    	var id=request.params.id;

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from producer  WHERE producer_id=${id} `, function (error, producers, fields) {
                if (error) reject(error);
                resolve(producers);
              });
               
              connection.end();
        })
        
    }
})

//4

server.route({
 	method:"delete",
 	path:"/api/producer/{id}",
 	handler:(request,reply)=>{
 		var id=request.params.id;
 		

 		
 		return new Promise((resolve,reject)=>{

            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();


                connection.query(` DELETE FROM producer WHERE producer_id=${id}
          `, 
            function (error, producers, fields) {
            if (error) reject(error);
            resolve(producers);
          });
           
          connection.end();
      })





 	
 }


 	
 });





//5
server.route({
 	method:"put",
 	path:"/api/producer/{id}",
 	handler:(request,reply)=>{
 		var id=request.params.id;
 		var array=[];
 		var count=0;
 		var name=request.payload.producer_name;
 		var em=request.payload.email;
 		var pw=request.payload.password_hash;
 		var tn=request.payload.twitter_name;
 		var sn=request.payload.soundcloud_name;
 		var ps=request.payload.producer_status;
 		if(name.length>=32)
 			{
 			array.push('it cant take more than 32 characters');
 			count++
 		}
 		if(name.includes('XxXxStr8FirexXxX')==true)
 		{
 			array.push('it cant take these chacaters');
 			count++;
 		}
 		if(em.includes('@gmail.com')==false)
 			{
 				array.push('use valid email');
 				count++;
 			}
 			
 		if(em.length>256){
 			array.push('email length cant have more than 256 characters');
 			count++;
 		}
 		if(tn.length>16)
 		{
 			array.push('twitter_name cannot have more than 16 characters');
 			count++;
 		}
 		if(sn.length>32)
 		{
 			array.push('soundcloud_name cannot have more than 32 characters');
 			count++;
 		}
        if((ps!="none")&&(ps!="not ready")&&(ps!="featured"))
        {
        	array.push('use valid producer_status');
        	count++;
        
        }
        if(count!=0)
        {
        	return array;
        }
       else{

        


 		
 		return new Promise((resolve,reject)=>{

            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();


                connection.query(` UPDATE producer  SET producer_name='${name}',email='${em}' WHERE producer_id=${id}
          `, 
            function (error, producers, fields) {
            if (error) reject(error);
            resolve(producers);
          });
           
          connection.end();
      })





 	}
 }


 	
 });







 server.route({
    method:"GET",
    path:"/api/beat",
    handler:(request,reply)=>{

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query('SELECT * from beats', function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})

  server.route({
    method:"GET",
    path:"/api/producer/{id}/approvedBeats",
    handler:(request,reply)=>{
    	var id=request.params.id;

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`select beat_name,producer_name from beats inner join producer on beats.producerId=producer.producer_id 
              	where approval_date!='null'  and approved=1 and producer_id=${id} `, function (error, producers, fields) {
                if (error) reject(error);
                resolve(producers);
              });
               
              connection.end();
        })
        
    }
})

  server.route({
    method:"GET",
    path:"/api/producer/{id}/submittedBeats",
    handler:(request,reply)=>{
    	var id=request.params.id;

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`select beat_name,producer_name from beats inner join producer on beats.producerId=producer.producer_id 
              	where  producer_id=${id} `, function (error, producers, fields) {
                if (error) reject(error);
                resolve(producers);
              });
               
              connection.end();
        })
        
    }
})


  //session-2 /api/beats

//1
  server.route({
    method:"GET",
    path:"/api/beats/submitted",
    handler:(request,reply)=>{
    	var id=request.params.id;

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`select beat_name from beats	where submit_date!='null' and approved=0  `, function (error, producers, fields) {
                if (error) reject(error);
                resolve(producers);
              });
               
              connection.end();
        })
        
    }
})


//2

 server.route({
    method:"GET",
    path:"/api/beats/approved/{startdate}/{enddate}",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`select beat_name from beats	where approved=1 && post_date_time > '${startdate}'&& post_date_time < '${enddate}'`, function (error, producers, fields) {
                if (error) reject(error);
                resolve(producers);
              });
               
              connection.end();
        })
        
    }
})

//3

  server.route({
    method:"GET",
    path:"/api/beats/posted/{startdate}",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;


        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`select beat_name from beats	where approved=1 && post_date_time > '${startdate}' && post_date_time < current_timestamp`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})

//4
  server.route({
    method:"GET",
    path:"/api/beats/pending",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;


        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`select beat_name from beats	where approved=1 && (approval_date > current_timestamp or approval_date='null')`, function (error, beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
})


//5

server.route({
 	method:"post",
 	path:"/api/beats",
 	handler:(request,reply)=>{
 		var bid=request.payload.beat_id;

 		var bname=request.payload.beat_name;
 		var burl=request.payload.beat_url;
 		var appr=request.payload.approved;
 		var proid=request.payload.producerId;
 		var subdate=request.payload.submit_date;
 		var appdate=request.payload.approval_date;
 		var postdate=request.payload.post_date_time;
 		console.log(burl==undefined);
 
 		if(bname.length>64)
 			return 'beat name must contain less than 64 characters';
 		else if(bname.includes('MUST LISTEN')==true)
 			return ' enter valid beat name';
 		else if((bname=='')&&(burl=='')&&(appr=='')&&(proid=='')&&(subdate==''))
 			return 'error';
 		//for(let i=0;i<max)
 		
       else{   


 		
 		return new Promise((resolve,reject)=>{

            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();


              connection.query(`INSERT INTO beats(beat_name,beat_url,approved,producerId,submit_date,approval_date,post_date_time)
               VALUES('${bname}','${burl}','${appr}','${proid}','${subdate}','${appdate}','${postdate}')`, 
                            function (error, beat, fields) {
            if (error) 
            reject(error);
            resolve(beat);
          });
           
          connection.end();
      })





 	}
 }


 	
 });
//6

server.route({
    method:"GET",
    path:"/api/beats/{id}",
    handler:(request,reply)=>{
    	var id=request.params.id;

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`select * from beats 
              	where  beat_id=${id} `, function (error, beats, fields) {
                if (error) reject(error);
                resolve(beats);
              });
               
              connection.end();
        })
        
    }
})

//7
server.route({
 	method:"delete",
 	path:"/api/beats/{id}",
 	handler:(request,reply)=>{
 		var id=request.params.id;
 		

 		
 		return new Promise((resolve,reject)=>{

            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();


                connection.query(` DELETE FROM beats WHERE beat_id=${id}
          `, 
            function (error, beat, fields) {
            if (error) reject(error);
            resolve(beat);
          });
           
          connection.end();
      })





 	
 }


 	
 });

//8

server.route({
 	method:"put",
 	path:"/api/beats/{id}",
 	handler:(request,reply)=>{
 		var id=request.params.id;

 		var bname=request.payload.beat_name;
 		var burl=request.payload.beat_url;
 		var appr=request.payload.approved;
 		var proid=request.payload.producerId;
 		var subdate=request.payload.submit_date;
 		var appdate=request.payload.approval_date;
 		var postdate=request.payload.post_date_time;
 		if(bname.length>64)
 			return 'beat name must contain less than 64 characters';
 		else if(bname.includes('[MUST LISTEN')==true)
 			return ' enter valid beat name';
 		
       else{

        


 		
 		return new Promise((resolve,reject)=>{

            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();


                connection.query(` UPDATE beats  SET beat_name='${bname}',beat_url='${burl}' WHERE beat_id=${id}
          `, 
            function (error, beat, fields) {
            if (error) reject(error);
            resolve(beat);
          });
           
          connection.end();
      })





 	}
 }


 	
 });

//9

server.route({
 	method:"put",
 	path:"/api/beats/{id}/approve",
 	handler:(request,reply)=>{
 		var id=request.params.id;

 		var bname=request.payload.beat_name;
 		var burl=request.payload.beat_url;
 		var appr=request.payload.approved;
 		var proid=request.payload.producerId;
 		var subdate=request.payload.submit_date;
 		var appdate=request.payload.approval_date;
 		var postdate=request.payload.post_date_time;
 		if(bname.length>64)
 			return 'beat name must contain less than 64 characters';
 		else if(bname.includes('MUST LISTEN')==true)
 			return ' enter valid beat name';
 		
       else{

        


 		
 		return new Promise((resolve,reject)=>{

            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();


                connection.query(` UPDATE beats  SET approval_date='${appdate}',post_date_time='${postdate}' WHERE beat_id=${id}
          `, 
            function (error, beat, fields) {
            if (error) reject(error);
            resolve(beat);
          });
           
          connection.end();
      })





 	}
 }


 	
 });
//10

server.route({
 	method:"put",
 	path:"/api/beats/{id}/unapprove",
 	handler:(request,reply)=>{
 		var id=request.params.id;

 		var bname=request.payload.beat_name;
 		var burl=request.payload.beat_url;
 		var appr=request.payload.approved;
 		var proid=request.payload.producerId;
 		var subdate=request.payload.submit_date;
 		var appdate=request.payload.approval_date;
 		var postdate=request.payload.post_date_time;
 		if(bname.length>64)
 			return 'beat name must contain less than 64 characters';
 		else if(bname.includes('MUST LISTEN')==true)
 			return ' enter valid beat name';
 		
       else{

        


 		
 		return new Promise((resolve,reject)=>{

            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();


                connection.query(` UPDATE beats  SET approval_date='${appdate}',post_date_time='${postdate}' WHERE beat_id=${id}
          `, 
            function (error, beat, fields) {
            if (error) reject(error);
            resolve(beat);
          });
           
          connection.end();
      })





 	}
 }


 	
 });











 





 server.start((err)=>{
 	if(err) throw err;
 	
 })
 console.log('server is started')


 