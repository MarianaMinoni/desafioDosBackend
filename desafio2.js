const fs = require("fs");

class ProductManager {
    constructor(path){
        this.products = [];
        this.id = 0;
        this.path = path;
       
        
    }

    saveProducts(){
        fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))
        .then(() => console.log("guardado correctamente"))
        .catch((err) => console.log(err))
    }

     
loadProducts(){
    fs.promises.readFile(this.path, "utf-8")
    .then (data =>{
        this.products = JSON.parse(data)
        this.saveProducts()
     })
     .catch(err =>{
        console.log(err);
     })
}
    
    getProducts(){
        return fs.promises.readFile(this.path, "utf-8")
        .then((data)=>{             
            this.products = JSON.parse(data)
            return this.products;
        })
        .catch(err=> {            
            console.log(err)
        })
                
    }



    getProductById(productId){

        let product = this.products.find(product => product.id === productId);
        
        if (product) {
            return product;
        } else {
            console.log('Not found');
        }
    }

// metodo agregar producto con las validaciones
    addProduct(title, description, price, thumbnail, code, stock){

        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('todos los datos son obligatorios');
            return
        }

        let codeExist = this.products.some(product => product.code === code);

        if(codeExist){
            console.log('el codigo ingresado es incorrecto');
        } else{

        
        let product = {
            id:this.id,
            title:title,
            description:description,
            price:price,
            thumbnail: thumbnail,
            code:code,
            stock:stock,
    
        }
        this.products.push(product);
        this.id ++;

        fs.promises.writeFile(this.path, JSON.stringify(this.products))
        .then(console.log("Producto agregado con exito"))
        .catch((err)=> console.log(err));

    }
    }

deleteProduct(id){
    let idExist = this.products.some(product => product.id === id)
    if(idExist){
        this.products = this.products.filter(product => product.id != id)
        console.log(`el producto con id:  ${id} se eliminó exitosamente`)
            this.saveProducts()
    } else{
        console.log(`el id: ${id} no existe`);
    }
} 

updateProduct(id, propName, newValue ){
    let product = this.products.find(product => product.id === id);
    if(product){
        if(propName in product){
            product[propName] = newValue;
            this.saveProducts()
            console.log("cambio realizado con exito");
            

        }else{
            console.log("la propiedad a cambiar no existe");
        }
    } else{
        console.log("el Id ingresado no existe");
    }

this.saveProducts()

}
}

const productManager = new ProductManager("./products.json");


productManager.addProduct('t-shirt', 'white t-shirt', '100', 'img1.jpeg','1100', '10');
productManager.addProduct('shoe', 'sports shoes', '250', 'img2.jpeg','1101', '5');
productManager.addProduct('jeans', 'fashion white jeans', '200', 'img3.jpeg','1102', '3');
productManager.addProduct('skirt', 'long skirt', '150', 'img4.jpeg','1103', '16');


//console.log(productManager.products);
console.log(productManager.getProducts());
//console.log(productManager.getProductById(1))
//console.log(productManager.deleteProduct(2));
//console.log(productManager.updateProduct(1, "price", 2000));

