package com.ynov.dizifymusic.service;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ynov.dizifymusic.Global;
import com.ynov.dizifymusic.entity.User;
import com.ynov.dizifymusic.repository.UserRepository;

/*
 * 
 */
@Service
public class JwtUserDetailService implements UserDetailsService {

	private UserRepository userRepository;
	
	public JwtUserDetailService(UserRepository userRepository)
	{
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDetailsImpl loadUserByUsername(String eMail) throws UsernameNotFoundException {

		
		User user = userRepository.findByEMail(eMail);

		if (user == null)
		{
			throw new UsernameNotFoundException("User not found with username: " + eMail);
		}
		return new UserDetailsImpl(user.getId(), user.geteMail(), user.getPassword(), user.getAdministrator());
		
	}

}