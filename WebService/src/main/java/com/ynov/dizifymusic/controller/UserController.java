package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ynov.dizifymusic.entity.Administrator;
import com.ynov.dizifymusic.entity.Favorite;
import com.ynov.dizifymusic.entity.User;
import com.ynov.dizifymusic.model.JwtRequest;
import com.ynov.dizifymusic.repository.FavoriteRepository;
import com.ynov.dizifymusic.repository.UserRepository;

@RestController
public class UserController {
	private UserRepository userRepository;
	private FavoriteRepository favoriteRepository;
	private JwtAutenticationController jwtAutenticationController;

	@Autowired
    public UserController(UserRepository userRepository, FavoriteRepository favoriteRepository, JwtAutenticationController jwtAutenticationController) {
        this.userRepository = userRepository;
        this.favoriteRepository = favoriteRepository;
        this.jwtAutenticationController = jwtAutenticationController;
    }
    
    // GET all
    //admin
    @GetMapping("/users")
    public List<User> getUsers() {
    	try {
    		return userRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //GET user by id
    //user 
    @ResponseBody
    @GetMapping("/user/{id}")
    public User getUser(final @PathVariable("id") Long userId) {
    	try {
            return userRepository.findById(userId).get();
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    //DELETE by id
    //user - admin
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/user/{id}")
    public void deleteUser(final @PathVariable("id") Long userId) {
    	try {
    		userRepository.deleteById(userId);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }
	
    //POST
    //user
    @PostMapping("/signin")
    public ResponseEntity<?> addUser(@RequestBody User user) {
    	try {
    		Favorite fav = favoriteRepository.save(new Favorite());
    		if(fav == null)
    			return null;
    		
    		
    		
    		user.setFavorite(fav);
    		

    		
    		userRepository.save(user);
    		return jwtAutenticationController.createAuthenticationToken(new JwtRequest(user.geteMail(), user.getPassword()));
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    
    //PUT user to admin by id
    //admin
    @PutMapping("/usertoadmin/{id}")
    public User userToAdmin(final @PathVariable("id") Long userId) {
    	try {
    		Administrator admin = new Administrator();
    		User user = userRepository.findById(userId).get();
    		if(user == null)
    			return null;
    		
    		user.setAdministrator(admin);
    		admin.setUser(user);
    		
    		return userRepository.save(user);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }

    //PUT by id
    //user
    @ResponseBody
    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/user")
    public User editUser(@RequestBody User user) {
    	try {
    		return userRepository.save(user);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
}
