import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = []
  private url = "http://localhost:8000/api/tasks"
  existsTasks: boolean = false

  constructor(private http: Http) { }

  ngOnInit(): void {
    this.http.get(this.url)
    .subscribe(response => {
      this.tasks = response.json()
      this.tasks = this.tasks.reverse()
      this.checkForTasks()
    })
  }

  createTask(input: HTMLInputElement){
    let task = { task: input.value }
    let taskText = "task=" + input.value
    input.value = ''
    this.http.post(this.url + '?' + taskText, [])
      .subscribe(response => {
        const newResponse:any = response
        task['id'] = JSON.parse(newResponse._body).data.id
        this.tasks.splice(0, 0, task)
        this.checkForTasks()
      })
  }

  deleteTask(task){
    this.http.delete(this.url + '/' + task.id)
      .subscribe(response => {
        let index = this.tasks.indexOf(task)
        this.tasks.splice(index, 1)
        this.checkForTasks()
      })
  }

  updateTask(taskTitle, id) {
    let task = { task: taskTitle }
    let taskText = "task=" + taskTitle
    this.http.put(this.url + '/' + id + '?' + taskText, [])
      .subscribe(response => {
        const newResponse: any = response
        task['id'] = JSON.parse(newResponse._body).data.id
        this.tasks['id'] = taskTitle
        this.checkForTasks()
      })
  }

  checkForTasks() {
    this.existsTasks = (this.tasks.length > 0) ? true : false
  }

}
