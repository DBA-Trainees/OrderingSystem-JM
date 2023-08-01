import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  FoodServiceProxy,
  FoodDto,
  CategoriesDto,
  TypeDto}from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
@Component({
  selector : 'app-createfood',
  templateUrl: './createfood.component.html',
})
export class createfoodComponent extends AppComponentBase implements OnInit {
saving = false;
base64textString: any;
food = new FoodDto();
category : CategoriesDto[];
types : TypeDto[];

filestorage : File;
imgFileName : string;
imgFileType : any;

selectedType : number = null;
selectedCategory: number = null;
selectedImageType : string = null;

@Output() onSave = new EventEmitter<any>();

constructor(
  injector: Injector,
  public _foodService: FoodServiceProxy,
  public router: Router,
  public bsModalRef: BsModalRef
) {
  super(injector);
}

  ngOnInit(): void {
    this.show();
  } 

  imageSelected(event: any): void{

    this.filestorage = event.target.files[0]; 
    this.imgFileName = this.filestorage.name;
    this.imgFileType = this.filestorage.type; 
    
    var imageFile = event.target.files[0];
    var reader = new FileReader();
    
    if(imageFile){
      reader.onload = (res: any) => {
        this.food.image = res.target.result.split(',')[1];
        this.food.imageName = imageFile.name;
        this.food.imageFileType = res.filetype;
        };
        reader.readAsDataURL(imageFile);
    }
  } 

  show():void{
    this._foodService.getCategory().subscribe(
      result => {
        this.category = result.items;
      }
    ); 
    this._foodService.getType().subscribe(
      result => {
        this.types = result.items;
      }
    )
  }

save(): void {
  this.saving = true;
  this.food.categoryId = this.selectedCategory;
  this.food.typesId = this.selectedType;

  this.food.imageName = this.imgFileName;
  this.food.imageFileType = this.imgFileType;

  this._foodService.create(this.food).subscribe(
    () => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
      // this.router.navigateByUrl('/app/createfood')
    },
    () => {
      this.saving = false;
    }
  );
}
 }
