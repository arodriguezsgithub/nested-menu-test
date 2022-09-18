import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuItems: any;

  constructor(private httpClient: HttpClient){}

  ngOnInit() {
    // Leemos el json
    this.httpClient.get("assets/menu-elements.json").subscribe(data => {
      this.menuItems = data;
      console.log('Elementos leídos: ', this.menuItems);
    })
  }

}
