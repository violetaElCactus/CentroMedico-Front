import { Component, Input, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MedicinaService } from '../../../../services/medicina.service';
import { SignosVitalesService } from '../../../../services/signos-vitales.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'],
})
export class RecetaComponent implements OnInit {
  @Input() idCita!: any;
  atencion!: any;
  signosVitales!: any;
  constructor(
    private medicinaService: MedicinaService,
    private signosVitalesService: SignosVitalesService
  ) {}

  calcularEdad(fecha_nacimiento) {
    let edad = '';
    let today = new Date();
    let birthDate = new Date(fecha_nacimiento);
    let años = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let d = today.getDate() - birthDate.getDate();
    if (m < 0) {
      años--;
      m = 12 + m;
    } else if (m === 0 && d < 0) {
      años--;
    }
    edad = años + ' años, ' + m + ' meses';
    return edad;
  }
  receta(receta) {
    let rec = receta;
    let recArr = JSON.parse(rec);
    let i;
    let recet = '';
    let dias;
    for (i = 0; i < recArr.length; i++) {
      recet =
        recet +
        '\n-Medicamento: ' +
        recArr[i].medicamento +
        ' via ' +
        recArr[i].via +
        ', una dosis de ' +
        recArr[i].dosis +
        ' cada ' +
        recArr[i].hrs +
        ' horas';
      try {
        dias = parseInt(recArr[i].dias);
        recet = recet + ' por ' + dias + ' días';
      } catch (error) {
        recet = recet + recArr[i].dias;
      }
    }
    return recet;
  }
  ngOnInit(): void {
    console.log(this.idCita);
    this.medicinaService
      .obtenerAtencionPorCita(this.idCita)
      .subscribe((resp) => {
        this.atencion = resp;
      });

    this.signosVitalesService
      .obtenerSignosVitalesPorId(this.idCita)
      .subscribe((resp) => {
        this.signosVitales = resp;
      });
  }

  createPdf() {
    console.log(this.atencion);

    const pdfDefinition: any = {
      //prettier-ignore
      content: [
       
        { 
          //cabecera
          stack: [
            'CENTRO MÉDICO Y PROCEDIMIENTOS ECOGRÁFICOS',
            {text:'Escuela de Medicina - Universidad de Tarapacá.', style:'subheader'},
            {text: 'Av. 18 de Septiembre #2222. Arica, Chile.', style:'subheader'}
          ],
          style: 'header'
        },
        {
          text: 'Fecha: ' + this.atencion.fechacon_ad, style: ['derecha','espacio']
        },
        {
         //Info paciente
          table: {
            headerRows: 1,
            widths: [ '*'], heights:['auto'],
    
            body: [
              [
                {
                 border: [true, true, true, true],
                 text: 'IDENTIFICACIÓN DEL PACIENTE\n\n\nNombre del paciente: ' + this.atencion.nombre_paciente
                 + '\n\nR.U.N: ' + this.atencion.rut_paciente 
                 + '                           Fecha de nacimiento: ' + this.atencion.fecha_nacimiento
                 + '               Edad: ' + this.calcularEdad(this.atencion.fecha_nacimiento), style: 'negrita'

                }
              ],   
            ]
          }
        },
        {
          text: '\n'
        },
        {
          //Receta
          table: {
            widths: ['*'],heights:['auto'],

            headerRows: 1,
            body: [
              [
                {
                 border: [true, true, true, true],
                 text: 'RECETA\n\n' + this.receta(this.atencion.med_ad)
                 , style: 'negrita'

                }
              ],   
            ]
          }
        },
        {
          text: '\n'
        },
        
        {
          //pie
          table: {
            widths: ['*','*'],
            
            body: [
              [{text:'\n\n______________________________\nInterno Medicina', style: 'pie'},
              {text: '\n\n______________________________\nDr(a). '+this.atencion.nombre_profesional
              + '\nRut: ' + this.atencion.usuario_rut, style: 'pie'}]
            ]
          },
          layout: 'noBorders'
        },
    
        {
          type: 'none',
          ul: [

          ]
        },
      ],
      styles: {
        header: {
          fontSize: 13,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 11,
          bold: false,
        },
        superMargin: {
          fontSize: 12,
          bold: false,
        },
        derecha: {
          alignment: 'right',
        },
        espacio: {
          margin: [0, 30, 0, 0],
        },
        negrita: {
          bold: true,
          fontSize: 10,
        },
        pie: {
          bold: true,
          fontSize: 12,
          alignment: 'center',
        },
      },
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
