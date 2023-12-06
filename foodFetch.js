
/*Returns am array of alleergens of product and possbly name from the API*/
function findInfo() {
    var barcode = document.getElementById("barcode").value;
    //This is to get the allergens without the "en:" in their name
    var allergenList = []
    var finalAllergenList = []
   

    //Fetching the API
    fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`)
        .then((res) => res.json())
        .then((info) => {

            //The item that is being search
            var dataArr = info.product
           console.log(dataArr)

            //console.log(allergenCount)
            var allergens = dataArr.allergens_hierarchy
            //console.log(allergens)
           for (const [key,value] of Object.entries(allergens)){
            console.log(typeof(value))
            finalAllergenList.push(value.slice(3))
           }
           console.log(finalAllergenList)
           return finalAllergenList
    })
    
}
/*Returns an array that is selected from the form by the user*/
function pullFromForm() {
    var totalAllergens  = ["milk", "egg", "peanuts", "nuts", "soybeans", "shellfish", "fish", "seasame", "gluten"];
    var selectedAllergens = []

    totalAllergens.forEach((element) => {
    selectedElement =  document.getElementById(`${element}`);

    if(selectedElement != null) {
        if(selectedElement.checked) {
            selectedAllergens.push(`${selectedElement.value}`);
        }
    }})
    console.log(selectedAllergens)
    return selectedAllergens
}
/*Compares both arrays coming from pullfromform and findinfo 
Array1 == the product allergen hierarchy
Array2 == the checkbox allergens
*/
 function filteredInfo(){
     var triggeredAllergens = []
     var selectedAllergens = pullFromForm()
     var defuaultAllergens = findInfo()

     console.log(selectedAllergens)
     console.log(defuaultAllergens)

     selectedAllergens.forEach((element1) => {
         defuaultAllergens.forEach((element2) =>{
             if(element1 == element2) {
                console.log(element1)
                 triggeredAllergens.push(`${element1}`)
                 console.log(triggeredAllergens)
                 console.log("im alive")
             }})})
 }

/*Grabs the main array wfrom the comparison to display in table*/
function tableMaker(event){
    event.preventDefault();
    console.log("function is working")
    filteredInfo()
}