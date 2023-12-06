function findInfo(event) {
    event.preventDefault();

    //get variables
    var barcode = document.getElementById("barcode").value;
    var productName = document.getElementById('productName');
    var theTable = document.getElementById('allergenTable')

    //get from api
    //console.log(barcode)
    fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`)
        .then((res) => res.json())
        .then((info) => {

           // console.log(info.product)
            var dataArr = info.product

          //  console.log(dataArr.allergens_hierarchy)
            //console.log(dataArr.allergens_hierarchy.length)
            var allergenCount = dataArr.allergens_hierarchy.length
            var allergens = dataArr.allergens_hierarchy
            productName.value = dataArr.product_name
            //console.log(productName.value)

            let display =
                `<tr>
            <th><b>Allergens</b></th>
            <th><b>Contains?</b></th>
            </tr>`;
            

            for (let x = 0; x < allergenCount; x++) {
                console.log(allergens[x].slice(3))

                display += `<tr>
            <td id='allergens'>${allergens[x].slice(3)}</td>
            <td id='allergens'>${productName.value}</td>
            </tr>`;
            }
            theTable.innerHTML += display;

        }
        )
}
