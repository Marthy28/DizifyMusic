package com.ynov.dizifymusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ynov.dizifymusic.entity.Album;
public interface AlbumRepository extends JpaRepository<Album, Long> {
	
	@Query("SELECT a FROM Album a WHERE a.name LIKE %:name%")
    public Album findByName(@Param("name") String albumName);
	
}
