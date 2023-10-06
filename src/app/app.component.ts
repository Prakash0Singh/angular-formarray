import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MockApiService } from './service/mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
form: FormGroup;
  all_mock_data: any[]=[];
  extra_data:any[]=[]

constructor(private fb:FormBuilder,private _mock_api:MockApiService) 
{
    this.form = this.fb.group({
    lessons: this.fb.array([])
});
}
  ngOnInit(): void {
    
    this.api_calling_function()
  }

  api_calling_function()
  {
    this._mock_api.get_Api_Data().subscribe(
      {
        next:(res:any)=>
        {
          this.all_mock_data=res
        if (this.all_mock_data) {
            
            this.all_mock_data.filter((data:any)=>{
              const lessonForm = this.fb.group({
                id:data.id,
                name: data.name,
                level: data.level,
              });
              console.log(data);
              this.extra_data.push({showinput:false,editbtn:true,updatebtn:false,submitbtn:false})
              this.lessons.push(lessonForm);
            })
          }
          else{
            this.addLesson();
          }
        }

      }
    )

  }

  data_adding_function(data:any){
    this._mock_api.add_Api_Data(data).subscribe(
      {
       complete:()=>
       {
        // reset form data 
       }
      }
    )
  }

  data_delete_function(id:any){
    console.log(id);
    this._mock_api.delete_Api_Data(id).subscribe(
      {
        complete:()=>
        {
          // deleting data form api
        }
      }
    )
  }

  data_edit_function(id:any,data:any){
    let edit_data={
      name:data.name,
      level:data.level,
    }
    this._mock_api.edit_Api_Data(id,edit_data).subscribe(
      {
        complete:()=>
        {
          // editing data from api 
        }
      }
    )
  }


get lessons() {
  return this.form.controls["lessons"] as FormArray;
}

addLesson() {
  const lessonForm = this.fb.group({
    name: [''],
    level: [''],
  });
  this.extra_data.push({showinput:true,editbtn:false,updatebtn:false,submitbtn:true})
  this.lessons.push(lessonForm);

}

edit_data(id:number,data:any){

  console.log(this.extra_data[id]);
  this.extra_data[id].showinput=true
  this.extra_data[id].editbtn=false
  this.extra_data[id].updatebtn=true
  console.log(id,'Id');
  console.log(data,'Data');


}

update_data(id:any,data:any){

  console.log(this.extra_data[id]);
  this.extra_data[id].showinput=false
  this.extra_data[id].editbtn=true
  this.extra_data[id].updatebtn=false
  console.log(id,'Id');
  console.log(data,'Data');

  this.data_edit_function(data.id,data)
}

submit_data(id:any,data:any){
  this.extra_data[id].showinput=false
  this.extra_data[id].editbtn=true
  this.extra_data[id].updatebtn=false
  this.extra_data[id].submitbtn=false

  this.data_adding_function(data) 
}
  
  deleteLesson(data: any,lessonIndex:number) {
    console.log(this.extra_data[lessonIndex].editbtn);
    
    this.lessons.removeAt(lessonIndex);
    if (this.extra_data[lessonIndex].editbtn && data.id)
    {
      console.log(data.id);
      this.data_delete_function(data.id)
    this.lessons.controls=[]
    this.api_calling_function()
    }
    
  }


}
