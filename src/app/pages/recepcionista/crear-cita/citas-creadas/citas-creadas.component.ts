import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PacienteService } from '../../../../services/paciente.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { CitasService } from '../../../../services/citas.service';

import { formatearFecha } from 'src/app/utils/formatearFecha';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-creadas',
  templateUrl: './citas-creadas.component.html',
  styleUrls: ['./citas-creadas.component.css'],
})
export class CitasCreadasComponent implements OnInit {
  fecha: any = this.route.snapshot.params['fecha'];
  mensajeCabecera!: string;
  listaCitas: any[] = [];
  listaPacientes!: any[];
  listaAreaMedica!: any[];
  listaProfesionales!: any[];
  listaProfesionalesFiltrado: any[] = [];

  closeResult = '';

  formularioCita: FormGroup = this.fb.group({
    id_paciente: ['', Validators.required],
    fecha: [this.fecha, [Validators.required]],
    area_medica: ['', Validators.required],
    hora: ['', [Validators.required]],
    id_usuario_recepcion: [this.usuario.rut],
    id_usuario_atencion: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    estado: ['creada'],
  });

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private usuarioService: UsuarioService,
    private citasService: CitasService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.mensajeCabecera = formatearFecha(this.fecha);
    pacienteService.obtenerPacientes().subscribe((resp) => {
      this.listaPacientes = resp;
    });

    this.listaAreaMedica = usuarioService.AreaMedica;

    usuarioService.obtenerUsuarios().subscribe((resp) => {
      this.listaProfesionales = resp;
    });

    citasService.obtenerCitasPorFecha(this.fecha).subscribe((resp) => {
      this.listaCitas = resp;
      console.log(this.listaCitas);
    });
  }

  ngOnInit(): void {}

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

  //prettier-ignore
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.listaPacientes.filter(v => v.rut.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: { nombre: string; apellido: string }) => {
    return x.nombre !== undefined ? x.nombre + ' ' + x.apellido : '';
  };

  setRutPaciente(id: string) {
    console.log(id);
    this.formularioCita.controls['id_paciente'].setValue(id);
  }

  get usuario() {
    return this.usuarioService.usuario;
  }

  public actualizarLista(aMedica: string) {
    this.listaProfesionalesFiltrado = [];
    console.log(this.listaProfesionales);
    this.listaProfesionales.map((item) => {
      if (item[aMedica] === 1)
        this.listaProfesionalesFiltrado.push({
          rut: item.rut,
          nombreCompleto: `${item.nombre} ${item.apellido}`,
        });
    });
  }

  crearCita() {
    const nuevaCita = this.formularioCita.value;
    nuevaCita.confirmada = 0;
    this.citasService.crearCita(nuevaCita).subscribe((res) => {
      if (res.ok === true) {
        Swal.fire(
          'Éxito',
          'Paciente fue registrado de forma correcta.',
          'success'
        );

        this.citasService.obtenerCitasPorFecha(this.fecha).subscribe((resp) => {
          this.listaCitas = resp;
        });
        this.modalService.dismissAll();
      } else {
        Swal.fire('Error', res, 'error');
      }
    });
  }
}
