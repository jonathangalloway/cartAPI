import { Router } from "express";

const routes = Router()
const cart = [
    {id:1, product:"soda", price: 5, quantity:1},
    {id:2, product:"chips", price: 5, quantity: 1}];

    //Next ID to use 
    let currentId = 2;
   // const highestGrade = Number.parseInt(req.query['highestGrade'] as string); TURNING STRING TO NUMBER 
routes.get("/cart",(req,res)=>{
    console.log(typeof req.query.maxPrice)
    const maxPrice = Number.parseInt(req.query['maxPrice'] as string)

    let tempCart = cart;
    if (maxPrice) {
       tempCart = tempCart.filter((item) => {
        console.log(maxPrice,item.price)
          return item.price <= maxPrice;
         });
      }
    res.status(200) 
    res.json(tempCart)
})
// number 2 
routes.get('/cart/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
  
    const tempCart = cart.find((item) => {
      return item.id === id;
    });
  
    if (tempCart) {
      res.status(200);
      res.json(tempCart);
    } else {
      res.sendStatus(404);
      res.send("ID not found");
    }
  });


// number 3 creating a new item hard code in postman but not the id because its being created in line 47
routes.post("/cart", (req,res)=>{
    let newCartItem = req.body;

    newCartItem.id = currentId;
    currentId++
    cart.push(newCartItem)
    

    res.status(201);
    res.json(newCartItem);

})

  
  

// //4 Updating a new cart item 
 routes.put('/cart/:id', (req,res) =>{
   let newItem = req.body;
   console.log(newItem);
    let id= Number.parseInt((req.params.id));
    let index = cart.findIndex((item) => {
             return item.id === id;
          });
          
          if (index >= 0) {
               newItem.id = id;
               cart.splice(index, 1, newItem);
               

               res.status(200);
               res.json(newItem);
             } else {
               res.status(404).send();
             }
           });

           routes.delete('/cart/:id', (req, res) => {
            let id = Number.parseInt(req.params.id);
          
            const index = cart.findIndex((item) => {
              return item.id === id;
            });
          
            if (index >= 0) {
              cart.splice(index, 1);
              res.sendStatus(204);
            } else {
              res.sendStatus(404);
            }
          });
          
           
              
           



export default routes ;