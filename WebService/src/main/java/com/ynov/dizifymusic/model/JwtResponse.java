package com.ynov.dizifymusic.model;

import java.io.Serializable;

import com.ynov.dizifymusic.entity.User;
import com.ynov.dizifymusic.service.UserDetailsImpl;


public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;
	private final UserDetailsImpl user;

	public JwtResponse(String jwttoken, UserDetailsImpl user) {
		this.jwttoken = jwttoken;
		this.user = user;
	}

	public String getToken() {
		return this.jwttoken;
	}
	
	public UserDetailsImpl getUser() {
		return this.user;
	}
}
