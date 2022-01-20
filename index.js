const input = document.getElementById('input');

document.querySelector('#push').onclick = function(){

if(input.value === 0) return;

document.querySelector('#tasks').innerHTML += `
  <div class="task">
    <span id="taskname">
        ${document.querySelector('#newtask input').value}
    </span>
    <button class="delete">
    <i class="far fa-trash-alt"></i>
    </button>
  </div>
`;
input.value = '';

const current_tasks = document.querySelectorAll(".delete");
for(let i = 0; i < current_tasks.length; i++){
  current_tasks[i].onclick = function(){
    this.parentNode.remove();
  }
}
}
