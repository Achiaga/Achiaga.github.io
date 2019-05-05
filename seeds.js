var mongoose = require("mongoose"),
Campground   = require("./models/campground"),
Comment      = require("./models/comment"),
data = [
    {
    name: "Jelditon", 
    image: "https://images.unsplash.com/photo-1552414003-18030919ff8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
    description: "Hipócrates de Cos —en griego: Ἱπποκράτης— (Cos, c. 460 a. C.-Tesalia c. 370 a. C.) fue un médico de la Antigua Grecia que ejerció durante el llamado siglo de Pericles. Está clasificado como una de las figuras más destacadas de la historia de la medicina, y muchos autores se refieren a él como el «padre de la medicina»,123 en reconocimiento a sus importantes y duraderas contribuciones a esta ciencia como fundador de la escuela que lleva su nombre. Esta escuela intelectual revolucionó la medicina de su época, estableciéndola como una disciplina separada de otros campos con los cuales se la había asociado tradicionalmente (principalmente la teúrgia y la filosofía) y convirtiendo el ejercicio de la misma en una auténtica profesión.45Sin embargo, suelen entremezclarse los descubrimientos médicos de los escritores del Corpus hippocraticum, los practicantes de la medicina hipocrática y las acciones del mismo Hipócrates, por lo que se sabe muy poco sobre lo que el propio Hipócrates pensó, escribió e hizo realmente. A pesar de esta indefinición, Hipócrates es presentado a menudo como paradigma del médico antiguo. En concreto, se le atribuye un gran progreso en el estudio sistemático de la medicina clínica, reuniendo el conocimiento médico de escuelas anteriores y prescribiendo prácticas médicas de gran importancia histórica, como el juramento hipocrático y otras obrasNo hay que confundirlo con Hipócrates de Quíos, matemático griego del siglo V a. C., que nació en la isla de Quíos, no muy lejos de la de Cos, cuyo hito más importante fue la cuadratura de la lúnula.8"
        
    },    {
    name: "Lerkita", 
    image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-8v8RDfUH1QY%2FUz6GbNbuaHI%2FAAAAAAAAJMM%2FIo5kE94zgKk%2Fs1600%2Fcityscapes_futuristic_trains_science_fiction_artwork_3840x2160_wallpaper_Wallpaper_3840x2160_www.wallmay.net.jpg&f=1",
    description: "Hipócrates de Cos —en griego: Ἱπποκράτης— (Cos, c. 460 a. C.-Tesalia c. 370 a. C.) fue un médico de la Antigua Grecia que ejerció durante el llamado siglo de Pericles. Está clasificado como una de las figuras más destacadas de la historia de la medicina, y muchos autores se refieren a él como el «padre de la medicina»,123 en reconocimiento a sus importantes y duraderas contribuciones a esta ciencia como fundador de la escuela que lleva su nombre. Esta escuela intelectual revolucionó la medicina de su época, estableciéndola como una disciplina separada de otros campos con los cuales se la había asociado tradicionalmente (principalmente la teúrgia y la filosofía) y convirtiendo el ejercicio de la misma en una auténtica profesión.45Sin embargo, suelen entremezclarse los descubrimientos médicos de los escritores del Corpus hippocraticum, los practicantes de la medicina hipocrática y las acciones del mismo Hipócrates, por lo que se sabe muy poco sobre lo que el propio Hipócrates pensó, escribió e hizo realmente. A pesar de esta indefinición, Hipócrates es presentado a menudo como paradigma del médico antiguo. En concreto, se le atribuye un gran progreso en el estudio sistemático de la medicina clínica, reuniendo el conocimiento médico de escuelas anteriores y prescribiendo prácticas médicas de gran importancia histórica, como el juramento hipocrático y otras obrasNo hay que confundirlo con Hipócrates de Quíos, matemático griego del siglo V a. C., que nació en la isla de Quíos, no muy lejos de la de Cos, cuyo hito más importante fue la cuadratura de la lúnula.8"
        
    },    {
    name: "Notemsi", 
    image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.chambre237.com%2Fwp-content%2Fuploads%2F2013%2F10%2FVues-Panoramiques-de-Villes-Futuristes-10.jpg&f=1",
    description: "Hipócrates de Cos —en griego: Ἱπποκράτης— (Cos, c. 460 a. C.-Tesalia c. 370 a. C.) fue un médico de la Antigua Grecia que ejerció durante el llamado siglo de Pericles. Está clasificado como una de las figuras más destacadas de la historia de la medicina, y muchos autores se refieren a él como el «padre de la medicina»,123 en reconocimiento a sus importantes y duraderas contribuciones a esta ciencia como fundador de la escuela que lleva su nombre. Esta escuela intelectual revolucionó la medicina de su época, estableciéndola como una disciplina separada de otros campos con los cuales se la había asociado tradicionalmente (principalmente la teúrgia y la filosofía) y convirtiendo el ejercicio de la misma en una auténtica profesión.45Sin embargo, suelen entremezclarse los descubrimientos médicos de los escritores del Corpus hippocraticum, los practicantes de la medicina hipocrática y las acciones del mismo Hipócrates, por lo que se sabe muy poco sobre lo que el propio Hipócrates pensó, escribió e hizo realmente. A pesar de esta indefinición, Hipócrates es presentado a menudo como paradigma del médico antiguo. En concreto, se le atribuye un gran progreso en el estudio sistemático de la medicina clínica, reuniendo el conocimiento médico de escuelas anteriores y prescribiendo prácticas médicas de gran importancia histórica, como el juramento hipocrático y otras obrasNo hay que confundirlo con Hipócrates de Quíos, matemático griego del siglo V a. C., que nació en la isla de Quíos, no muy lejos de la de Cos, cuyo hito más importante fue la cuadratura de la lúnula.8"
        
    },
    ]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }else{
            console.log("removed campgrounds!"); 
            // Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Campground created!")
                        //create coment in each campground
                        Comment.create(
                            {
                                text:"This girl is so fucking hot that my hand is burning!",
                                author:"Homer"
                            },function(err, comment){
                                if(err){
                                    console.log(err)
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment!")
                                }
                            }
                            )
                    }
                });
            })
        }
    })
}

module.exports = seedDB;