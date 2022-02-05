import { Component, Input, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MedicinaService } from '../../../../services/medicina.service';
import { SignosVitalesService } from '../../../../services/signos-vitales.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css'],
})
export class ComprobanteComponent implements OnInit {
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

  presionArterialM(pa) {
    const paArr = pa.split('/');
    let pam = (2 * parseInt(paArr[1])) / 3 + parseInt(paArr[0]) / 3;
    pam = Math.trunc(pam);
    return pam;
  }

  examen(examenJson) {
    let examen = examenJson;
    let exArr = JSON.parse(examen);
    let i;
    let exam = '';
    for (i = 0; i < exArr.length; i++) {
      exam = exam + '\n-' + exArr[i].value;
    }
    return exam;
  }

  ngOnInit(): void {
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

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/jpg');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  async createPdf() {
    const pdfDefinition: any = {
      //prettier-ignore
      content: [
        {
          table: {
          
            widths: [ 100,'*',100],
            body: [
              [
                {
                  image: await this.getBase64ImageFromURL("/assets/images/logo-uta-impresion.jpg"),
                  fit: [80, 80]
                },
                {
                  //cabecera
                  stack: ['\n',
                    {text:'CENTRO MÉDICO Y PROCEDIMIENTOS ECOGRÁFICOS'},
                    {text:'Escuela de Medicina - Universidad de Tarapacá.', style:'subheader'},
                    {text: 'Av. 18 de Septiembre #2222. Arica, Chile.', style:'subheader'}
                  ],
                  style: 'header'
                },
                {
                  image: await this.getBase64ImageFromURL("/assets/images/logo-cmed.jpg"),
                  fit: [80, 80]
                },
              ]
            ]
            
          },  
          layout: 'noBorders'   
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
        //cuerpo
        {
          //Signos Vitales/Antropometría
          table: {
            widths: ['*', '*', '*', '*'],
            headerRows: 2,
            body: [
              [{text: 'SIGNOS VITALES', bold: 'true', colSpan: 2, alignment: 'left', fontSize: 10}, {},
              {text: 'ANTROPOMETRÍA', bold: 'true', colSpan: 2, alignment: 'left', fontSize: 10},{}],
              [{text: 'SAT. O2: ' + this.signosVitales.sat + '% ', fontSize: 8}, {text: 'PRESIÓN ART: ' + this.signosVitales.pam + ' mm Hg', fontSize: 8},
              {text: 'PESO: ' + this.signosVitales.peso + ' Kg', fontSize: 8}, {text: 'C. DE CINTURA: ' + this.signosVitales.ccintura + ' cm', fontSize: 8}],
              [{text: 'TEMP: ' + this.signosVitales.temp + '°C', fontSize: 8}, {text: 'PAM: ' + this.presionArterialM(this.signosVitales.pam) + ' mm Hg', fontSize: 8},
              {text: 'TALLA: ' + this.signosVitales.talla + ' m', fontSize: 8}, {text: 'EDO. NUT: ' + this.signosVitales.estado_nutri, fontSize: 8}],
              [{text: 'PULSO: ' + this.signosVitales.pulso + ' Lpm', fontSize: 8}, {text: 'F. RESP: ' + this.signosVitales.fresp + ' Rpm', fontSize: 8},
              {text: 'IMC: ' + this.signosVitales.imc + ' kg/m2', fontSize: 8}, ''],
            ]
          }
        },
        {
          text: '\n'
        },
        {
          //ANTECEDENTE DE ATENCIÓN
          table: {
            widths: ['*'],heights:['auto'],

            headerRows: 1,
            body: [
              [
                {
                 border: [true, true, true, true],
                 text: 'ANTECEDENTE DE ATENCIÓN\n\nMotivo de consulta: ' + this.atencion.mconsulta_ad
                 + '\n\nAnamnesis próxima: ' + this.atencion.aproxima_ad 
                 + '\n\nExamen físico:'
                 + '\nDeambulación: ' + this.atencion.deam_ad
                 + '\nFacie: ' + this.atencion.facie_ad
                 + '\nPiel y fanéreos: ' + this.atencion.piel_ad
                 + '\nEstado mental: ' + this.atencion.emental_ad
                 + '\nGanglios linfáticos: ' + this.atencion.aden_ad
                 + '\nCabeza: ' + this.atencion.cab_ad
                 + '\nCuello: ' + this.atencion.cuello_ad
                 + '\nTórax: ' + this.atencion.torax_ad
                 + '\nMamas: ' + this.atencion.mamas_ad
                 + '\nCorazón: ' + this.atencion.corazon_ad
                 + '\nPulmones: ' + this.atencion.pulmones_ad
                 + '\nAbdomen: ' + this.atencion.abd_ad
                 + '\nColumna: ' + this.atencion.col_ad
                 + '\nExtremidades Sup: ' + this.atencion.eess_ad
                 + '\nExtremidades Inf: ' + this.atencion.eeii_ad
                 + '\nGenitales: ' + this.atencion.geni_ad
                 + '\nEx. Neurológicos: ' + this.atencion.eneuro_ad
                 + '\nTacto rectal: ' + this.atencion.trectal_ad

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
          //DIAGNÓSTICO
          table: {
            widths: ['*'],heights:['auto'],

            headerRows: 1,
            body: [
              [
                {
                 border: [true, true, true, true],
                 text: 'DIAGNÓSICO(S)\n\nDiagnóstico principal (CIE10): ' + this.atencion.dgcie10_ad
                 + '\n\nOtros diagnósticos: ' + this.atencion.dgsec_ad 
                 + '\n\nObservaciones: ' + this.atencion.obsdg_ad
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
          //EXÁMENES
          table: {
            widths: ['*'],heights:['auto'],

            headerRows: 1,
            body: [
              [
                {
                 border: [true, true, true, true],
                 text: 'SOLICITUD DE EXÁMENES\n' + this.examen(this.atencion.planest_ad)
                 , style: 'negrita'

                }
              ],   
            ]
          }
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
    /*      table: {
            widths: [ '*','*'], heights:[80],
            border: [false, false, false, false],
            headerRows: 2,

            body: [
              [
                '\n\n______________________\nINTERNO MEDICINA', style: 'header',
                text: '\n\n______________________\nDr(a). '+this.atencion.nombre_profesional, style: 'header'
                
              ],
              [
                {
                 border: [false, false, false, false],
                 text: '\n\n______________________\nDr(a). '+this.atencion.nombre_profesional, style: 'header'
                }
              ],   
            ]
          }*/
        
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
