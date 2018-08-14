# wacom waw Angular6 common
Module which support waw project on basic level, elements and scripts which is needed on all projects. Installation:
```javascript
npm i --save wacom
```
## Mongo Service
Mongo Service is an suportive service for combining angular 6 client with waw CRUD back-end. Example of importing mongo service:
```javascript
import { MongoService } from 'wacom';
constructor(private mongo: MongoService){};
```
### create
It's a function which connecting with waw CRUD create. As parameters accepting name of mongo collection, object with values for document and optionally callback function which will return the document. Document will be filled inside read callbacks. Example:
```javascript
mongo.create('colName', {
	name: 'docName'
}, created => {
	console.log('created');
});
```
### read
It's functions which connecting with waw CRUD read. As parameters accepting name of mongo collection, optionally options, optionally callback which will return all documents in array as first parameter and in object with doc._id placeholder for doc as second parameter. Function returning directing array which will host the documents. Example:
```javascript
mongo.get('colName',{
	fields: 'name'
}, () => {
	console.log('document is read');
})
```
### updateAll
It's a function which connecting with waw CRUD updateAll. As parameters accepting name of mongo collection, document object, optionally options and optionally callback function which will return the document. Example:
```javascript
mongo.updateAll('colName', {
	name: doc.name,
	_id: doc._id
}, {
	fields: 'name'
}, () => {
	console.log('document is updated');
});
```
### updateUnique
It's a function which connecting with waw CRUD updateUnique. As parameters accepting name of mongo collection, object with document _id and field value, optionally options and optionally callback function which will return if field has been updated. Example:
```javascript
mongo.updateUnique('colName', {
	name: doc.name,
	_id: doc._id
}, {
	fields: 'name'
}, (resp) => {
	if(resp){
		console.log('field is updated');
	}else {
		console.log('field is not updated');
	} 
});
```
### delete
It's a function which connecting with waw CRUD delete. As parameters accepting name of mongo collection, document object, optionally options and optionally callback function which will return the document. Example:
```javascript
mongo.delate('colName',{
	_id: doc._id
}, {
	name: 'admin'
}, () => {
	console.log('document is deleted');
});
```
### _id
It's a function which provide new mongo _id. As parameters accepting callback function which will return the _id. Example:
```javascript
mongo._id(function(_id){
	console.log(_id);
});
```
### to_id
It's a function which convert array of documents to array of _id. Example:
```javascript
mongo.to_id([{
	_id: '1'
}, '2']);
// ['1', '2']
```
### afterWhile
It's a function which works after specified time. As parameters accepting document, callback and optionally time. Example:
```javascript
mongo.afterWhile(doc, () => {
	console.log('text was wroten');
}, 2000)
```
### beArr
It's function which checking value if it's array or not. If this value isn't array it'll convert it to array. Example each doc will have data as array:
```javascript
mongo.get('colName',{
	replace:{
		'data':mongo.beArr
	}
});
```
### beObj
It's function which checking value if it's object or not. If this value isn't object it'll convert it to object. Example each doc will have data as object:
```javascript
mongo.get('colName',{
	replace:{
		'data':mongo.beObj
	}
});
```
### forceArr
It's function convert any value to array. Example each doc will have data as empty array:
```javascript
mongo.get('colName',{
	replace:{
		'data':mongo.forceArr
	}
});
```
### forceObj
It's function convert any value to object. Example each doc will have data as empty object:
```javascript
mongo.get('colName',{
	replace:{
		'data':mongo.forceObj
	}
});
```
## SD Service
## Modal Service
## Popup Service
## Spinner Service
## File Service
## Socket Service
## Image Service
## Hash Service
