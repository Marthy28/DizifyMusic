package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ynov.dizifymusic.entity.Administrator;
import com.ynov.dizifymusic.entity.Playlist;
import com.ynov.dizifymusic.entity.User;
import com.ynov.dizifymusic.repository.AdministratorRepository;
import com.ynov.dizifymusic.repository.PlaylistRepository;
import com.ynov.dizifymusic.repository.UserRepository;

@RestController
public class UserController {
	private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @GetMapping("/user")
    public List<User> getUsers() {
    	try {
    		return userRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
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
    
    @DeleteMapping("/user/{id}")
    public void deleteUser(final @PathVariable("id") Long userId) {
    	try {
    		userRepository.deleteById(userId);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }
	
    @PostMapping("/user")
    public User addUser(@RequestBody User user) {
    	try {
    		return userRepository.save(user);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    
    @PutMapping("/usertoadmin/{id}")
    public User userToAdmin(final @PathVariable("id") Long userId) {
    	try {
    		Administrator admin = new Administrator();
    		User user = userRepository.findById(userId).get();
    		user.setAdministrator(admin);
    		admin.setUser(user);
    		return userRepository.save(user);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }

    @ResponseBody
    @PutMapping("/user/{id}")
    public User editUser(@RequestBody User user) {
    	try {
    		return userRepository.save(user);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
}
