import { Component, Input, OnInit, ViewChild } from '@angular/core';

// Interface para cada item
export interface Item {
  id: number;
  name: string;
  parentId: number;
}

@Component({
  selector: 'app-nested-menu',
  templateUrl: './nested-menu.component.html',
  styleUrls: ['./nested-menu.component.scss']
})
export class NestedMenuComponent implements OnInit {

  @ViewChild('menu', {static: true}) menu: any;

  // atributo items de cada nivel
  private _items: Item[] = [];
  @Input() set items(values: Item[]) {
    if(values){
      this._items = values;
      this.processMenuLevel(this._items);
    }
  }
  get items(): Item[] {
   return this._items;
  }

  // items a mostrar en el nivel actual
  levelItems: Item[] = [];

  // id del elemento padre, para controlar el nivel
  parentId: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  /**
  * Método que procesa los elementos a mostrar del nivel actual
  * y actualiza en nivel en el que estamos
  **/
  processMenuLevel(items: Item[]) {
    console.log('items', items)
    // Si recibimos items para este nivel y hay parentId, ponemos dicho parentId para este nivel
    if(this.items.length){
      if(this.items[0].parentId){
        this.parentId = this.items[0].parentId;
      }
    }else{
      // Si no recibimos items para este nivel, estamos en un nodo hoja
      this.parentId = -1;
    }
    console.log('this.parentId', this.parentId)
    // items a mostrar en el nivel actual
    this.levelItems = items.filter(item => item.parentId == this.parentId);
  }

  /**
  * Método que devuelve si childItem es sucesor directo o indirecto de parentItem
  * @params parentItem: elemento padre
  * @params childItem: elemento sucesor
  * @return true/false
  **/
  isChildElement(childItem: Item, parentItem: Item){
    let isChildElement: boolean = false;
    // Sacamos los sucesores directos de parentItem
    let children: Item[] = this.items.filter(item => item.parentId == parentItem.id);
    // Mientras haya elementos que buscar y no hayamos encontrado childItem, seguimos buscando
    while(children.length){
      let child: any = children.pop();
      if(child){
        // Si childItem_ es el sucesor que estamos buscando devolvemos true
        if(child.id == childItem.id){
          isChildElement = true;
          break;
        }else{
          // Si childItem_ no es el sucesor que estamos buscando, metemos sus descendientes en children
          // para seguir con el while
          let childChildren = this.items.filter(item => item.parentId == child.id)
          children = children.concat(childChildren);
        }
      }
    }
    return isChildElement;
  }

  /**
  * Método que obtiene los sucesores directos e indirectos de item
  * @params item: elemento del cual hay que devolver sus sucesores
  * @return Item[]
  **/
  getItemChildren(item: Item){
    let itemElements: Item[] = [];
    itemElements = this.items.filter(item2 => this.isChildElement(item2, item));
    return itemElements;
  }

  /**
  * Método que devuelve si un item tiene sucesores
  * @params item: elemento
  * @return true/false
  **/
  isExpandable(item: Item){
    let isExpandable: boolean = false;
    // Sacamos los sucesores directos de item
    let children: Item[] = this.items.filter(item2 => item2.parentId == item.id);
    // Si tiene hijos es expandible
    if(children.length){
      isExpandable = true;
    }
    return isExpandable;
  }

}
