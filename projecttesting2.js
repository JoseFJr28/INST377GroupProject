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
    //console.log(dataArr)

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
    //console.log(selectedAllergens)
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
                //console.log("yes")
                triggeredAllergens.push(selectedAllergens[x])
            } else {
                continue
            }
        }
    }
    //console.log(triggeredAllergens)
    return triggeredAllergens
}

/*Grabs the main array from the comparison to display in table*/
async function tableMaker() {
    
    //We grab the arrays that ahas the allergens
    var productAllergens = pullFromForm()//This grabs from the checkbox
    var editor = document.getElementById("rows") //Grabs the table to create
    var data = await filteredInfo()//The allergens the users chose and sees if the product has it so if i chose milk and eggs and the product is cheese then I would get both

    //First check if the table has "rows"
    if(document.getElementById('rows').rows.length == 0){

    //console.log(editor.rows.length)

    //If their are no allergens, that were chosen, then the message of we are safe.
    if (data.length == 0) {
        editor.innerHTML += `<tr><td>You are SAFE</td><td>&#128077</td></tr> `
    } else {
        //If there are allergens chosen; we iterate through the array
        for (let x = 0; x < data.length; x++) {
            //iterate throught the products base allergens
            for (let y = 0; y < productAllergens.length; y++) {
                //if one of chosen allergens are in the products allergens
                if (data[x] == productAllergens[y]) {
                    console.log(productAllergens[x])
                    //display is in the table
                    editor.innerHTML += `<tr><td>${productAllergens[y]}</td><td bgcolor="red" style="color: yellow">Yes</td></tr>`
                    //immidiately go to the next allergen because we already confirmed its in product
                    x++
                //If the allergen is not in the product
                } else if (productAllergens[y] != data[x]){
                    //we add it to the table but we indicate it is not in the products allergens
                    editor.innerHTML += `<tr><td>${productAllergens[y]}</td><td bgcolor="green">No</td></tr>`
                }
            }
        }
    }
    }else{
        createOrDestroy()
    }
}

//
function createOrDestroy(){
    //The amount of rows in the table
    var size = document.getElementById('rows').rows.length
    console.log(document.getElementById('rows').rows.length)
    //we check if there are any rows 
    if(document.getElementById('rows').rows.length == 0){
        //if no rows then we make the table
        tableMaker()
    }else{
        //if there are rows we iterate through that tables row
        for(let x = 0; x<size; x++){
            //delete each row
            document.getElementById('rows').deleteRow(x)
        }
        console.log(size)
        //the create the new table
        tableMaker()
    }
}

//window.onload = definecounter()