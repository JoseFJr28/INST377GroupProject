function findInfo(event) {
    event.preventDefault();

    //get variables
    var barcode = document.getElementById("barcode").value;
    var pName = document.getElementById("pName");
    var allergenTable = document.getElementById("allergenTable");

    pullFromForm()

    //get from api
    //console.log(barcode)
    fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`)
    .then((res) => res.json())
    .then((info) => {

       console.log(info.product)
        var dataArr = info.product

        console.log(dataArr.allergens_hierarchy)

        pName.innerHTML = `<h3>${dataArr.product_name}<h3>`
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