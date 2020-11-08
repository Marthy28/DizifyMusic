package com.ynov.dizifymusic.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Admin")
public class Administrator {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	@ManyToMany
    private Set<User> adminUsers = new HashSet<>();
	
	Integer getId()
	{
		return id;
	}
	
	void setAdminUsers(Set<User> _users)
	{
		adminUsers = _users;
	}
	
	Set<User> getAdminUsers()
	{
		return adminUsers;
	}

}
