package com.ynov.dizifymusic.model;

import java.io.Serializable;
/**
 * Classe permettant de récupérer
 * la requête de connexion
 */
public class JwtRequest implements Serializable {

	private static final long serialVersionUID = 5926468583005150707L;
	
	private String eMail, password;
	

	public JwtRequest(String eMail, String password) {
		this.setEMail(eMail);
		this.setPassword(password);
	}

	public String getEMail() {
		return this.eMail;
	}

	public void setEMail(String eMail) {
		this.eMail = eMail;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}