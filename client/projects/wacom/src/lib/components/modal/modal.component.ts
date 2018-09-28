import { Component } from '@angular/core';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements {
	private id;
	public full;
	public cover;
	public header;
	public content;
	constructor(){}
	private modalClose: Subject<any> = new Subject();
	close(){
		this.modalClose.next();
		this.modalClose.complete();
	}
	onModalClose(): Observable<any> {
		return this.modalClose.asObservable();
	}
}
 