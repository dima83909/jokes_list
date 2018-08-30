import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef,
    ComponentRef,
    ViewChild
} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PopupService {
	private data = {};
       constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
        ) { }

   /* open(component: any = null, obj:any = {}) {
    if(!component) component = PopupComponent;
    if(!obj.id) obj.id = new Date().getTime();

    // Create a component reference from the component 
    let componentRefer = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRefer.hostView);
    // Get DOM element from component
    const domElem = (componentRefer.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    // Append DOM element to the body
    document.body.appendChild(domElem);
    // Wait some time and remove it from the component tree and from the DOM

    this.data[obj.id]={
      appRef:this.appRef,
      componentRefer:componentRefer
    }
    return obj.id;      
  }*/

    open(event, pops, config, left, top){

      console.log(config);
      
      switch(config.pos){
        case 'rt':
          left = event.clientX-event.offsetX + event.target.offsetWidth;
          top = event.clientY-event.offsetY - (event.target.offsetHeight*2);
          break;
        case 'r':
          left = event.clientX-event.offsetX + event.target.offsetWidth;
          top = event.clientY-event.offsetY - (event.target.offsetHeight/2);
          break;
        case 'rb':
          left = event.clientX-event.offsetX + event.target.offsetWidth;
          top = event.clientY-event.offsetY + event.target.offsetHeight;
          break;
        case 'b':
          left = event.clientX-event.offsetX + (event.target.offsetWidth/2) - (pops.nativeElement.offsetWidth/2);
          top = event.clientY-event.offsetY + event.target.offsetHeight;
          break;
        case 'lb':
          left = event.clientX-event.offsetX - pops.nativeElement.offsetWidth;
          top = event.clientY-event.offsetY + event.target.offsetHeight;
          break;
        case 'l':
          left = event.clientX-event.offsetX - pops.nativeElement.offsetWidth;
          top = event.clientY-event.offsetY - (event.target.offsetHeight/2);
          break;
        case 'lt':
          left = event.clientX-event.offsetX - pops.nativeElement.offsetWidth;
          top = event.clientY-event.offsetY - (event.target.offsetHeight*2);
          break;
        case 't':
          left = event.clientX-event.offsetX + (event.target.offsetWidth/2) - (pops.nativeElement.offsetWidth/2);
          top = event.clientY-event.offsetY - pops.nativeElement.offsetHeight;
          break;
        /*default:
          return this.default(event, pops, config);
      }*/
    }
  }
  /*  default(event, pops, config){

      let top = event.clientY-event.offsetY>pops.nativeElement.offsetHeight;
      
      let left = event.clientX-event.offsetX>pops.nativeElement.offsetWidth;
      
      let botton = document.documentElement.clientHeight-((event.clientX-event.offsetX)+event.target.offsetHeight)>pops.nativeElement.offsetHeight;
      
      let right = document.documentElement.clientWidth-((event.clientX-event.offsetX)+event.target.offsetWidth)>pops.nativeElement.offsetWidth;
      
      if(left&&top){
        config.pos = 'lt';
      } else if(right&&top) {
        config.pos = 'rt';
      } else if(right&&botton) {
        config.pos = 'rb';
      } else if(left&&botton) {
        config.pos = 'lb';
      } else if(top) {
        config.pos = 't';
      } else if(right) {
        config.pos = 'r';
      }else if(botton) {
        config.pos = 'b';
      }else if(left) {
        config.pos = 'l';
      } else config.pos = 'b';
      this.open(event, pops, config, left, top);
    }*/

/*
    close(id){
      this.data[id].appRef.detachView(this.data[id].componentRefer.hostView);
    }*/
}

