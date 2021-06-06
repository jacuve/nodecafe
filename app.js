var express = require("express");
var app = express();

const pug = require("pug");

app.use(express.static(__dirname+"/public"));

var cafes_array = [
    {tipo: "Cortado", texto:"Café con una gota de leche", imagen:"solo.jpeg"},
    {tipo: "Solo", texto:"Café sin más", imagen:"solocorto.jpeg"},
    {tipo: "Mitad", texto:"Mitad café, mitad leche", imagen:"coffee.jpg"},
    {tipo: "Sombra", texto:"Café con más leche que café", imagen:"coffee.jpg"}
]
app.get("/", (req,res)=>{
    //res.send("index.html");
    res.render("index.pug", {
        titulo: "Cafes del mundo",
        texto: "Selecciona un café",
        imagen: "cafes.jpeg",
        cafes: cafes_array
    })
});


app.get("/cafe/:tipo", (req,res)=>{
    var datosCafe = cafes_array.filter((cafe)=>{
        if (req.params.tipo ==cafe.tipo){
            return cafe;
        }
    })[0]; 
    res.render("cafe.pug", {
        tipo: req.params.tipo,
        data: datosCafe
    })
});

app.use((req, res)=>{
    res.status(400);
   let error = req.originalUrl;
   
   res.render("404.pug", {texto:error});
});

app.listen(3000, ()=>{
    console.log("Servidor en el puerto 3000");
});