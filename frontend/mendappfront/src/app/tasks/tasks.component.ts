import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[]
  private url = "http://localhost:8000/api/tasks"

  constructor(private http: Http) { }

  ngOnInit(): void {
    this.http.get(this.url)
    .subscribe(response => {
      this.tasks = response.json()
    })
  }

  createTask(input: HTMLInputElement){
    let task = { task: input.value }
    let taskText = "task=" + input.value
    input.value = ''
    console.log(task)
    this.http.post(this.url + '?' + taskText, [])
      .subscribe(response => {
        task['id'] = response.json().id
        this.tasks.splice(0, 0, task)
      })
  }

  deleteTask(post){
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response => {
        let index = this.tasks.indexOf(post)
        this.tasks.splice(index, 1)
      })
  }

}
