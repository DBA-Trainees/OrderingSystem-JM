import {Component,Injector,OnInit,EventEmitter,Output,} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import {forEach as _forEach,includes as _includes,map as _map,} from "lodash-es";
import { AppComponentBase } from "@shared/app-component-base";
import {FoodServiceProxy, FoodDto, CategoriesDto, TypeDto,} from "@shared/service-proxies/service-proxies";


@Component({
  selector: "app-editfood",
  templateUrl: "./editfood.component.html",
})
export class editfoodComponent extends AppComponentBase implements OnInit {
  saving = false;
  food = new FoodDto();
  category: CategoriesDto[];
  types : TypeDto[];
  base64textString: any;

  filestorage: File;
  img: string;
  id: number;

  imgFileName : string;
  imgFileType : string;

  selectedType: number = null;
  selectedCategory: number = null;
  selectedImageType: string = null;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _foodService: FoodServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._foodService.get(this.id).subscribe((result) => {
        this.food = result;
      });
    }
    this.show();
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


  imageSelected(event: any):void{
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

  save(): void {
    this.saving = true;
    this.food.categoryId = this.selectedCategory;
    this.food.typesId = this.selectedType;

    if (this.id !== 0) {
      this._foodService.update(this.food).subscribe(
        () => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }
  }
}
