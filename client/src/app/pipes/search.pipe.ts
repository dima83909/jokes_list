import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(arr: any, key="", fields:any): any {
	if(!key) return arr;
	if(typeof fields == 'string'){
	  fields = fields.split(" ");
	}
	let _arr=[];
	for(let i=arr.length-1; i>=0;i--){
	  for(let j=0; j<fields.length;j++){
		if(!key) continue; 
		if(!arr[i][fields[j]]) continue; 
		if(arr[i][fields[j]].toLowerCase().indexOf(key.toLowerCase())>-1){
		  _arr.push(arr[i]);
		  break;
		}else if(key.toLowerCase().indexOf(arr[i][fields[j]].toLowerCase())>-1){
			_arr.push(arr[i]);
		  break;
		}
	  }
	}
	return _arr;
  }
}