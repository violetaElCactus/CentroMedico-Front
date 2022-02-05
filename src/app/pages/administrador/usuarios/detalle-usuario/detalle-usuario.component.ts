import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import {
  NgbDateStruct,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

import { UsuarioService } from '../../../../services/usuario.service';

import { UsuarioNuevo } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css'],
})
export class DetalleUsuarioComponent implements OnInit, AfterViewInit {
  //Manejo dinámico del DOM
  @ViewChildren('inputAdministrativo')
  inputAdministrativo!: QueryList<ElementRef>;
  @ViewChildren('inputMedica')
  inputMedica!: QueryList<ElementRef>;
  validar: boolean = false;
  valorPassword: string = 'cm_123456789';
  valorPin: string = '12345';

  //Formularios
  perfilUsuario: any = { rut: '', nombre: '', apellido: '' };
  rut!: string;
  model!: NgbDateStruct;
  AreaMedica!: Array<any>;
  AreaAdministrativa!: Array<any>;
  formularioUsuario: FormGroup = this.fb.group({
    rut: [, [Validators.required]],
    nombre: [, [Validators.required]],
    apellido: [, [Validators.required]],
    correo_electronico: [, [Validators.required, Validators.email]],
    telefono: [, [Validators.required]],
    nacimiento: [, [Validators.required]],
    sexo: ['', [Validators.required]],
    coordinacion: [false],
    profesional: [false],
    direccion: [false],
    administrativo: [false],
    area_medica: this.fb.array([]),
    area_administrativa: this.fb.array([]),
  });

  formularioPin: FormGroup = this.fb.group({
    pin: ['', [Validators.required]],
  });

  //Variables NGBootstrap
  usuarioCollapse = false;
  credencialesCollapse = false;
  closeResult = '';

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.rut = this.route.snapshot.params['id'];
    this.AreaMedica = this.usuarioService.AreaMedica;
    this.AreaAdministrativa = this.usuarioService.AreaAdministrativa;

    //Consulta los datos del usuario desde el servidor
    this.usuarioService.obtenerUsuarioPorRut(this.rut).subscribe((resp) => {
      const {
        rut,
        nombre,
        apellido,
        nacimiento,
        sexo,
        correo_electronico,
        telefono,
        coordinacion,
        profesional,
        direccion,
        administrativo,
        area_medica,
        area_administrativa,
      } = resp;

      console.log(nacimiento);

      this.perfilUsuario = { rut, nombre, apellido };

      this.formularioUsuario.setValue({
        rut,
        nombre,
        apellido,
        nacimiento,
        sexo,
        correo_electronico,
        telefono,
        coordinacion,
        profesional,
        direccion,
        administrativo,
        area_medica: [],
        area_administrativa: [],
      });

      const area_medica_array: FormArray = this.formularioUsuario.get(
        'area_medica'
      ) as FormArray;

      const area_administrativa_array: FormArray = this.formularioUsuario.get(
        'area_administrativa'
      ) as FormArray;

      area_medica.map((item: any) => {
        area_medica_array.push(new FormControl(item));
      });

      area_administrativa.map((item: any) => {
        area_administrativa_array.push(new FormControl(item));
      });
    });
  }

  get usuario() {
    return this.usuarioService.usuario;
  }
  campoEsValido(campo: string) {
    return (
      this.formularioUsuario.controls[campo].errors &&
      this.formularioUsuario.controls[campo].touched
    );
  }

  select(d: any) {
    const date = new Date(d.year, d.month, d.day);
  }

  onAreaMedica(e: any) {
    const area_medica: FormArray = this.formularioUsuario.get(
      'area_medica'
    ) as FormArray;
    if (e.target.checked) {
      area_medica.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      area_medica.controls.forEach((item) => {
        if (item.value === e.target.value) {
          area_medica.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onAreaMedicaChange(e: any) {
    if (!this.formularioUsuario.get('rol_profesional')?.value) {
      const area_medica: FormArray = this.formularioUsuario.get(
        'area_medica'
      ) as FormArray;
      area_medica.clear();
    }
  }

  onAreaAdministrativa(e: any) {
    const area_administrativa: FormArray = this.formularioUsuario.get(
      'area_administrativa'
    ) as FormArray;

    if (e.target.checked) {
      area_administrativa.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      area_administrativa.controls.forEach((item) => {
        if (item.value == e.target.value) {
          area_administrativa.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onAdministrativoChange(e: any) {
    console.log('Entre');
    if (!this.formularioUsuario.get('rol_administrativo')?.value) {
      const area_administrativa: FormArray = this.formularioUsuario.get(
        'area_administrativa'
      ) as FormArray;
      area_administrativa.clear();
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.inputMedica.changes.subscribe((elm) => {
      elm._results.map((input: any) => {
        if (
          this.formularioUsuario.controls['area_medica'].value.includes(
            input.nativeElement.value
          )
        )
          input.nativeElement.checked = true;
      });
    });

    this.inputAdministrativo.changes.subscribe((elm) => {
      elm._results.map((input: any) => {
        if (
          this.formularioUsuario.controls['area_administrativa'].value.includes(
            input.nativeElement.value
          )
        )
          input.nativeElement.checked = true;
      });
    });
  }

  actualizar() {
    const usuarioActualizado: UsuarioNuevo = this.formularioUsuario.value;
    console.log(usuarioActualizado);
    this.usuarioService
      .actualizarUsuarioPorRut(usuarioActualizado, this.rut)
      .subscribe((valido) => {
        if (valido === true) {
          this.router.navigateByUrl('/dashboard/administrador/usuarios');
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
  }

  validarPin() {
    const pinIngresado: any = this.formularioPin.value;
    this.usuarioService
      .validarPin(pinIngresado, this.usuario.rut)
      .subscribe((valido) => {
        if (this.perfilUsuario.rut !== this.usuario.rut) {
          if (valido === true) {
            this.validar = true;
            this.usuarioService
              .reestablecerCredenciales(this.perfilUsuario.rut)
              .subscribe((resp) => {
                console.log(resp);
                const { clave, pin } = resp;
                this.valorPassword = clave;
                this.valorPin = pin;
              });
            Swal.fire(
              'Éxito',
              'Se reestablecio de forma correcta las credenciales.',
              'success'
            );
          } else {
            Swal.fire('Error', valido, 'error');
          }
        } else {
          Swal.fire(
            'Error',
            'No puedes cambiar el pin de tu propio usuario.',
            'error'
          );
        }
        this.modalService.dismissAll();
      });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
