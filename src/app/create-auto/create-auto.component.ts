import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { BasicService } from '../services/basic.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-create-auto',
  templateUrl: './create-auto.component.html',
  styleUrls: ['./create-auto.component.css'],
  providers: [BasicService]
})
export class CreateAutoComponent implements OnInit {
 //Titulo a mostrar
 public titulo:string
 //Objeto auto a registrar 
 public auto:any
 //Formulario de auto
 public formAuto: FormGroup;
 //Mensaje de error
 public errorMessage;
 //Objeto que mostrará el titulo
 public autoTitle = {
   marca:'',
   modelo:'',
   anio:'',
   version:''
 }

  constructor(
    private basicService:BasicService,
    private DialogService:DialogService,
    private route:ActivatedRoute,
    private router:Router,
    public formBuilder: FormBuilder
  ) { 
    this.formAuto = formBuilder.group({
      marca:[null,
            Validators.compose(
            [ Validators.maxLength(15),
              Validators.pattern('[a-zA-Z0-9 \-_.áéóíúÁÉÍÓÚäöüßÄËÏÖÜñÑ]*'), 
              Validators.required])],
      modelo:[null,
            Validators.compose(
            [ Validators.maxLength(10),
              Validators.pattern('[a-zA-Z0-9 \-_.áéóíúÁÉÍÓÚäöüßÄËÏÖÜñÑ]*'), 
              Validators.required])],
      anio:[null,
            Validators.compose(
            [ Validators.maxLength(4),
              Validators.pattern('[0-9]*'), 
              Validators.required])],
      version:[null,
            Validators.compose(
            [ Validators.maxLength(10),
              Validators.pattern('[a-zA-Z0-9 \-_.áéóíúÁÉÍÓÚäöüßÄËÏÖÜñÑ]*'),
              Validators.required])]
    })
  }
  ngOnInit() {
  }

}
