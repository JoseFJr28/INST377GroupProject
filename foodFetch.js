function findInfo(event) {
    event.preventDefault();

    //Get variables
    var barcode = document.getElementById("barcode").value;
    var productName = document.getElementById("productName");
    var allergenTable = document.getElementById("allergenTable");

    //Options the user selects for the item being search
    var options = pullFromForm()
    
    //Fetching the API
    fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`)
        .then((res) => res.json())
        .then((info) => {

            //The item that is being search
            var dataArr = info.product

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
            <td id='names'>${allergens[x].slice(3)}</td>
            <td id='response'>${allergens[x].slice(3)}</td>
            </tr>`;
            }
            allergenTable.innerHTML += display;
    })
}


function filteredInfo(filter){

}

function pullFromForm() {
    var totalAllergens  = ["milk", "egg", "peanut", "nuts", "soybean", "shellfish", "fish", "seasame", "gluten"];
    var selectedAllergens = []

    totalAllergens.forEach((element) => {
    selectedElement =  document.getElementById(`${element}`);

    if(selectedElement != null) {
        if(selectedElement.checked) {
            selectedAllergens.push(`${selectedElement.value}`);
        }
    }})
    console.log(selectedAllergens)
}