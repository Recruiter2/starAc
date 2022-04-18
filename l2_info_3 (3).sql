-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 18 avr. 2022 à 09:58
-- Version du serveur : 10.4.10-MariaDB
-- Version de PHP : 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `l2_info_3`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `mail` varchar(128) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `nom`, `mail`, `password`) VALUES
(1, 'bob', NULL, 'bob');

-- --------------------------------------------------------

--
-- Structure de la table `artiste`
--

CREATE TABLE `artiste` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `mail` varchar(128) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `nom_artiste` varchar(45) DEFAULT NULL,
  `id_groupe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `artiste`
--

INSERT INTO `artiste` (`id`, `nom`, `prenom`, `date_naissance`, `mail`, `password`, `nom_artiste`, `id_groupe`) VALUES
(1, 'Mick', 'Leboss', '1011-07-17', 'mick.artisite@leboss.fr', '123', 'Mick', NULL),
(2, 'Robert', 'Pascal', '2022-02-16', 'lkjh@f.f', '456', 'Roberto', NULL),
(4, 'Alberto', 'Firminoh', '2022-02-16', 'firmi@abc.fr', '456', 'Albertooo', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `concert`
--

CREATE TABLE `concert` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `id_groupe` int(11) DEFAULT NULL,
  `nom` varchar(128) DEFAULT NULL,
  `nb_places` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `concert`
--

INSERT INTO `concert` (`id`, `date`, `id_groupe`, `nom`, `nb_places`) VALUES
(1, '2022-03-15', 64, 'Concerto n°78', 125);

-- --------------------------------------------------------

--
-- Structure de la table `creneaux`
--

CREATE TABLE `creneaux` (
  `id` int(11) NOT NULL,
  `date_debut` datetime DEFAULT NULL,
  `date_fin` datetime DEFAULT NULL,
  `id_evenement` int(11) DEFAULT NULL,
  `id_concert` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

CREATE TABLE `evenements` (
  `id_evt` int(11) NOT NULL,
  `nom` text NOT NULL,
  `date` date NOT NULL,
  `heure` time NOT NULL,
  `prix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `evenements`
--

INSERT INTO `evenements` (`id_evt`, `nom`, `date`, `heure`, `prix`) VALUES
(6, 'Pacho Buenos', '2018-08-22', '19:34:00', 80),
(7, 'Kinder Bueno', '2022-08-05', '13:13:00', 100);

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `id_groupe` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `type` varchar(25) NOT NULL,
  `id_createur` int(11) DEFAULT NULL,
  `recherche` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`id_groupe`, `nom`, `type`, `id_createur`, `recherche`) VALUES
(2, 'Chris', 'RAP', 1, 0),
(3, 'Pedrolito', 'HIP-HOP', 2, 0),
(64, 'Pilo', 'Latino', 1, 0),
(65, 'Ilo', 'Rap', 1, 0),
(66, 'Bethoven', 'Classique', 1, 0),
(67, 'Christian', 'ROCK & ROL', 1, 0),
(68, 'Titi', 'Rap', 1, 0),
(69, 'Table', 'Latino', 1, 0),
(70, 'Mickeyy', 'House', 1, 0),
(71, 'Polito', 'Roll', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `participe`
--

CREATE TABLE `participe` (
  `id_evt` int(11) NOT NULL,
  `id_groupe` int(11) NOT NULL,
  `temps` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `participe`
--

INSERT INTO `participe` (`id_evt`, `id_groupe`, `temps`) VALUES
(7, 66, '00:00:00'),
(7, 2, '00:00:00'),
(7, 67, '00:00:00'),
(7, 3, '00:00:00'),
(7, 64, '00:00:00'),
(6, 68, '00:00:00'),
(6, 69, '00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `id_concert` int(11) DEFAULT NULL,
  `id_spectateur` int(11) DEFAULT NULL,
  `prix` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `id_concert`, `id_spectateur`, `prix`) VALUES
(4, 1, 2, 25.5),
(5, 1, 2, 25.5);

-- --------------------------------------------------------

--
-- Structure de la table `spectateur`
--

CREATE TABLE `spectateur` (
  `id_spec` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `mail` varchar(128) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `spectateur`
--

INSERT INTO `spectateur` (`id_spec`, `nom`, `prenom`, `mail`, `password`, `date_naissance`) VALUES
(1, 'Roberto', 'Paul', 'paul.fr.fr', '123', '2022-03-01'),
(2, 'Mick', 'Mick', 'mick.fr', '123', '2022-03-09');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `artiste`
--
ALTER TABLE `artiste`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `groupe_idx` (`id_groupe`);

--
-- Index pour la table `concert`
--
ALTER TABLE `concert`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupe_idx` (`id_groupe`);

--
-- Index pour la table `creneaux`
--
ALTER TABLE `creneaux`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evenement_idx` (`id_evenement`),
  ADD KEY `concert_idx` (`id_concert`);

--
-- Index pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD PRIMARY KEY (`id_evt`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id_groupe`),
  ADD KEY `artiste_idx` (`id_createur`) USING BTREE;

--
-- Index pour la table `participe`
--
ALTER TABLE `participe`
  ADD KEY `FK_evt` (`id_evt`) USING BTREE,
  ADD KEY `FK_groupe` (`id_groupe`) USING BTREE;

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `concert_idx` (`id_concert`),
  ADD KEY `spectateur_idx` (`id_spectateur`);

--
-- Index pour la table `spectateur`
--
ALTER TABLE `spectateur`
  ADD PRIMARY KEY (`id_spec`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `artiste`
--
ALTER TABLE `artiste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `concert`
--
ALTER TABLE `concert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `creneaux`
--
ALTER TABLE `creneaux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `evenements`
--
ALTER TABLE `evenements`
  MODIFY `id_evt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id_groupe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `spectateur`
--
ALTER TABLE `spectateur`
  MODIFY `id_spec` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `artiste`
--
ALTER TABLE `artiste`
  ADD CONSTRAINT `groupe` FOREIGN KEY (`id_groupe`) REFERENCES `groupe` (`id_groupe`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `concert`
--
ALTER TABLE `concert`
  ADD CONSTRAINT `concert_to_groupe` FOREIGN KEY (`id_groupe`) REFERENCES `groupe` (`id_groupe`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `creneaux`
--
ALTER TABLE `creneaux`
  ADD CONSTRAINT `crenaux_to_evenement` FOREIGN KEY (`id_evenement`) REFERENCES `evenement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `creneaux_to_concert` FOREIGN KEY (`id_concert`) REFERENCES `concert` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD CONSTRAINT `artiste` FOREIGN KEY (`id_createur`) REFERENCES `artiste` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `participe`
--
ALTER TABLE `participe`
  ADD CONSTRAINT `FK_evt` FOREIGN KEY (`id_evt`) REFERENCES `evenements` (`id_evt`),
  ADD CONSTRAINT `FK_groupe` FOREIGN KEY (`id_groupe`) REFERENCES `groupe` (`id_groupe`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `concert` FOREIGN KEY (`id_concert`) REFERENCES `concert` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `spectateur` FOREIGN KEY (`id_spectateur`) REFERENCES `spectateur` (`id_spec`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
