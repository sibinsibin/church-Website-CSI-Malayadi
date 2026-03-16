package com.malayadi.church.repository;

import com.malayadi.church.entity.Pastor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PastorRepository extends JpaRepository<Pastor, Long> {
}
