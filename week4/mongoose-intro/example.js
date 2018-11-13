// here we will do some mongoose code without express so this is half of the picture of what we will usually be doing in out web applications


//1 first you require mongoose
const mongoose = require('mongoose');

//2 then you connect to a specific databse with mongoose
mongoose.connect('mongodb://localhost/exampleApp');
// exampleApp is the name of the database
// if you dont have one with this name there wont be an error so you have to make sure to check
// if you dont have a db with this name, you wont be able to query it (duh) but you will be able to add new stuff to it (not obvious)



//3 then you make the rules about what a cat is
const catSchema =  { name: String };

//3.1 you create the cat class using those rules
const Cat = mongoose.model('Cat', catSchema);


//4 you create an actual cat (but it only exists in memory (not saved in db))
// const theCat = new Cat({name: "Napoleon"})


//5 then you save the cat you just created
    // theCat.save()
    // .then((theThingIGetBackFromDB)=>{

    //     console.log(theThingIGetBackFromDB);

    // })
    // .catch((theErrorThing)=>{

    //     console.log(theErrorThing);
        
    // })



    // .find will always return an array, if you pass no argument, it will give you all the cats in the db
    // if you pass it a query, it will get all the cats that match the query EVEN IF THERE IS ONLY 1 SUCH CAT

        // Cat.find({name: "Pierre"})
        // .then((allTheCats)=>{

        //     console.log(allTheCats);

        // })
        // .catch((err)=>{
        //     console.log(err);
        // })





//findOne returns an object instead of an array
// it will find the first match and stop after that

        // Cat.findOne({name: "Napoleon"})
        // .then((theSingleCat)=>{

        //     console.log(theSingleCat);

        // })
        // .catch((err)=>{
        //     console.log(err);
        // })



//findById does exactly what is sounds like it does
// things to remember: it always returns an object (bc only 1 thing can have that id)
// it takes a string as argument instead of an object

        // Cat.findById("5beafb22fe5f5278e4901dcb")
        // .then((theSingleCat)=>{

        //     console.log(theSingleCat);

        // })
        // .catch((err)=>{
        //     console.log(err);
        // })
