package com.ynov.dizifymusic.model;

import java.io.Serializable;

<<<<<<< HEAD
import com.ynov.dizifymusic.entity.User;
import com.ynov.dizifymusic.service.UserDetailsImpl;

=======
>>>>>>> develop
public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;
<<<<<<< HEAD
	private final UserDetailsImpl user;

	public JwtResponse(String jwttoken, UserDetailsImpl user) {
		this.jwttoken = jwttoken;
		this.user = user;
=======

	public JwtResponse(String jwttoken) {
		this.jwttoken = jwttoken;
>>>>>>> develop
	}

	public String getToken() {
		return this.jwttoken;
	}
<<<<<<< HEAD
	
	public UserDetailsImpl getUser() {
		return this.user;
	}
=======
>>>>>>> develop
}
