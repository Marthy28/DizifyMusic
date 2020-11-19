package com.ynov.dizifymusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ynov.dizifymusic.entity.Artist;
import com.ynov.dizifymusic.entity.Song;

public interface SongRepository extends JpaRepository<Song, Long> {

	@Query("SELECT s FROM Song s WHERE s.name LIKE %:name%")
    public Song findByName(@Param("name") String songName);
}
