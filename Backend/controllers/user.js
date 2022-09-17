const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

     // Attribue un type d'utilisateur en fonction de l'email
     if (req.body.email === `${process.env.ADMIN}`)
     {
        typeUser="Admin"
     }else{
        typeUser ="User"
     }
    // Cryptage du mot de passe, unidirectionnel ( méthode hash')
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,

                // définit le type d'utilisateur en fonction de son email
                typeUser : typeUser
            });

            // Sauvegarde l'email de l'utilisateur avec le mot de passe crypté
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })

        // Vérifie si l'email de l'utilisateur n'existe pas déjà
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé !' });
            }

            // Décryptage du mot de passe pour authentification
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    // Si mot le passe authentifié => Définit un token utilisateur à partir de la variable d'environnement 
                    // et limite sa validité à 24h
                    res.status(200).json({
                        userId: user._id,
                        email : user.email,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.TOKEN_SECRET}`,
                            { expiresIn: '24h' } ),

                        // en indiquant également si il il s'agit d'un administrateur ou non
                        typeUser : user.typeUser
                    });
                })
                .catch(error => res.status(500).json({ error })
                );
        })
        .catch(error => res.status(500).json({ error }));
};
// Lecture de tous les utilisateurs
exports.getAllUsers = (req, res) => {
    User.find()
      .then(post => res.status(200).json(post))
      .catch(error => res.status(400).json({ error: error }))
  }
  