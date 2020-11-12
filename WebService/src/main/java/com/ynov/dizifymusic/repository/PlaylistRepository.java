package com.ynov.dizifymusic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ynov.dizifymusic.entity.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
	
     List<Playlist> findByUserId(@Param("user_id") Long user_id);
}
