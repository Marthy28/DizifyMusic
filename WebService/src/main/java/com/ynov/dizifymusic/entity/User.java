package com.ynov.dizifymusic.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "User")
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	Integer getId()
	{
		return id;
	}
	
	String eMail;
	String avatarUri;
	String pseudo;
	
	void setEMail(String _email)
	{
		eMail = _email;
	}
	
	void setAvarUri(String _uri)
	{
		avatarUri = _uri;
	}
	
	void setPseudo(String _pseudo)
	{
		pseudo = _pseudo;
	}
	
	String getEMail()
	{
		return eMail;
	}
	
	String getAvarUri()
	{
		return avatarUri;
	}
	
	String geetPseudo()
	{
		return pseudo;
	}
	
}
