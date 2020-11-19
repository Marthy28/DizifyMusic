package com.ynov.dizifymusic.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.ynov.dizifymusic.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

	@Query("SELECT f FROM Favorite f "
			+ "INNER JOIN f.user u  "
			+ "WHERE u.id = :user_id")
	Favorite findByUserId(Long user_id);
}
