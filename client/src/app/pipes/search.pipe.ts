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

    for(var i=arr.length-1; i>=0;i--){
      for(var j=0; j<fields.length;j++){
        
        if(arr[i][fields[j]]&& arr[i][fields[j]].indexOf(key)>-1){
          _arr.push(arr[i]);
          break;
        }
      }
    }
    return _arr;
  }
}