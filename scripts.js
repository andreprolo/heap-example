function Stack() {
    this.items = []

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

    this.pop = () => {
        if (this.items.length == 0) return;
    
        this.items.pop();
        this.updateStackView();
    }

    this.clear = () => {
        this.items = [];
        this.updateStackView();
    }

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

    this.removeEmptyItem = (stackTag) => {
        if (this.items.length > 1) return;
        stackTag.childNodes.forEach(item => {
            if (item.className.includes('empty')) item.parentNode.removeChild(item);            
        });
    }

    this.getViewSize = (stackTag) => {
        let size = 0;
        stackTag.childNodes.forEach(item => {
            if (!item.className.includes('empty')) size++;            
        });
        return size;
    }

    this.updateSizeTag = (size) => {
        let sizeTag = document.getElementById("size");
        sizeTag.innerText = `Tamanho: ${size}`;
    }

    this.updateTopItemTag = (topItem) => {
        let topItemTag = document.getElementById("top-item");
        topItemTag.innerText = `Objeto topo: ${topItem}`;
    }

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
}

const stack = new Stack();