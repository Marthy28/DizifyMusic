package com.ynov.dizifymusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ynov.dizifymusic.entity.Song;

public interface SongRepository extends JpaRepository<Song, Integer> {

	@Query("SELECT a FROM Song a WHERE a.name LIKE %:name%")
    public Song findByName(@Param("name") String lastname);
}
