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
    var tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    products.forEach(product => {
        var row = tbody.insertRow();
        var pricePerUnitCell = row.insertCell();
        pricePerUnitCell.textContent = unit === 'TB' ? product.pricePerTB : product.pricePerGB;

        var priceCell = row.insertCell();
        priceCell.textContent = product.price;

        var capacityCell = row.insertCell();
        capacityCell.textContent = product.capacity;

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
