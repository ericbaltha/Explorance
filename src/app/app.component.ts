//our root app component
import { Component, NgModule, VERSION, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'my-app',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]

})
export class AppComponent {
  private _users: User[];

  name: string;
  family: string;
  birthday: LocalDate;
  itemNum: number;
  editingIndex: number;


  constructor(private modalService: NgbModal) {
    this._users = [
      new User('Ali', 'Delshad'),
      new User('Hamid', 'Sadeghi'),
      new User('Amir', 'Olfat'),
      new User('Keyvan', 'Nasr')
    ]
  }



  get users(): User[] {
    return this._users;
  }

  validation() : any{
    if( this.name.match(/\d+/g) != null || this.family.match(/\d+/g) != null) {
      alert("Il ne peut pas y avoir de nombre dans votre nom ou nom de famille");
    }
    if(this.name.length < 2 || this.family.length < 2) {
      alert("Il doit y avoir au moins 2 lettres dans votre nom et nom de famille")
    }
    if(this.itemNum < 0) {
      alert("Vous devez entrer un nombre supérieur à 0")
    }
    if(this.birthday == null) {
      alert("Vous devez entrer une date")
    }
  }

  delete(index: number) {
    this._users.splice(index, 1);
  }

  setEditUser(index: number): void {
    this.editingIndex = index;
    this.name = this._users[index].name;
    this.family = this._users[index].family;
    this.birthday = this._users[index].birthday;
    this.itemNum = this._users[index].itemNum;
    this.toggleModal();
  }

  edit(): void {
    if(this.validation()) {
      this._users[this.editingIndex] = new User(this.name, this.family, this.itemNum, this.birthday);
    }
    
    this.editingIndex = undefined;
    this.name = "";
    this.family = "";
    this.itemNum = null;
    this.birthday = null;
  }

  add(): void {
    if(this.validation()) {
      this._users.push(new User(this.name, this.family, this.itemNum, this.birthday));
    }
    this.name = "";
    this.family = "";
    this.itemNum = null;
    this.birthday = null;
  }

  toggleModal(): void {
      document.getElementById("modal_users").classList.toggle("show_modal");
  }


}


export class AppModule { }


export class User {
  private _name: string;
  private _family: string;
  private _itemNum: number;
  private _birthday: LocalDate;

  constructor(name: string, family: string, itemNum?: number, birthday?: LocalDate) {
    this._name = name;
    this._family = family;
    this._birthday = birthday;
    this._itemNum = itemNum;
  }

  get name(): string {
    return this._name;
  }

  get family(): string {
    return this._family;
  }

  get itemNum(): number {
    return this._itemNum;
  }

  get birthday(): LocalDate {
    return this._birthday;
  }
}

export interface LocalDate {
  day: number;
  month: number;
  year: number;
}