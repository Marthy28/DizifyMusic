package com.ynov.dizifymusic.service;

<<<<<<< HEAD
=======
import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
>>>>>>> develop
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
=======
import com.ynov.dizifymusic.Global;
>>>>>>> develop
import com.ynov.dizifymusic.entity.User;
import com.ynov.dizifymusic.repository.UserRepository;

@Service
public class JwtUserDetailService implements UserDetailsService {

	private UserRepository userRepository;
	
	public JwtUserDetailService(UserRepository userRepository)
	{
		this.userRepository = userRepository;
	}
	
	@Override
<<<<<<< HEAD
	public UserDetailsImpl loadUserByUsername(String eMail) throws UsernameNotFoundException {
=======
	public UserDetails loadUserByUsername(String eMail) throws UsernameNotFoundException {
>>>>>>> develop

		/*User user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
<<<<<<< HEAD
				new ArrayList<>());*/
	
		
		User user = userRepository.findByEMail(eMail);
=======
				new ArrayList<>());
	*/
		User user = userRepository.findByEMail(eMail);
		
>>>>>>> develop
		if (user == null)
		{
			throw new UsernameNotFoundException("User not found with username: " + eMail);
		}
<<<<<<< HEAD
		return new UserDetailsImpl(user.getId(), user.geteMail(), user.getPassword(), user.getAdministrator());
=======
		else
		{
			Global.admin = user.getAdministrator() != null;
		}
		return new org.springframework.security.core.userdetails.User(user.geteMail(), user.getPassword(),new ArrayList<>());
>>>>>>> develop
		
	}

}