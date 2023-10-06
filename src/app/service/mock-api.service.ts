import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

   httpHeaders:any
  constructor(public http: HttpClient) {
    this.httpHeaders=new HttpHeaders({
      'content-type':'application/json',
    })
  }

  get_Api_Data()
  {
    return this.http.get('http://localhost:3000/user_data')
  }

  add_Api_Data(new_user_data:object)
  {
    return this.http.post('http://localhost:3000/user_data',new_user_data)
  }

  edit_Api_Data(user_data_id:number,updatedUser:any)
  {
    console.log(updatedUser);
    const editUrl='http://localhost:3000/user_data/'+user_data_id
    return this.http.put(editUrl,updatedUser)
  }

  delete_Api_Data(user_data_id:number)
  {
    const deleteUrl='http://localhost:3000/user_data/'+user_data_id
    return this.http.delete(deleteUrl)
  }

}
