function Heap() {
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

        this.updateHeapView();
    }

    this.pop = () => {
        if (this.items.length == 0) {
            return;
        }
    
        this.items.pop();
        this.updateHeapView();
    }

    this.clear = () => {
        this.items = [];
        this.updateHeapView();
    }

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

    this.removeEmptyItem = (heapTag) => {
        if (this.items.length > 1) return;
        heapTag.childNodes.forEach(item => {
            if (item.className.includes('empty')) item.parentNode.removeChild(item);            
        });
    }

    this.getViewSize = (heapTag) => {
        let size = 0;
        heapTag.childNodes.forEach(item => {
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
}

const heap = new Heap();