package com.ynov.dizifymusic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ynov.dizifymusic.entity.Favorite;
import com.ynov.dizifymusic.entity.User;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {

	List<Favorite> findByUserId(Long user_id);
}
