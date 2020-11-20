package com.ynov.dizifymusic.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ynov.dizifymusic.entity.Administrator;
import com.ynov.dizifymusic.entity.User;

/**
 * Implémentation de la classe userDetail
 */
public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Administrator administrator;
	private String username;

	private String email;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(Long id, String email, String password, Administrator administrator) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.administrator = administrator;
	}

	public static UserDetailsImpl build(User user) {

		return new UserDetailsImpl(
				user.getId(), 
				user.geteMail(),
				user.getPassword(), user.getAdministrator()
				);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}
	
	public Administrator getAdministrator()
	{
		return this.administrator;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}
}
