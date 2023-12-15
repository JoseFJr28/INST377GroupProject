function definecounter() {
    var counter = 0;
    return counter
}
var counter = 0

function reset(counter) {
    if (counter == 0) {
        tableMaker()
    } else {
        document.getElementById("allergenTable").remove()
        tableMaker()
    }

}

/*Returns am array of alleergens of product and possbly name from the API*/
async function findInfo() {
    var barcode = document.getElementById("barcode").value;
    //This is to get the allergens without the "en:" in their name
    var allergenList = []


    //Fetching the API
    var res = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`)
    var info = await res.json()

    //The item that is being search
    var dataArr = info.product
    console.log(dataArr)

    //console.log(allergenCount)
    var allergens = dataArr.allergens_hierarchy

    for (let i = 0; i < allergens.length; i++) {
        //console.log(allergens[i].slice(3))
        allergenList.push(allergens[i].slice(3))
    }

    //console.log(allergenList)
    return allergenList
}
/*Returns an array that is selected from the form by the user
considered unequal array comparison*/
function pullFromForm() {
    var totalAllergens = ["milk", "eggs", "peanuts", "nuts", "soybeans", "shellfish", "fish", "seasame", "gluten"];
    var selectedAllergens = []

    totalAllergens.forEach((element) => {
        selectedElement = document.getElementById(`${element}`);

        if (selectedElement != null) {
            if (selectedElement.checked) {
                selectedAllergens.push(`${selectedElement.value}`);
            }
        }
    })
    console.log(selectedAllergens)
    return selectedAllergens
}
/*Compares both arrays coming from pullfromform and findinfo 
Array1 == the product allergen hierarchy
Array2 == the checkbox allergens
*/
async function filteredInfo() {
    var triggeredAllergens = []
    //[milk, nuts, soybeans]
    var selectedAllergens = pullFromForm()
    //[milk, peanuts, soybeans]
    var defaultAllergens = await findInfo()

    console.log(selectedAllergens)
    console.log(defaultAllergens)

    for (let x = 0; x < selectedAllergens.length; x++) {
        //console.log(selectedAllergens[x])
        for (let y = 0; y < defaultAllergens.length; y++) {
            //console.log(defaultAllergens[y])
            if (defaultAllergens[y] == selectedAllergens[x]) {
                console.log("yes")
                triggeredAllergens.push(selectedAllergens[x])
            } else {
                continue
            }
        }
    }
    //console.log(triggeredAllergens)
    return triggeredAllergens
}

/*Grabs the main array wfrom the comparison to display in table*/
async function tableMaker() {
    //counter = 0
    console.log(document.getElementById("rows").rows.length)
    if(document.getElementById('rows').rows.length == 0){

    var editor = document.getElementById("rows")
    var data = await filteredInfo()
    var defaultAllergens = await findInfo()
    console.log(editor.rows.length)

    if (data.length == 0) {
        editor.innerHTML += `&#128540 You are SAFE&#128077 `
    } else {

        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < defaultAllergens.length; y++) {
                if (defaultAllergens[y] == data[x]) {
                    editor.innerHTML += `<tr><td>${data[x]}</td><td>Yes</td></tr>`
                    x++
                } else {
                    editor.innerHTML += `<tr><td>${defaultAllergens[x]}</td><td>No</td></tr>`
                }
            }
        }
    }
    }else{
        document.getElementById("rows").remove()
        console.log(document.getElementById("rows").rows.length = 0)
        tableMaker()
    }

    console.log("function is working")
}

function createOrDestroy(){
    if(document.getElementById('rows').rows.length == 0){
        tableMaker()
    }else{
        document.getElementById("rows").remove()
        tableMaker()
    }
}

//window.onload = definecounter()