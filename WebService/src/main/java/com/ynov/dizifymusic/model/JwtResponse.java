package com.ynov.dizifymusic.model;

import java.io.Serializable;
import com.ynov.dizifymusic.service.UserDetailsImpl;

/**
 * Affichage du token et des informations du user 
 */
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
