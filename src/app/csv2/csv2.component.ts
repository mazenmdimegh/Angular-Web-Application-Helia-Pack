import { Component, OnInit ,ViewChild} from '@angular/core';
import { CsvserviceService } from '../services/csvservice.service';
import { AlertsService } from '../services/alerts.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Router } from '@angular/router';
import { ExportService } from '../services/export.service';
import { Export2Service } from '../services/export2.service';
@Component({
  selector: 'app-csv2',
  templateUrl: './csv2.component.html',
  styleUrls: ['./csv2.component.css']
})
export class Csv2Component  {
  
  private num:number = 0;
  private rows :any[]= [];
  private R :any[]= [];
  
  private arrl:number=1;
  private n:any;
  private a:any;
  private date1:any;
  private date:any;
  private d:any;
  private d1:any;
  private heur:any;
  private H:any;
  private H1:any;
  private H3:any;
  private H4:any;
  private H2:String="";
  private Min:any;
  public hour:any;
  public data:any;
  public data1:any;
  public data2:any;
  public p:boolean=true;
  public hours:boolean=false;
  public model: NgbDateStruct | undefined;
  public da: { year: number; month: number; } | undefined;
  private D:string="";

  public size:number=10;
  public currentPage:number=0;
  public totalPages:any;
  public pages:Array<number> |undefined ;
  public currentKeyword:String="";
  constructor(private exportService:Export2Service,private Csvservice:CsvserviceService,private fb:FormBuilder,private toastr: AlertsService,private calendar: NgbCalendar,private router:Router,public authentificationService:AuthentificationService) { }
   @ViewChild('filImportInput',{static:false})fileImportInput:any;
   registrationForm= this.fb.group({
    dp:['']
  })
    save:any;
    save2:any;
    ngOnInit(): void {
      if(!this.authentificationService.isAuthenticated){
        this.router.navigate(["Login"]);
      }
    }
  
   //array varibales to store csv data
   lines :any[]= []; //for headings
   linesR :any[]= []; // for rows
   //File upload function
    onChercher(value:any){
      
       //console.log("onChercher done");
    this.currentKeyword=value.dp;
    //console.log(this.currentKeyword);
    this.currentPage=0;
    this.Chercher(); 
  }
  onPagesEmploye(i:number){
    
    this.currentPage=i;
    this.Chercher();
  }
  Chercher(){
    
     //console.log("Chercher done");
    //console.log(this.registrationForm.value["dp"]);
    if(this.registrationForm.value["dp"]["month"]>10){
      this.D=this.registrationForm.value["dp"]["year"]+"-"+this.registrationForm.value["dp"]["month"]+"-"+this.registrationForm.value["dp"]["day"]
    }else{
      this.D=this.registrationForm.value["dp"]["year"]+"-0"+this.registrationForm.value["dp"]["month"]+"-"+this.registrationForm.value["dp"]["day"]
    }
    
    //console.log(this.D);
    this.Csvservice.filter(this.D,this.currentPage, this.size)
    .subscribe(data=>{
      this.hour=data;
      this.totalPages=this.hour["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
    },err=>{
      console.log(err);
    }); if(this.hour["page"].totalPages==0){this.toastr.showWarning('il n\'ya pas des enregistrements pour cette date', 'Erreur');this.hours=false;}
        else{
          this.hours=true;
        //console.log("worked");
      }
    
  } 
  export(){
    if(this.registrationForm.value["dp"]["month"]>10){
      this.D=this.registrationForm.value["dp"]["year"]+"-"+this.registrationForm.value["dp"]["month"]+"-"+this.registrationForm.value["dp"]["day"]
    }else{
      this.D=this.registrationForm.value["dp"]["year"]+"-0"+this.registrationForm.value["dp"]["month"]+"-"+this.registrationForm.value["dp"]["day"]
    }
    this.Csvservice.GetHours(this.D)
    .subscribe(data=>{
      this.data1=data;
      this.exportService.export(this.data1["_embedded"]["hours"],"ExportedCSV");
      for(let i = 0; i < this.data1["_embedded"]["hours"].length; i++){
        this.data.push(this.data1["_embedded"]["hours"][i]);
        }
      
    },err=>{
      console.log(err);
    })
    this.toastr.showSuccess('File Downloaded Successfully','Success');
    
      
    
    
  }
  selectToday() {
   // this.p=false;
    //this.hours=false;
    this.model = this.calendar.getToday();
    this.onChercher(this.calendar.getToday()["year"]+"-0"+this.calendar.getToday()["month"]+"-"+this.calendar.getToday()["day"]);
  }
   changeListener(e: Event){
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    
    
     if(files && files.length > 0) {
      
/*        this.Csvservice.gethours()
       .subscribe(data=>{
        this.hour=data;

     
      },err=>{
        console.log(err);
      })
      console.log(this.registrationForm.value["dp"]);  */

        let file : File = files[0] as File; 
        
         // console.log(file.name);
         // console.log(file.size);
         // console.log(file.type);
          //File reader method
          let reader: FileReader = new FileReader();
          reader.readAsText(file);
       this.toastr.showSuccess('Success', 'Csv Saved successfuly');
        
          reader.onload = (e) => {
           let csv: any = reader.result;
           let allTextLines = [];
           csv=csv.replace(/\r\n/g,"?");
           allTextLines = csv.split( "?");
            
          //Table Headings
           let headers = allTextLines[0].split(';');
           let data = headers;
           let tarr :any[]= [];
            
           for (let j = 0; j < headers.length; j++) {
             
             tarr.push(data[j]);
           }
           //Pusd headings to array variable
           this.lines.push(tarr);
           
           
          
           // Table Rows
           let tarrR :any[]= [];
           
           this.arrl = allTextLines.length;
           
           for(let i = 1; i < this.arrl; i++){
           this.rows.push(allTextLines[i].split(';'));
            
           }//console.log(this.arrl);
           //console.log(this.rows);
           for (let j = 0; j < this.arrl; j++) {
            
               tarrR.push(this.rows[j]);
              /*if(this.rows[j][0]!=""){
                this.n=j;
                console.log(this.n);
                
               
              }*/
              
              /* if(tarrR[j][0]==""){
                tarrR.pop();
                console.log("noo");
              } */
           }
           //console.log(tarrR);
           this.num=this.arrl;
            while(this.num>8){
             tarrR.pop();//console.log(tarrR);
             this.num--;
            }this.linesR.push(tarrR);
            //Push rows to array variable
            /*for (let j = 0; j <this.arrl; j++) {
            if(tarrR[j][0]==""){
             console.log("noo"+j);
            }
            }*/
           this.linesR.push(tarrR);
           //console.log(this.rows);
           for (let j = 0 ; j < this.arrl; j++) {
             //console.log(j%2);
             if(this.rows[j][3].split(" ")[0]==this.rows[j+1][3].split(" ")[0]&&( this.rows[j+1][6]=="Invalide"|| this.rows[j+1][6]=="OK")){
              this.d=this.rows[j][3];
              this.d1=this.rows[j+1][3];
              this.H3=this.d.split(" ")[0];
              this.H4=this.d1.split(" ")[0];
              this.date=this.H3.split("/")[2]+"-"+this.H3.split("/")[1]+"-"+this.H3.split("/")[0]+"T"+this.d.split(" ")[1];
              this.date1=this.H4.split("/")[2]+"-"+this.H4.split("/")[1]+"-"+this.H4.split("/")[0]+"T"+this.d1.split(" ")[1];
              this.H=Math.floor(((new Date(this.date1)).valueOf()-(new Date(this.date)).valueOf())/3600000);
              this.H1=Math.round(((new Date(this.date1)).valueOf()-(new Date(this.date)).valueOf())/3600000);
              //console.log(this.date);
              if(this.H1>this.H){
                this.Min=60-(((new Date(this.date).valueOf()-new Date(this.date1).valueOf())-Math.floor((new Date(this.date).valueOf()-new Date(this.date1).valueOf())/3600000)*3600000)/60000);
              }else{
              this.Min=60-((new Date(this.date).valueOf()-new Date(this.date1).valueOf())-Math.floor((new Date(this.date).valueOf()-new Date(this.date1).valueOf())/3600000)*3600000)/60000;
            }
              this.heur=this.H+":"+this.Min;
              
              this.save2={noId:this.rows[j+1][0],no:this.rows[j+1][1],nom:this.rows[j+1][2],date:this.date.split("T")[0],heure:this.heur}
              if(this.save2["noId"]!=0 && this.H>0 && this.H<15){

                this.Csvservice.SaveHours(this.save2)
                .subscribe(data=>{
                  
                },err=>{
                  console.log(err);
            
                })
                
               }
             }else{ if(this.rows[j][3].split(" ")[0]==this.rows[j+1][3].split(" ")[0]&&( this.rows[j+2][6]=="Invalide"|| this.rows[j+1][6]=="OK")){
              this.d=this.rows[j][3];
              this.d1=this.rows[j+2][3];
              this.H3=this.d.split(" ")[0];
              this.H4=this.d1.split(" ")[0];
              this.date=this.H3.split("/")[2]+"-"+this.H3.split("/")[1]+"-"+this.H3.split("/")[0]+"T"+this.d.split(" ")[1];
              this.date1=this.H4.split("/")[2]+"-"+this.H4.split("/")[1]+"-"+this.H4.split("/")[0]+"T"+this.d1.split(" ")[1];
              this.H=Math.floor(((new Date(this.date1)).valueOf()-(new Date(this.date)).valueOf())/3600000);
              this.H1=Math.round(((new Date(this.date1)).valueOf()-(new Date(this.date)).valueOf())/3600000);
              //console.log(this.date);
              if(this.H1>this.H){
                this.Min=60-(((new Date(this.date).valueOf()-new Date(this.date1).valueOf())-Math.floor((new Date(this.date).valueOf()-new Date(this.date1).valueOf())/3600000)*3600000)/60000);
              }else{
              this.Min=60-((new Date(this.date).valueOf()-new Date(this.date1).valueOf())-Math.floor((new Date(this.date).valueOf()-new Date(this.date1).valueOf())/3600000)*3600000)/60000;
            }
              this.heur=this.H+":"+this.Min;
              this.save2={noId:this.rows[j+1][0],no:this.rows[j+1][1],nom:this.rows[j+1][2],date:this.date.split("T")[0],heure:this.heur}
              if(this.save2["noId"]!=0 && this.H>0){  

                this.Csvservice.SaveHours(this.save2)
                .subscribe(data=>{
                  
                },err=>{
                  console.log(err);
            
                })
                
               }
                    }
                  }

            if(j%2==0 && this.rows[j+1][0]!=0 &&( this.rows[j+1][6]=="Invalide"|| this.rows[j+1][6]=="OK")){
              //console.log(this.rows[j+1][6]);
              
            }
            
            this.save={noId:this.rows[j][0],no:this.rows[j][1],nom:this.rows[j][2],heure:this.rows[j][3],etat:this.rows[j][4],nouvelEtat:this.rows[j][5],exception:this.rows[j][6],operation:this.rows[j][7]};
            
           if(this.save["noId"]!=0){
            //console.log(this.rows[j]);
            //console.log(this.save["heure"]);
            this.Csvservice.SaveDetails(this.save)
            .subscribe(data=>{
              
            },err=>{
              console.log(err);
        
            })
            
           }  
          }         
       
       }
     } 
     /* this.Csvservice.gethours()
     .subscribe(data=>{
       this.data2=data;
       console.log(this.data2);
       for(let i = 0; i < this.data2["_embedded"]["hours"].length; i++){
         if(this.data2["_embedded"]["hours"][i]["nom"]==this.data2["_embedded"]["hours"][i+1]["nom"]  ){
           console.log(this.data2["_embedded"]["hours"][i]["nom"]+"first"+this.data2["_embedded"]["hours"][i]["date"]+"---"+this.data2["_embedded"]["hours"][i+1]["date"]);
           if(this.data2["_embedded"]["hours"][i]["date"]==this.data2["_embedded"]["hours"][i+1]["date"]){
           this.Csvservice.deletehours(this.data2["_embedded"]["hours"][i+1]["id"]);
           console.log(this.data2["_embedded"]["hours"][i]["nom"]+"seconde");
         }
         }
         }
       
     },err=>{
       console.log(err);
     }) */
     

   }
   
}
