package com.ynov.dizifymusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ynov.dizifymusic.entity.Album;
import com.ynov.dizifymusic.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT a FROM User a WHERE a.eMail LIKE %:email%")
    public User findByEMail(@Param("email") String emailUser);
}
