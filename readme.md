# Documentação do projeto

Basicamente toda a lógica está contida dentro de uma estrutura chamada de `Heap`, que é instânciada na última linha do script:
```js
const heap = new Heap();
```

A função `push` é responsávele por adicionar um item na pilha, e aplicar validações no valor que o usuário informou:
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

    this.updateHeapView();
}
```

A função `pop`, basicamente remove o último elemento da pilha:
```js
this.pop = () => {
    if (this.items.length == 0) return;

    this.items.pop();
    this.updateHeapView();
}
```

A função `clear` simplesmente limpa os valores da pilha:
```js
this.clear = () => {
    this.items = [];
    this.updateHeapView();
}
```

A função `updateHeapView` tem a responsabilidade de observar o que foi alterado na pilha, e atualizar o HTML de modo eficiente, apenas onde for necessário:
```js
this.updateHeapView = () => {
    let heapTag = document.getElementById("heap-view");

    let size = this.items.length;
    let viewSize = this.getViewSize(heapTag);

    if (size <= 0) {
        heapTag.innerHTML = "";
        let content = document.createElement('div');
        content.className = 'empty';
        heapTag.appendChild(content);

        this.updateSizeTag(0);
        this.updateTopItemTag("");
        return;
    } else {
        this.removeEmptyItem(heapTag);
    }

    if (size == viewSize - 1) {
        heapTag.removeChild(heapTag.firstElementChild);
    } else if (size == viewSize + 1) {
        let content = document.createElement('div');
        
        content.innerText = this.items[this.items.length-1];

        heapTag.prepend(content);
    }

    this.createClassNameForItems(heapTag);
    this.updateSizeTag(size);
    this.updateTopItemTag(this.items[size-1])
}
```

O código abaixo é responsável por ajustar as classes das tags de cada item, para aplicar as colorações via css:
```js
this.createClassNameForItems = (heapTag) => {
    if (heapTag.childNodes.length < 1) return;
    heapTag.childNodes.forEach((item, index) => {     
        if (!item.className.includes('value')) {
            item.className = 'value';
        }

        if (item.className.includes('last') && index > 0 && index != heapTag.childNodes.length - 1) {
            item.className = item.className.replaceAll('last', '');
        }

        if (index == 0) {                 
            if (heapTag.childNodes.length < 3) {
                item.className = item.className.replaceAll('last', '');
            } else if (!item.className.includes('last')) {
                item.className += ' last';
            }
        } else if (index == heapTag.childNodes.length - 1) {
            if (heapTag.childNodes.length < 2) {
                item.className = item.className.replaceAll('base', '');
            } else if (!item.className.includes('base')) {
                item.className += ' base';
            }
        }
    });
}
```

As demais funções são mais simples, e utilizadas em casos menores para deixar o código um pouco mais bem estruturado,é fácil entender o que elas fazem.