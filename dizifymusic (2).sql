-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 23 nov. 2020 à 00:07
-- Version du serveur :  8.0.22-0ubuntu0.20.04.2
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dizifymusic`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrator`
--

CREATE TABLE `administrator` (
  `id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `administrator`
--

INSERT INTO `administrator` (`id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Structure de la table `album`
--

CREATE TABLE `album` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `picture_uri` varchar(255) DEFAULT NULL,
  `release_date` datetime(6) DEFAULT NULL,
  `artist_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `album`
--

INSERT INTO `album` (`id`, `name`, `picture_uri`, `release_date`, `artist_id`) VALUES
(35, 'Music of the sun', 'https://img.discogs.com/GZynNx845Zwa3iM3qdmQk8aKLRg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1512743-1232152919.jpeg.jpg', '2020-11-06 00:02:56.000000', 2),
(42, 'B\'day', 'https://images-na.ssl-images-amazon.com/images/I/81c9qazagZL._SL1500_.jpg', '2020-11-10 00:02:50.000000', 1),
(45, 'Mantra', 'https://images-eu.ssl-images-amazon.com/images/I/71C281rEQUL._AC_UL600_SR600,600_.jpg', '2018-10-01 20:54:00.000000', 4);

-- --------------------------------------------------------

--
-- Structure de la table `album_favorites`
--

CREATE TABLE `album_favorites` (
  `album_id` bigint NOT NULL,
  `favorites_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `album_favorites`
--

INSERT INTO `album_favorites` (`album_id`, `favorites_id`) VALUES
(42, 3),
(45, 3);

-- --------------------------------------------------------

--
-- Structure de la table `artist`
--

CREATE TABLE `artist` (
  `id` bigint NOT NULL,
  `image_uri` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `artist`
--

INSERT INTO `artist` (`id`, `image_uri`, `name`) VALUES
(1, 'https://cdn-elle.ladmedia.fr/var/plain_site/storage/images/personnalites/beyonce/42390447-3-fre-FR/Beyonce.jpg', 'Beyonce'),
(2, 'https://static.lexpress.fr/medias_11615/w_884,h_1327,c_crop,x_0,y_0/w_640,h_900,c_fill,g_north/v1505811841/rihanna-fenty-beauty-1_5947046.jpg', 'Rihanna'),
(4, 'https://lastfm.freetls.fastly.net/i/u/770x0/1341e504bbf78cd2675e92c29ecf0342.jpg', 'Sebastian Yatra'),
(5, 'https://img.pixers.pics/pho(s3:700/PI/70/96/700_PI7096_7ceb8ab0808ecc73fccd927e1b9102a3_5b7abc520efab_.,517,700,jpg)/stickers-bruno-mars.jpg.jpg', 'Bruno Mars');

-- --------------------------------------------------------

--
-- Structure de la table `artist_favorites`
--

CREATE TABLE `artist_favorites` (
  `artist_id` bigint NOT NULL,
  `favorites_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `artist_favorites`
--

INSERT INTO `artist_favorites` (`artist_id`, `favorites_id`) VALUES
(1, 3),
(5, 5);

-- --------------------------------------------------------

--
-- Structure de la table `favorite`
--

CREATE TABLE `favorite` (
  `id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `favorite`
--

INSERT INTO `favorite` (`id`) VALUES
(3),
(5);

-- --------------------------------------------------------

--
-- Structure de la table `favorite_albums`
--

CREATE TABLE `favorite_albums` (
  `favorite_id` bigint NOT NULL,
  `albums_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `favorite_albums`
--

INSERT INTO `favorite_albums` (`favorite_id`, `albums_id`) VALUES
(5, 35),
(3, 45);

-- --------------------------------------------------------

--
-- Structure de la table `favorite_artists`
--

CREATE TABLE `favorite_artists` (
  `favorite_id` bigint NOT NULL,
  `artists_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `favorite_artists`
--

INSERT INTO `favorite_artists` (`favorite_id`, `artists_id`) VALUES
(3, 4);

-- --------------------------------------------------------

--
-- Structure de la table `favorite_songs`
--

CREATE TABLE `favorite_songs` (
  `favorite_id` bigint NOT NULL,
  `songs_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `favorite_songs`
--

INSERT INTO `favorite_songs` (`favorite_id`, `songs_id`) VALUES
(3, 3),
(3, 6);

-- --------------------------------------------------------

--
-- Structure de la table `playlist`
--

CREATE TABLE `playlist` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `playlist`
--

INSERT INTO `playlist` (`id`, `name`, `user_id`) VALUES
(2, 'Playlist Fun', 3);

-- --------------------------------------------------------

--
-- Structure de la table `playlist_songs`
--

CREATE TABLE `playlist_songs` (
  `playlist_id` bigint NOT NULL,
  `songs_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `playlist_songs`
--

INSERT INTO `playlist_songs` (`playlist_id`, `songs_id`) VALUES
(2, 6),
(2, 11);

-- --------------------------------------------------------

--
-- Structure de la table `song`
--

CREATE TABLE `song` (
  `id` bigint NOT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `album_id` bigint DEFAULT NULL,
  `artist_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `song`
--

INSERT INTO `song` (`id`, `duration`, `name`, `album_id`, `artist_id`) VALUES
(3, '4\'32', 'Upgrade U', 42, 1),
(4, '4\'32', 'Irreplaceable', 42, 1),
(5, '4\'32', 'Pon de Replay', 35, 2),
(6, '4\'32', 'Here I Go Again', 35, 2),
(8, '4\'30', 'Let Me', 35, 2),
(9, '4\'31', 'The Last Time', 35, 2),
(11, '3\'59', 'Green Light', 42, 1);

-- --------------------------------------------------------

--
-- Structure de la table `song_favorites`
--

CREATE TABLE `song_favorites` (
  `song_id` bigint NOT NULL,
  `favorites_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `song_favorites`
--

INSERT INTO `song_favorites` (`song_id`, `favorites_id`) VALUES
(9, 3),
(11, 3);

-- --------------------------------------------------------

--
-- Structure de la table `song_playlists`
--

CREATE TABLE `song_playlists` (
  `song_id` bigint NOT NULL,
  `playlists_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `song_playlists`
--

INSERT INTO `song_playlists` (`song_id`, `playlists_id`) VALUES
(8, 2),
(9, 2);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `avatar_uri` varchar(255) DEFAULT NULL,
  `e_mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `administrator_id` bigint DEFAULT NULL,
  `favorite_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `avatar_uri`, `e_mail`, `password`, `pseudo`, `administrator_id`, `favorite_id`) VALUES
(3, 'https://www.maboucheriesolidaire.com/modules/vnlab_testimonials/media/54-iconfinder-4-avatar-2754580_120522.png', 'user@user.com', 'password', 'monpseudo', NULL, 3),
(4, 'https://www.maboucheriesolidaire.com/modules/vnlab_testimonials/media/54-iconfinder-4-avatar-2754580_120522.png', 'admini@admin.com', 'password', 'monpseudo', 1, 5);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmwc4fyyxb6tfi0qba26gcf8s1` (`artist_id`);

--
-- Index pour la table `album_favorites`
--
ALTER TABLE `album_favorites`
  ADD PRIMARY KEY (`album_id`,`favorites_id`),
  ADD KEY `FKm7ofh2n4oqkwq7iudkuvg2syl` (`favorites_id`);

--
-- Index pour la table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `artist_favorites`
--
ALTER TABLE `artist_favorites`
  ADD PRIMARY KEY (`artist_id`,`favorites_id`),
  ADD KEY `FKocpe044bd2bkodsmom8uvp7vl` (`favorites_id`);

--
-- Index pour la table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `favorite_albums`
--
ALTER TABLE `favorite_albums`
  ADD PRIMARY KEY (`favorite_id`,`albums_id`),
  ADD KEY `FK85laaak190g7b1t0lc1rf56sk` (`albums_id`);

--
-- Index pour la table `favorite_artists`
--
ALTER TABLE `favorite_artists`
  ADD PRIMARY KEY (`favorite_id`,`artists_id`),
  ADD KEY `FKq3yrf0j063f289dc3rjrmtawr` (`artists_id`);

--
-- Index pour la table `favorite_songs`
--
ALTER TABLE `favorite_songs`
  ADD PRIMARY KEY (`favorite_id`,`songs_id`),
  ADD KEY `FKjcgij3yrwjmrrckkcm7uipcg8` (`songs_id`);

--
-- Index pour la table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlbi6wsq41356go2ki0yirfixo` (`user_id`);

--
-- Index pour la table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD PRIMARY KEY (`playlist_id`,`songs_id`),
  ADD KEY `FKhw2c0ly8bsmaibmdl4v602y5k` (`songs_id`);

--
-- Index pour la table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrcjmk41yqj3pl3iyii40niab0` (`album_id`),
  ADD KEY `FKa21ft97nj7thwrp5d31xdaxr` (`artist_id`);

--
-- Index pour la table `song_favorites`
--
ALTER TABLE `song_favorites`
  ADD PRIMARY KEY (`song_id`,`favorites_id`),
  ADD KEY `FKpv0gxe0ti3smv6bi4lci9cnf1` (`favorites_id`);

--
-- Index pour la table `song_playlists`
--
ALTER TABLE `song_playlists`
  ADD PRIMARY KEY (`song_id`,`playlists_id`),
  ADD KEY `FK3027kp2r4se7i4pkkoreqwasr` (`playlists_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKg5kes7g7f3klmd8r4j33stjos` (`administrator_id`),
  ADD KEY `FKoapmnbiun47g2e7hsw0c4brnw` (`favorite_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `album`
--
ALTER TABLE `album`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pour la table `artist`
--
ALTER TABLE `artist`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `song`
--
ALTER TABLE `song`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `FKmwc4fyyxb6tfi0qba26gcf8s1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`);

--
-- Contraintes pour la table `album_favorites`
--
ALTER TABLE `album_favorites`
  ADD CONSTRAINT `FKm7ofh2n4oqkwq7iudkuvg2syl` FOREIGN KEY (`favorites_id`) REFERENCES `favorite` (`id`),
  ADD CONSTRAINT `FKr6rxsd7neyjclmlfvw6amn7cc` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`);

--
-- Contraintes pour la table `artist_favorites`
--
ALTER TABLE `artist_favorites`
  ADD CONSTRAINT `FK31s357hld3rkg3kxjptc589ix` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
  ADD CONSTRAINT `FKocpe044bd2bkodsmom8uvp7vl` FOREIGN KEY (`favorites_id`) REFERENCES `favorite` (`id`);

--
-- Contraintes pour la table `favorite_albums`
--
ALTER TABLE `favorite_albums`
  ADD CONSTRAINT `FK85laaak190g7b1t0lc1rf56sk` FOREIGN KEY (`albums_id`) REFERENCES `album` (`id`),
  ADD CONSTRAINT `FK9cipnco9ylqrtox7m5oh3ye1v` FOREIGN KEY (`favorite_id`) REFERENCES `favorite` (`id`);

--
-- Contraintes pour la table `favorite_artists`
--
ALTER TABLE `favorite_artists`
  ADD CONSTRAINT `FKhypghh830l1lbwq7bl2269mdi` FOREIGN KEY (`favorite_id`) REFERENCES `favorite` (`id`),
  ADD CONSTRAINT `FKq3yrf0j063f289dc3rjrmtawr` FOREIGN KEY (`artists_id`) REFERENCES `artist` (`id`);

--
-- Contraintes pour la table `favorite_songs`
--
ALTER TABLE `favorite_songs`
  ADD CONSTRAINT `FKjcgij3yrwjmrrckkcm7uipcg8` FOREIGN KEY (`songs_id`) REFERENCES `song` (`id`),
  ADD CONSTRAINT `FKt3h0jh1hb2uka8hsg8k11h6tk` FOREIGN KEY (`favorite_id`) REFERENCES `favorite` (`id`);

--
-- Contraintes pour la table `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `FKlbi6wsq41356go2ki0yirfixo` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `FKf5rt0kg266cdttc1xucp6dpg8` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`),
  ADD CONSTRAINT `FKhw2c0ly8bsmaibmdl4v602y5k` FOREIGN KEY (`songs_id`) REFERENCES `song` (`id`);

--
-- Contraintes pour la table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `FKa21ft97nj7thwrp5d31xdaxr` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
  ADD CONSTRAINT `FKrcjmk41yqj3pl3iyii40niab0` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`);

--
-- Contraintes pour la table `song_favorites`
--
ALTER TABLE `song_favorites`
  ADD CONSTRAINT `FKpv0gxe0ti3smv6bi4lci9cnf1` FOREIGN KEY (`favorites_id`) REFERENCES `favorite` (`id`),
  ADD CONSTRAINT `FKqdktvuymciav2b6ehstjt69bk` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);

--
-- Contraintes pour la table `song_playlists`
--
ALTER TABLE `song_playlists`
  ADD CONSTRAINT `FK3027kp2r4se7i4pkkoreqwasr` FOREIGN KEY (`playlists_id`) REFERENCES `playlist` (`id`),
  ADD CONSTRAINT `FKjg6bx27ecr5emrt3vnw1wx0pq` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKg5kes7g7f3klmd8r4j33stjos` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`id`),
  ADD CONSTRAINT `FKoapmnbiun47g2e7hsw0c4brnw` FOREIGN KEY (`favorite_id`) REFERENCES `favorite` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
