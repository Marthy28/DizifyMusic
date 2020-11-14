package com.ynov.dizifymusic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ynov.dizifymusic.entity.Favorite;
import com.ynov.dizifymusic.entity.User;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

	@Query("SELECT f FROM Favorite f "
			+ "INNER JOIN f.user u  "
			+ "WHERE u.id = :user_id")
	Favorite findByUserId(Long user_id);
}
