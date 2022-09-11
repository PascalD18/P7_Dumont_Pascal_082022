const Post = require('../models/Post');
const fs = require('fs');
//const bodyParser = require('body-parser')


// Ajoute un objet Post

exports.createPost = (req, res) => {
  // Version P6 d'origine
  const postObject = JSON.parse(req.body.post);

  // Avec Talend API
  //const postObject = req.body;

  // les 2 lignes ci-dessous sont inutiles
  // delete postObject._id;
  // delete postObject._userId;

  // Création du formulaire de la sauce dans l'objet 'sauce'
  const post = new Post({
    ...postObject,
    userId: req.auth.userId,

    // Version P6 d'origine
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    //Version Talend API pour * seulement indiquer l'image dans le formulaire *
    //imageUrl:postObject.imageUrl
  });
  // Enregistrement du formulaire de la post
  post.save()
    .then(() => { res.status(201).json({ message: 'Post enregistré !' }) })
    .catch(error => { res.status(400).json({ error }) })
}

// Modification d'un objet Post
exports.modifyPost = (req, res) => {

  // Vérifie si une image a était sélectionnée et enregistrée avec un nom unique
  postObject = req.file ?
    {
      ...JSON.parse(req.body.post),

      // Si oui, définit le nouvel Url avec le nom unique de l'image selectionnée
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

      // Sinon, renseigne le formulaire sauf 'imageUrl'
    } : { ...req.body }

  //Vérifie si l'utilisateur corresponds à la requéte
  //if (req.body.userId != req.auth.userId) {
    if (postObject.userId !== req.auth.userId) {
    res.status(401).json({ message: 'Not authorized' });
  } else {

  // Si oui, et si une image a été selectionnée ( ou même reselectionnée !)
  if (req.file !== undefined) {
    // Efface l'ancien fichier correspondant à l'image avant MAJ
    Post.findOne({ _id: req.params.id })
      .then((post) => {

        //Définit le nom du fichier correspondant, avec son Url avant MAJ
        const filename = post.imageUrl.split('/images/')[1];

        // Et l'efface pour ne pas laisser de fichier image inutile sur le serveur
        // ('Multer' à déjà sélectionné et enregistré sur le serveur, 
        // un autre nom fichier image correspondant avec un nom unique ... )
        fs.unlink(`images/${filename}`, () => {
        })

      });
  }

  // Met à jour le formulaire
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié!' }))
    .catch(error => res.status(401).json({ error }))
  }

};
exports.likedNoLiked = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (req.body.like == 1 && !post.usersLiked.includes(req.auth.userId)) {

        // Si l'utilisateur authentifié n'est pas contenu dans tableau 'usersLiked'
        // Et si like = 1 => Incrémente likes et ajoute l'utilisateur dans tableau 'usersLiked'
        Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.auth.userId } })
          .then(() => res.status(200).json({ message: "Incremente likes et ajoute un utilisateur qui aime !" }))
          .catch(error => res.status(400).json({ error }))
          .catch(error => res.status(400).json({ error }))
      } else {
        if (post.usersLiked.includes(req.auth.userId)) {

          // Si like = 0, et que l'utilisateur est dans le tableau 'usersLiked'
          Post.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId } })
            .then(() => { res.status(200).json({ message: "Décrément likes et enléve un utilisateur qui aime !" }) })
            .catch(error => res.status(400).json({ error }))
        }
      }
    })
    .catch(error => res.status(400).json({ error }))
}

// Suppression objet Post
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(204).json({ message: 'Post supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
}

// Lecture d'un objet Post
exports.getOnePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

// Lecture de tous les objets Post
exports.getAllPosts = (req, res) => {
  Post.find()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error: error }))
}

