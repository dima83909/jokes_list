import { Component, OnInit, NgModule, ViewChild} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ModalService, ImageService, FileService } from 'wacom';
import { HttpClient } from '@angular/common/http';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";


@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
    private id;
    public full;
    public cover;
    public header;
    public content;
  
    uploadPict(files: FileList) {
        this.image.resizeUpTo(files.item(0), (dataUrl)=>{
          this.us.avatarUrl = dataUrl;
          this.http.post<any>('/api/user/avatar',{
            dataUrl: dataUrl
          })
          .subscribe(resp => {
            this.us.avatarUrl = resp;
        });
      })
    }

    // close modal
    close(){
      this.mod.close(this.id);
    }
   constructor(private http: HttpClient,
            private us: UserService,
            private mod: ModalService,
            private image: ImageService,
            private file: FileService) {
   /* this.file.add({
      id: 'profilePicture',
      width:500,
      height:500
    }, dataUrl =>{
      console.log(dataUrl.length);
    })*/
   }
    ngOnInit() {
      let obj=this.mod.pull();
      for(let key in obj){
        this[key]=obj[key];
    }
  }
}