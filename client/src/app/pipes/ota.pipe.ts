import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ota'
})
export class OtaPipe implements PipeTransform {
  transform(obj : any): any {
  	if(!obj) obj = [];
  	let arr = [];
	for(let key in obj){
    	arr.push(key);
	}
	return arr;
  }
}