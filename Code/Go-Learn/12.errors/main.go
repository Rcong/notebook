package main

import (
	"fmt"
)

type Employee struct {
    ID        int
    FirstName string
    LastName  string
    Address   string
}

func main() {
	employee, err := getInformation(1001)
	if err != nil {
			// Something is wrong. Do something.
	} else {
			fmt.Print(employee)
	}
}

func getInformation(id int) (*Employee, error) {
	employee, err := apiCallEmployee(1000)
	if err != nil {
			return nil, fmt.Errorf("Got an error when getting the employee information: %v", err)
	}
	return employee, nil
}

func apiCallEmployee(id int) (*Employee, error) {
    employee := Employee{LastName: "Doe", FirstName: "John"}
    return &employee, nil
}