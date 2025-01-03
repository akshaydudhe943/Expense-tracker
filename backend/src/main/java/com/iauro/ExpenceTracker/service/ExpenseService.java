package com.iauro.ExpenceTracker.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.iauro.ExpenceTracker.Entity.Expense;
import com.iauro.ExpenceTracker.Entity.User;
import com.iauro.ExpenceTracker.Repository.ExpenseRepository;
import com.iauro.ExpenceTracker.Repository.UserRepository;
import com.iauro.ExpenceTracker.dto.ExpenseDto;

import jakarta.transaction.Transactional;

@Service
public class ExpenseService {
	
	@Autowired
	ExpenseRepository expenseRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;

	public Expense addExpense(ExpenseDto expenseDto) {
		
		String username = getCurrentUsername();
		User myUser = userRepository.findByUsername(username);
		if(myUser == null) throw new UsernameNotFoundException("user not found with username :" + username);
		Expense expense = new Expense();
		expense.setCategory(expenseDto.getCategory());
		expense.setAmount(expenseDto.getAmount());
		expense.setComments(expenseDto.getComments());
		expense.setCreatedAt(LocalDateTime.now());
		expense.setUpdatedAt(LocalDateTime.now());
		expense.setUser(myUser);
		try {
			expenseRepository.save(expense);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return expense;
	}
	
    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return null;
    }

	public List<Expense> getAllExpenses() {
		User myUser = userRepository.findByUsername(getCurrentUsername());
		return expenseRepository.findAllByUser(myUser);
	}
	
	public double getTotalExpenseAmount() {
        String username = getCurrentUsername();
        User myUser = userRepository.findByUsername(username);

        return myUser.getExpenses()
                     .stream()
                     .mapToDouble(Expense::getAmount)
                     .sum();
    }
	
	@Transactional
	public Expense updateExpense(Long id, ExpenseDto expenseDto) {
		Expense existing = expenseRepository.findById(id).orElseThrow();
        existing.setCategory(expenseDto.getCategory());
        existing.setAmount(expenseDto.getAmount());
        existing.setComments(expenseDto.getComments());
        existing.setUpdatedAt(LocalDateTime.now());
        return expenseRepository.save(existing);
	}
}
