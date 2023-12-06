function findInfo(event) {
    event.preventDefault();

    //get variables
    var barcode = document.getElementById("barcode").value;

    //get from api
    //console.log(barcode)
    fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`)
    .then((res) => res.json())
    .then((info) => {

       console.log(info.product)
        var dataArr = info.product

        for (let x=0; x<dataArr.length;x++){
            console.log(x)
        }
    })
}


function filteredInfo(filter){

}