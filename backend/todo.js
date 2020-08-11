 
 // identificar elementos para funções
 var listElement = document.querySelector('#app ul');
 var inputElement = document.querySelector('#app input');
 var buttonElement = document.querySelector('#app button');



 // array para os to dos 
 var todos = JSON.parse(localStorage.getItem('listToDo')) || [];

// atualização dos itens TO DO
function renderToDo(){

    listElement.innerHTML = '';

    for (todo of todos) {
        // declarar as variáveis
        var toDoElement = document.createElement('li');
        var toDoText = document.createTextNode(todo);
        
        var linkElement = document.createElement('button');
        var linkText = document.createTextNode('Finalizar')

        // criar elemento EXCLUIR
        linkElement.appendChild(linkText);
        linkElement.setAttribute('href', '#');


        // adicionar o texto do to do
        toDoElement.appendChild(toDoText);

        // adicionar elemento excluir
        toDoElement.appendChild(linkElement)
        linkElement.setAttribute('id', 'delete');

        // adicionar elemento na lista
        listElement.appendChild(toDoElement);


        // identificar os itens da lista pela posição para remoção
        var pos = todos.indexOf(todo);

        // parâmetro de exclusão com concatenação de string com aspas simples
        linkElement.setAttribute('onclick', 'deleteToDo( '+ pos +' )');
        
    }
}

renderToDo();


// adicionando novos TO DO
function addToDo() {

    var toDoText = inputElement.value;

    if (toDoText === '' ) {
        alert('Insira algum item antes')
    } else {
        todos.push(toDoText);
        inputElement.value = '';

        // renderiza
        renderToDo();

        // salva alteração    
        saveToStorage()    
    }


}

buttonElement.onclick = addToDo;

// adiciona algum item quando o botão "ENTER" for pressionado
inputElement.addEventListener("keypress", function (e){
    if (e.keyCode === 13) {
        document.getElementById("add").click();
    }
});




// removendo, deletando os TO DOs
function deleteToDo(pos) {

    // função js para localizar a variável "pos" e remover o item encontrado nela 
    todos.splice(pos, 1)

    // renderiza
    renderToDo();

    // salva alteração
    saveToStorage()
}

// função salva dados do TO DO no localstorage 
function saveToStorage(){
    localStorage.setItem('listToDo', JSON.stringify(todos))   

}
