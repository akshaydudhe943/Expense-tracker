package com.iauro.ExpenceTracker.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iauro.ExpenceTracker.Entity.Expense;
import com.iauro.ExpenceTracker.Entity.User;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	public List<Expense> findAllByUser(User user);
}