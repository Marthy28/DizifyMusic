package com.ynov.dizifymusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ynov.dizifymusic.entity.Artist;

/**
 * Extension du Repository CRUD pour ajouter une méthode métier.
 * 
 * @author Matthieu BACHELIER
 * @since 2020-11
 * @version 1.0
 */
public interface ArtistRepository extends JpaRepository<Artist, Integer> {

    /**
     * Recherche un auteur par son nom ou son prénom.
     * 
     * @param lastname le nom
     * @param firstname le prénom
     * @return un auteur
     */
    @Query("SELECT a FROM Artist a WHERE a.name LIKE %:name%")
    public Artist findByName(@Param("name") String lastname);

}