package com.ynov.dizifymusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ynov.dizifymusic.entity.Artist;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

	//récupérer un Artiste par son nom
    @Query("SELECT a FROM Artist a WHERE a.name LIKE %:name%")
    public Artist findByName(@Param("name") String lastname);
    
}