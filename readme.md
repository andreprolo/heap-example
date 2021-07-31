Deploy: https://stack-example-prolo.herokuapp.com/
# Documentação do projeto


Basicamente toda a lógica está contida dentro de uma estrutura chamada de `Stack`, que é instânciada na última linha do script:
```js
const stack = new Stack();
```

A função `push` é responsável por adicionar um item na pilha, e aplicar validações no valor que o usuário informou:
```js
this.push = () => {
    let error = document.getElementById("error");
    error.innerText = "";

    let input = document.getElementById("value");

    let value = input.value;

    input.value = "";

    if (!value) {
        error.innerText = "Valor não informado";
        return;
    }

    if (value > 1000 || value < -999) {
        error.innerText = "O valor deve ser entre: -999 e 999";
        return;
    }
    this.items.push(value);

    this.updateStackView();
}
```

A função `pop`, basicamente remove o último elemento da pilha:
```js
this.pop = () => {
    if (this.items.length == 0) return;

    this.items.pop();
    this.updateStackView();
}
```

A função `clear` simplesmente limpa os valores da pilha:
```js
this.clear = () => {
    this.items = [];
    this.updateStackView();
}
```

A função `updateStackView` tem a responsabilidade de observar o que foi alterado na pilha, e atualizar o HTML de modo eficiente, apenas onde for necessário:
```js
this.updateStackView = () => {
    let stackTag = document.getElementById("stack-view");

    let size = this.items.length;
    let viewSize = this.getViewSize(stackTag);

    if (size <= 0) {
        stackTag.innerHTML = "";
        let content = document.createElement('div');
        content.className = 'empty';
        stackTag.appendChild(content);

        this.updateSizeTag(0);
        this.updateTopItemTag("");
        return;
    } else {
        this.removeEmptyItem(stackTag);
    }

    if (size == viewSize - 1) {
        stackTag.removeChild(stackTag.firstElementChild);
    } else if (size == viewSize + 1) {
        let content = document.createElement('div');
        
        content.innerText = this.items[this.items.length-1];

        stackTag.prepend(content);
    }

    this.createClassNameForItems(stackTag);
    this.updateSizeTag(size);
    this.updateTopItemTag(this.items[size-1])
}
```

O código abaixo é responsável por ajustar as classes das tags de cada item, para aplicar as colorações via css:
```js
this.createClassNameForItems = (stackTag) => {
    if (stackTag.childNodes.length < 1) return;
    stackTag.childNodes.forEach((item, index) => {     
        if (!item.className.includes('value')) {
            item.className = 'value';
        }

        if (item.className.includes('last') && index > 0 && index != stackTag.childNodes.length - 1) {
            item.className = item.className.replaceAll('last', '');
        }

        if (index == 0) {                 
            if (stackTag.childNodes.length < 3) {
                item.className = item.className.replaceAll('last', '');
            } else if (!item.className.includes('last')) {
                item.className += ' last';
            }
        } else if (index == stackTag.childNodes.length - 1) {
            if (stackTag.childNodes.length < 2) {
                item.className = item.className.replaceAll('base', '');
            } else if (!item.className.includes('base')) {
                item.className += ' base';
            }
        }
    });
}
```

As demais funções são mais simples, e utilizadas em casos menores para deixar o código um pouco mais bem estruturado,é fácil entender o que elas fazem.
