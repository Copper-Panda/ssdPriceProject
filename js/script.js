var jsonUrl = '../data/output.json'; // 请替换为实际的JSON文件路径 
 
function fetchProducts() { 
    fetch(jsonUrl) 
        .then(response => response.json()) 
        .then(data => { 
            products = data; 
            updateTable(); 
        }) 
        .catch(error => console.error('Error fetching data:', error)); 
} 
 
function updateTable() {
    var unit = document.getElementById('capacity-unit').value;
    var technology = document.getElementById('technology').value; // Ensure the ID matches the HTML
    var tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    document.getElementById('price-per-unit-header').textContent = 'Price Per ' + unit;
    var filteredProducts = products;
    var minCapacity = document.getElementById('min-capacity').value;
    var maxCapacity = document.getElementById('max-capacity').value;
    // Event listener for when the user changes the minimum capacity value
    document.getElementById('min-capacity').addEventListener('input', updateTable);

    // Event listener for when the user changes the maximum capacity value
    document.getElementById('max-capacity').addEventListener('input', updateTable);




    // Filter by Form Factor if not 'all'
    if (technology !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.technology === technology);
    }
    if (minCapacity) {
        filteredProducts = filteredProducts.filter(product => {
            var productCapacity = unit === 'GB' ? product.capacity * 1000 : product.capacity;
            return productCapacity >= parseFloat(minCapacity);
        });
    }

    // Filter by max capacity if maxCapacity has a value
    if (maxCapacity) {
        filteredProducts = filteredProducts.filter(product => {
            var productCapacity = unit === 'GB' ? product.capacity * 1000 : product.capacity;
            return productCapacity <= parseFloat(maxCapacity);
        });
    }



    filteredProducts.sort((a, b) => (unit === 'TB' ? parseFloat(a.pricePerTB) - parseFloat(b.pricePerTB) : parseFloat(a.pricePerGB) - parseFloat(b.pricePerGB)));


    // Now build the table with filteredProducts
    filteredProducts.forEach(product => {
        var row = tbody.insertRow();
    

        // Conditionally display price per TB or price per GB
        var pricePerUnitCell = row.insertCell();
        pricePerUnitCell.textContent = unit === 'TB' ? '$'+ parseFloat(product.pricePerTB).toFixed(2) : '$'+ parseFloat(product.pricePerGB).toFixed(2);

        var priceCell = row.insertCell();
        priceCell.textContent = '$'+product.price;

        var capacityCell = row.insertCell();
        capacityCell.textContent = product.capacity + ' ' + unit;

        var adjustedCapacity = unit === 'GB' ? product.capacity * 1000 : product.capacity;
        capacityCell.textContent = adjustedCapacity + ' ' + unit;

        var technologyCell = row.insertCell();
        technologyCell.textContent = product.technology;

        var formFactorCell = row.insertCell();
        formFactorCell.textContent = product.formFactor;

        var affiliateLinkCell = row.insertCell();
        var link = document.createElement('a');
        link.setAttribute('href', product.affiliateLink.url);
        link.setAttribute('target', '_blank');
        link.classList.add('affiliate-link');
        link.textContent = product.affiliateLink.text;
        affiliateLinkCell.appendChild(link);
    });
}

window.onload = fetchProducts;