var heap = []

function loadHeapView() {
    let heapTag = document.getElementById("heap-view");
    heapTag.innerHTML = "";

    let size = heap.length;
    let topItem = size == 0 ? '' : heap[size-1];

    if (size == 0) {
        let content = document.createElement('div');
        content.className = 'empty';
        heapTag.appendChild(content);
    } else {
        heap.reverse().forEach((value, index) => {
            let content = document.createElement('div');
            content.className = 'value';

            if (index == size-1 && size > 1) {
                content.className += ' base';
            } else if (index == 0 && size > 2) {
                content.className += ' last';
            }
            content.innerText = value;
            heapTag.appendChild(content);
        });
    }

    let sizeTag = document.getElementById("size");
    sizeTag.innerText = `Tamanho: ${size}`;

    let topItemTag = document.getElementById("top-item");
    topItemTag.innerText = `Objeto topo: ${topItem}`
}

function pushValue() {
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

    heap.push(value);
    loadHeapView();

}

function popValue() {
    if (heap.length == 0) {
        return;
    }

    heap.pop();
    loadHeapView();
}

function clearHeap() {
    heap = [];
    loadHeapView();
}

