function definecounter() {
    var counter = 0;
}

function reset()    {
    if (counter == 0)   {
        tableMaker()
    } else {
        var editor = document.getElementById("allergenTable")
        editor.remove()
        tableMaker()
    }

}

/*Returns am array of alleergens of product*/
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

    var allergens = dataArr.allergens_hierarchy
    
    for (let i = 0; i < allergens.length; i++) {
        allergenList.push(allergens[i].slice(3))
    }
    
    console.log(allergenList)
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
        console.log(selectedAllergens[x])
        for (let y = 0; y < defaultAllergens.length; y++) {
            
            if (defaultAllergens[y] == selectedAllergens[x]) {
                
                triggeredAllergens.push(selectedAllergens[x])
            } else {
                continue
            }
        }
    }
    console.log(triggeredAllergens)
    return triggeredAllergens
}

/*Grabs the main array wfrom the comparison to display in table*/
async function tableMaker() {
    //event.preventDefault();
    var editor = document.getElementById("rows")
    var data = await filteredInfo()
    var defaultAllergens = await findInfo()
    console.log(data.length)

    if (data.length == 0) {
        editor.innerHTML += `&#128540 You are SAFE&#128077 `
    } else {

        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < defaultAllergens.length; y++) {
                if (defaultAllergens[y] == data[x]) {
                    editor.innerHTML += `<td>${data[x]}</td><td>Yes</td>`
                    x++
                } else {
                    editor.innerHTML += `<td>${data[x]}</td><td>No</td>`
                }
            }

        }
    }
    console.log("function is working")
}

window.onload = definecounter()