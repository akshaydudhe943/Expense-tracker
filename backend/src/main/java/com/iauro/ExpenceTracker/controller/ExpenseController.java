package com.iauro.ExpenceTracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iauro.ExpenceTracker.Entity.Expense;
import com.iauro.ExpenceTracker.Repository.ExpenseRepository;
import com.iauro.ExpenceTracker.dto.ExpenseDto;
import com.iauro.ExpenceTracker.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Autowired
	private ExpenseService expenseService;

    @PostMapping
    public Expense addExpense(@RequestBody ExpenseDto expense) {
    	return expenseService.addExpense(expense);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
    	return expenseService.getAllExpenses();
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody ExpenseDto expenseDto) {
        return expenseService.updateExpense(id, expenseDto);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }
    
	@GetMapping("/total-amount")
	public Double getTotalExpenseAmount() {
		return expenseService.getTotalExpenseAmount();
	}
}
