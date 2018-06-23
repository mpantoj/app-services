import { Component, OnInit } from '@angular/core';
//Servicio de comunicación de autos
import { BasicService } from '../services/basic.service';
//Componente modal
import { ConfirmComponent } from '../confirm/confirm.component';
//Servicio de dialogo
import {DialogService} from 'ng2-bootstrap-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css'],
  providers: [BasicService]
})
export class AutosComponent implements OnInit {
  public autos: Auto[]
  public titulo: String

  constructor(
    private basicService: BasicService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.titulo ="Autos Maravilla"
    }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.basicService.getData('autos').subscribe(
      (autos)=>{
        if(!autos){
          this.showConfirm('Ocurrió un problema',
        'No hay autos','error')
        }else{
          this.autos =autos.autos
          localStorage.setItem('autos', JSON.stringify(this.autos))
        }
      },
        (error)=>{
          console.log(error.message)
          if(error != null){
            this.showConfirm('Ocurrió un problema',
          <any>error.message,'error')
          }
        }
    )
  }
  showConfirm(title:string,message:string,kind:string) {
    let disposable = 
    this.dialogService.
    addDialog(ConfirmComponent,{title:title,message:message})
    .subscribe((isConfirmed)=>{
      //Si hay un error al obtener los autos, y damos
      //Ok intentamos nuevamente la petición
      if(kind=='error'){
        if(isConfirmed) {
            this.getData()
        }
      }
    });
    //Se cerrará el dialogo en 10 segundos si no se toma una acción
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
  }

view(auto:any){
  this.router.navigate(['/autos', auto._id, 'detail'])
}

}

class Auto {
  constructor(
    public marca:string,
    public modelo:string,
    public anio:number,
    public version:string
  ){}
}
