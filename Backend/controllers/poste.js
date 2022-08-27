const Poste = require('../models/Poste');
const fs = require('fs');
//const bodyParser = require('body-parser')


// Ajoute un objet Poste

exports.createPoste = (req, res) => {
 // Version P6 d'origine
 // const sauceObject = JSON.parse(req.body.sauce);

 // Avec Talend API
 const posteObject = req.body;

 // les 2 lignes ci-dessous sont inutiles
  //delete sauceObject._id;
  //delete sauceObject._userId;

  // Création du formulaire de la sauce dans l'objet 'sauce'
  const poste = new Poste({
    ...posteObject,
    userId: req.auth.userId,

     // Version P6 d'origine
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    
     //Version Talend API pour * seulement indiquer l'image dans le formulaire *
     //imageUrl:posteObject.imageUrl
  });
  // Enregistrement du formulaire de la poste
  poste.save()
    .then(() => { res.status(201).json({ message: 'Poste enregistré !' }) })
    .catch(error => { res.status(400).json({ error }) })
}

// Modification d'un objet Poste
exports.modifyPoste = (req, res) => {

  // Vérifie si une image a était selectionnée et enregistrée avec un nom unique
  const posteObject = req.file ?
    {
      ...JSON.parse(req.body.poste),

      // Si oui, définit le nouvel Url avec le nom unique de l'image selectionnée
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

      // Sinon, renseigne le formulaire sauf 'imageUrl'
    } : { ...req.body }


  //Vérifie si l'utilisateur corresponds à la requéte
  //if (req.body.userId != req.auth.userId) {
  //  res.status(401).json({ message: 'Not authorized' });
  //} else {

    // Si oui, et si une image a été selectionnée ( ou même reselectionnée !)
    if (req.file !== undefined) {
      // Efface l'ancien fichier correspondant à l'image avant MAJ
      Poste.findOne({ _id: req.params.id })
        .then((poste) => {

          //Définit le nom du fichier correspondant, avec son Url avant MAJ
          const filename = poste.imageUrl.split('/images/')[1];

          // Et l'efface pour ne pas laisser de fichier image inutile sur le serveur
          // ('Multer' à déjà sélectionné et enregistré sur le serveur, 
          // un autre nom fichier image correspondant avec un nom unique ... )
          fs.unlink(`images/${filename}`, () => {
          })

        });
    }

    // Met à jour le formulaire
    Poste.updateOne({ _id: req.params.id }, { ...posteObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Poste modifiée!' }))
      .catch(error => res.status(401).json({ error }))
  //}

};
exports.likedNoLiked = (req, res) => {
  Poste.findOne({ _id: req.params.id })
    .then(poste => {
      if (req.body.like == 1 ) {
      // ok = if (req.body.like == 1 && !poste.usersLiked.includes(req.auth.userId)) {

        // Si l'utilisateur authentifié n'est pas contenu dans tableau 'usersLiked'
        // Et si like = 1 => Incrémente likes et ajoute l'utilisateur dans tableau 'usersLiked'
        Poste.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
        // ok = Poste.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.auth.userId } })
          .then(() => res.status(200).json({ message: "Incremente likes et ajoute un utilisateur qui aime !" }))
          .catch(error => res.status(400).json({ error }))
      } else if (req.body.like == -1 && !poste.usersDisliked.includes(req.auth.userId)) {

        // Si l'utilisateur authentifié n'est pas contenu dans tableau 'usersDisliked'
        // Et si Like = -1 => Incrémente dislikes et ajoute l'utilisateur dans tableau 'usersDisliked'
        Poste.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.auth.userId } })
          .then(() => { res.status(200).json({ message: "Ajoute un utilisateur qui n' aime pas !" }) })
          .catch(error => res.status(400).json({ error }))
      } else {
        if (poste.usersLiked.includes(req.auth.userId)) {

          // Si like = 0, et que l'utilisateur est dans le tableau 'usersLiked'
          Poste.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId } })
            .then(() => { res.status(200).json({ message: "Décrément likes et enléve un utilisateur qui aime !" }) })
            .catch(error => res.status(400).json({ error }))
        } else {

          // Sinon, si like = 0, cela signifie que l'utilisateur est dans le tableau 'usersDisliked'
          Poste.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.auth.userId } })
            .then(() => { res.status(200).json({ message: "Décrémente Dislikes et enléve un utilisateur qui n'aime pas !" }) })
            .catch(error => res.status(400).json({ error }))
        }
      }
    })
    .catch(error => res.status(400).json({ error }))
}

// Suppression objet Poste
exports.deletePoste = (req, res) => {
  Poste.findOne({ _id: req.params.id })
    .then(poste => {
      if (poste.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = poste.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Poste.deleteOne({ _id: req.params.id })
            .then(() => res.status(204).json({ message: 'Poste supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
}

// Lecture d'un objet Poste
exports.getOnePoste = (req, res) => {
  Poste.findOne({ _id: req.params.id })
    .then((poste) => res.status(200).json(poste))
    .catch(error => res.status(404).json({ error }));
}

// Lecture de tous les objets Poste
exports.getAllPostes = (req, res) => {
  Poste.find()
    .then(poste => res.status(200).json(poste))
    .catch(error => res.status(400).json({ error: error }))
}

